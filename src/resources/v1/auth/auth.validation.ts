import { celebrate, Joi } from "celebrate";
import { validateEmail } from "../../../constants";

export const sigup = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
            .trim()
            .min(3)
            .regex(validateEmail)
            .label('Email')
            .required(),
        password: Joi.string().required(),
        dateOfBirth: Joi.string().trim().label('Birth Date').required()
    }),
});

export const login = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
});

export const forgotPassword = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required()
    })
})

export const resetPassword = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        verificationCode: Joi.string().required(),
        password: Joi.string().required()
    })
})

export const verify = celebrate({
    body: Joi.object().keys({
        email: Joi.string()
            .trim()
            .min(3)
            .regex(validateEmail)
            .label('Email')
            .required(),
    })
})
