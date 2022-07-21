import { Router } from 'express';
import { checkAuth } from '../../../middleware/authenticate';
import controller from './auth.controller';
import * as validator from './auth.validation'

export default Router()
    .post('/signup', validator.sigup, controller.createOne)
    .post('/login', validator.login, controller.login)
    .post('/forgotpassword', validator.forgotPassword, controller.forgotpassword)
    .post('/resetpassword', validator.resetPassword, controller.resetPassword)
    .post('/verify', validator.verify, controller.activateAccount)
    .get('/me', checkAuth(), controller.userInfor)
