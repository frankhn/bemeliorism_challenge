import { Router } from 'express';
import controller from './auth.controller';
import * as validator from './auth.validation'

export default Router()
    .post('/signup', validator.sigup, controller.createOne)
    .post('/login', validator.login, controller.login)
    .post('/forgotpassword', validator.forgotPassword, controller.forgotpassword)
    .post('/reset_password', validator.resetPassword, controller.resetPassword)
    .get('verify', validator.verify, controller.activateAccount)
