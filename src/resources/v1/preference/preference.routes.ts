import { Router } from 'express';
import { checkAuth } from '../../../middleware/authenticate';
import controller from './preference.controller';
import * as validator from './preference.validation'

export default Router()
    .get('/', checkAuth(), controller.getMany)
    .post('/', validator.createOne, checkAuth(), controller.createOne)
