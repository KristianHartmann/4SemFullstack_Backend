import {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
} from '../controllers/carController';
import logger from '../utility/logger';
import express = require('express');

const router = express.Router();

logger.debug('Car Route Loaded');
router.route('/:id').get(getCar).patch(updateCar).delete(deleteCar);
router.route('/').get(getAllCars).post(createCar);

export default router;
