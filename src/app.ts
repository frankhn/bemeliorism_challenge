import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import { BAD_REQUEST } from './constants';
import joiErrors from './middleware/celebrateErrors';
import './database/models/asociations';
import morganMiddleware from './services/morgin.service';
import swaggerUI from 'swagger-ui-express';
import docs from './swagger/v1';
import { defaultLanguage } from './constants';
import v1 from './routes'

const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(morganMiddleware);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      accepted: 'PUT, POST, GET, DELETE',
    });
  }
  if (!req.headers.language || !['rw', 'fr', 'en'].includes(`${req.headers.language}`)) {
    req.headers.language = defaultLanguage;
  }
  return next();
});

if (process.env.NODE_ENV === 'production') {
  app.use('/api/v1/docs', (req, res, next) => {
    res.status(404).send('Not Found');
  });
}

app.use('/api/v1', v1);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use(joiErrors());

app.use((req: Request, res: Response) => {
  res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
    message: 'Refer to the document => /api/v1/docs',
  });
});

export default app;
