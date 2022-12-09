import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} from '../controllers/card.js';
import {
  cardIdValidator,
  cardBodyValidator,
} from '../utils/validators.js';

export const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', cardBodyValidator, createCard);
cardRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidator, addLikeCard);
cardRouter.delete('/:cardId/likes', cardIdValidator, deleteLikeCard);
