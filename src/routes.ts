import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import docs from './swagger/v1';
import auth from './resources/v1/auth/auth.routes'

const routes = Router();

routes.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

routes.use('/auth', auth);
routes.use('/preference', auth);

export default routes;
