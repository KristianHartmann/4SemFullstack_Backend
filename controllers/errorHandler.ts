import express = require('express');

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};
