import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import Recipe from '../models/RecipeSchema'

export interface Recipe {
  name: string;
  user: string; // This should be an ObjectId, but you can also use a string here
  guide: string;
  time: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
  image?: string;
  ratings?: number[];
}

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await Recipe.find(),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const getRecipeByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await Recipe.findById(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newIngredient = await Recipe.create(req.body);

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

export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Delete',
      data: await Recipe.findByIdAndDelete(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

// Example to create a recipe

// const recipe: Recipe = {
//   name: "Spaghetti Carbonara",
//   user: "60599b7f70a86c19b80d48c5",
//   guide: "1. Cook the spaghetti in boiling water.\n2. Fry the bacon in a pan until crispy.\n3. Beat the eggs in a bowl, then add grated cheese and black pepper.\n4. Drain the spaghetti and add it to the pan with the bacon.\n5. Remove the pan from the heat, then add the egg and cheese mixture.\n6. Stir well to combine, then serve immediately.",
//   time: 30,
//   ingredients: [
//     { name: "spaghetti", amount: "500g" },
//     { name: "bacon", amount: "200g" },
//     { name: "eggs", amount: "4" },
//     { name: "pecorino cheese", amount: "100g" },
//     { name: "black pepper", amount: "to taste" },
//   ],
//   image: "https://example.com/spaghetti_carbonara.jpg",
//   ratings: [4, 5, 3, 4, 5],
// };