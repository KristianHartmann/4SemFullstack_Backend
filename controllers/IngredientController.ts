import { Request, Response, NextFunction } from 'express';
import Ingredient from '../models/IngredientSchema';
import catchAsync from '../utility/catchAsync';

interface Ingredient {
  name: string;
  type: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export const getAllIngredients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredients = await Ingredient.find();

    res.status(200).json({
      status: 'success',
      method: 'Get',
      results: ingredients.length,
      data: ingredients,
    });
  },
);

export const getIngredientByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredient = await Ingredient.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: ingredient,
    });
  },
);

export const createIngredient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newIngredient = await Ingredient.create(req.body);

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newIngredient,
    });
  },
);

export const updateIngredint = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: ingredient,
    });
  },
);

export const deleteIngredient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Ingredient.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      method: 'Delete',
      data: await Ingredient.findByIdAndDelete(req.params.id),
    });
  },
);
