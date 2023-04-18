import express, { Request, Response, NextFunction } from 'express';
import Recipe from '../models/RecipeSchema';
import { Document, Types } from 'mongoose';
import { Review } from './reviewController';
import catchAsync from '../utility/catchAsync';
import temp from './temp.json';

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

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const recdata = temp;
    const createdRecipes = await Promise.all(
      recdata.map(async (data: any) => {
        const ingredients: string[] = []; // Explicit type for ingredients array
        const measures: string[] = []; // Explicit type for measures array
        for (let i = 1; i <= 20; i++) {
          const ingredientKey = `strIngredient${i}`;
          const measureKey = `strMeasure${i}`;
          const ingredientValue = data[ingredientKey]?.trim();
          const measureValue = data[measureKey]?.trim();
          if (ingredientValue !== '' && measureValue !== '') {
            ingredients.push(ingredientValue);
            measures.push(measureValue);
          }
        }

        const newRecipe = await Recipe.create({
          mealHeadline: data.strMeal,
          category: data.strCategory,
          instructions: data.strInstructions,
          mealThumbnail: data.strMealThumb,
          mealVideo: data.strYoutube,
          ingredients: ingredients.map((ingredient, index) => ({
            name: ingredient,
            measure: measures[index],
          })),
          reviews: [],
        });
        return newRecipe;
      }),
    );

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: createdRecipes,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
