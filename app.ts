// <reference path="./types/express.d.ts" />
import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
import morgan from 'morgan';
import AppError from './utility/appError';
import globalErrorHandler from './middleware/globalErrorHandler';
import recipeRouter from './src/routes/recipeRoute';
import reviewRouter from './src/routes/reviewRoute';
import userRouter from './src/routes/userRoute';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Development mode...');
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

// Routes
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/// Error handling middleware needs to be last in the chain after all other middleware

app.use(globalErrorHandler);

export default app;
