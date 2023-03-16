import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express = require('express');
import morgan = require('morgan');
import logger from './utility/logger';
import ingredientRouter from './routes/ingredientRoute';
import recipeRouter from './routes/recipeRoute';
import shoppinglistRouter from './routes/shoppingListRoute';
import userRouter from './routes/userRoute';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Development mode...');
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

// Routes
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/shoppinglists', shoppinglistRouter);
app.use('/api/v1/users', userRouter);

export default app;
