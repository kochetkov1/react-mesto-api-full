import { Card } from '../models/card.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ServerError } from '../errors/ServerError.js';
import { errorMessages } from '../utils/errorMessages.js';

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(new ServerError(err.message)));
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else {
        next(new ServerError(err.message));
      }
    });
};

export const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((document) => {
      if (document) {
        const card = document.toObject();
        if (card.owner.toString() === req.user._id) {
          document.remove();
          res.send(card);
        } else next(new ForbiddenError(errorMessages.cardDeleteNotOwner));
      } else next(new NotFoundError(errorMessages.cardNotFound));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else {
        next(new ServerError(err.message));
      }
    });
};

export const addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError(errorMessages.cardNotFound));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else {
        next(new ServerError(err.message));
      }
    });
};

export const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError(errorMessages.cardNotFound));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else {
        next(new ServerError(err.message));
      }
    });
};
