import express, { Request, Response, NextFunction } from 'express';
import Review from '../models/ReviewSchema';
import catchAsync from '../../utility/catchAsync';

export interface Review {
  id: string;
  review: string;
  rating: number;
}

export const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.find();

    res.status(200).json({
      status: 'success',
      method: 'Get',
      results: review.length,
      data: review,
    });
  },
);

export const getReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: review,
    });
  },
);

export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newReview,
    });
  },
);

export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: review,
    });
  },
);

export const deleteReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      method: 'Delete',
      data: await Review.findByIdAndDelete(req.params.id),
    });
  },
);
