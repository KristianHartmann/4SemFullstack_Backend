import logger from '../../utility/logger';
import express from 'express';
import {
  deleteRecipe,
  getAllRecipes,
  getRecipeByID,
  updateRecipe,
} from '../controllers/RecipeController';

const recipeRouter = express.Router();

logger.debug('Recipe Route Loaded');

recipeRouter
  .route('/:id')
  .get(getRecipeByID)
  .patch(updateRecipe)
  .delete(deleteRecipe);
recipeRouter.route('/').get(getAllRecipes);

export default recipeRouter;
