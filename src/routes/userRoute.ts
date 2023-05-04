import logger from '../../utility/logger';
import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  updateUser,
} from '../controllers/UserController';

const userRouter = express.Router();

logger.debug('User Route Loaded');
userRouter.route('/:id').get(getUserByID).patch(updateUser).delete(deleteUser);
userRouter.route('/').get(getAllUsers).post(createUser);

export default userRouter;
