import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import Ingredient from '../models/IngredientSchema'


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

export const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await Ingredient.find(),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const getIngredientByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await Ingredient.findById(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newIngredient = await Ingredient.create(req.body);

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newIngredient,
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const updateIngredint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const deleteIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Delete',
      data: await Ingredient.findByIdAndDelete(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

// Example to create a new ingredient:

// const tomato: Ingredient = {
//   name: 'Tomato',
//   type: 'Vegetable',
//   nutrition: {
//     calories: 18,
//     protein: 0.9,
//     fat: 0.2,
//     carbs: 3.9,
//   },
// };