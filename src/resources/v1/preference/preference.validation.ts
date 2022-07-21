import { celebrate, Joi } from "celebrate";

export const createOne = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()
    }),
});