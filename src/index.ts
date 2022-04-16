import 'reflect-metadata';
import getEnv from './config/envs';
import {appServer} from './app-server';
import http from 'http';
import logger from './utils/logger';
import {createConnections} from 'typeorm';
import connectionConfig from './config/dbConfig';

const app = appServer('../routes');
const server = http.createServer(app);
createConnections(connectionConfig)
  .then(() => {
    server
      .listen(getEnv('port'), () => {
        logger.info(`Server started at port :${getEnv('port')}`);
      })
      .on('error', err => {
        logger.error(err);
        process.exitCode = 1;
      });
  })
  .catch(err => {
    logger.error(err);
    process.exitCode = 1;
  });
