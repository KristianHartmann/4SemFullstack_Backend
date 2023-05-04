import logger from '../../utility/logger';
import express from 'express';
import {
  createShoppingList,
  deleteShoppingList,
  getAllShoppingLists,
  getShoppingListByID,
  updateShoppingList,
} from '../controllers/ShoppingListController';

const shoppinglistRouter = express.Router();
logger.debug('Shoppinglist Route Loaded');
shoppinglistRouter
  .route('/:id')
  .get(getShoppingListByID)
  .patch(updateShoppingList)
  .delete(deleteShoppingList);
shoppinglistRouter.route('/').get(getAllShoppingLists).post(createShoppingList);

export default shoppinglistRouter;
