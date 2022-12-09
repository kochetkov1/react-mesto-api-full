import { celebrate, Joi } from 'celebrate';

const schemeObjectId = Joi.string().alphanum().hex().length(24);
const schemeEmail = Joi.string().email();
const schemeUrl = Joi.string().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/);

export const cardBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: schemeUrl.required(),
  }),
});

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: schemeObjectId.required(),
  }),
});

export const userBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: schemeUrl,
    email: schemeEmail.required(),
    password: Joi.string().required(),
  }),
});

export const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.alternatives()
      .try(Joi.string().equal('me'), Joi.string().hex().length(24)).required(),
  }).required(),

});

export const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: schemeEmail.required(),
    password: Joi.string().required(),
  }),
});

export const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: schemeUrl.required(),
  }),
});

export const userDescriptionValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
