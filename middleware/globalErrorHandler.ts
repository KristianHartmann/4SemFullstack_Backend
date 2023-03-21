import { NextFunction, Request, Response } from 'express';
import logger from '../utility/logger';
import Logger from '../utility/logger';

const sendErrorDev = (err: Error, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: Error, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

export = (err: Error, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }

  // if (err.statusCode.toString().startsWith('5')) {
  //   logger.error(new Logger(err.status, err.statusCode, err.message).log())
  // } else {
  //   logger.debug(new Logger(err.status, err.statusCode, err.message).log())
  // }
};
