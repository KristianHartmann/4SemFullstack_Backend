import logger from '../utility/logger';
import express = require('express');
import { createIngredient, deleteIngredient, getAllIngredients, getIngredientByID, updateIngredint } from '../controllers/IngredientController';

const ingredientRouter = express.Router();


logger.debug('Ingredient Route Loaded');
ingredientRouter.route('/:id').get(getIngredientByID).patch(updateIngredint).delete(deleteIngredient);
ingredientRouter.route('/').get(getAllIngredients).post(createIngredient);

export default ingredientRouter;
