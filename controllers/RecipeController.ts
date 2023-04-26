import express, { Request, Response, NextFunction } from 'express';
import Recipe from '../models/RecipeSchema';
import { Document, Types } from 'mongoose';
import { Review } from './reviewController';
import catchAsync from '../utility/catchAsync';

interface Recipe extends Document {
  mealHeadline: string;
  category: string;
  instructions: string;
  mealThumbnail?: string;
  mealVideo: string;
  createdBy?: Types.ObjectId;
  ingredients: {
    name: string;
    measure?: string;
  }[];
  reviews?: Review[];
  createdAt: Date;
}

export const getAllRecipes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.find();

    res.status(200).json({
      status: 'success',
      method: 'Get',
      results: recipe.length,
      data: recipe,
    });
  },
);


export const getRecipeByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: recipe,
    });
  },
);

export const updateRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: recipe,
    });
  },
);

export const deleteRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      method: 'Delete',
      data: await Recipe.findByIdAndDelete(req.params.id),
    });
  },
);
