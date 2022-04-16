import type {Express, NextFunction, Request, Response} from 'express';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import logger from '../utils/logger';

interface ICustomError extends Error {
  status: number;
  statusCode: number;
}

function errorHandler(
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  logger.error(
    `${err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR} - ${
      err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR
    } - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  return res
    .status(err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(err)
    .end();
}

export function handleError(app: Express) {
  app.use(errorHandler);
  process.on('unhandledRejection', (reason: Error) => {
    throw reason;
  });
  process.on('uncaughtException', (error: Error) => {
    throw error;
  });
}

export default handleError;
