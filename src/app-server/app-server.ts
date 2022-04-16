import compression from 'compression';
import type {Express} from 'express';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import getEnv from '../config/envs';
import swaggerOptions from '../config/swagger-config';
import handleError from './handle-errors';
import requestLogger from './request-logger';
import setHeaders from './set-headers';

export function appServer(route: string) {
  const app: Express = express();
  app.use(requestLogger);
  setHeaders(app);
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  if (getEnv('nodeEnv') === 'development') {
    app.use(
      '/api-docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerJSDoc(swaggerOptions))
    );
  }
  app.use('/', require(route).routes());
  handleError(app);
  return app;
}

export default appServer;
