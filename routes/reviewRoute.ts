import logger from '../utility/logger';
import express = require('express');
import { createReview, deleteReviewById, getAllReviews, getReviewById, updateReview } from '../controllers/reviewController';

const reviewRouter = express.Router();


logger.debug('Review Route Loaded');
reviewRouter.route('/:id').get(getReviewById).patch(updateReview).delete(deleteReviewById);
reviewRouter.route('/').get(getAllReviews).post(createReview);

export default reviewRouter;
