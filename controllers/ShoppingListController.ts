import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import ShoppingList from '../models/ShoppingListSchema';


export interface ShoppingList {
  name: string;
  user: string; // This should be an ObjectId, but you can also use a string here
  date?: Date;
  recipeIngredients: {
    recipeId: string; // This should be an ObjectId, but you can also use a string here
    ingredients: {
      name: string;
      amount: string;
    }[];
  }[];
}

export const getAllShoppingLists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await ShoppingList.find(),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const getShoppingListByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await ShoppingList.findById(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const createShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newIngredient = await ShoppingList.create(req.body);

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

export const updateShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: await ShoppingList.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const deleteShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Delete',
      data: await ShoppingList.findByIdAndDelete(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

// Example for creating ShoppingList

// const shoppingList: ShoppingList = {
//   name: "Weekly Shopping List",
//   user: "60599b7f70a86c19b80d48c5",
//   date: new Date("2023-03-16T10:00:00Z"),
//   recipeIngredients: [
//     {
//       recipeId: "60599b7f70a86c19b80d48c6",
//       ingredients: [
//         { name: "spaghetti", amount: "500g" },
//         { name: "bacon", amount: "200g" },
//         { name: "eggs", amount: "4" },
//         { name: "pecorino cheese", amount: "100g" },
//       ],
//     },
//     {
//       recipeId: "60599b7f70a86c19b80d48c7",
//       ingredients: [
//         { name: "chicken breast", amount: "4" },
//         { name: "olive oil", amount: "2 tbsp" },
//         { name: "lemon", amount: "1" },
//         { name: "garlic", amount: "4 cloves" },
//         { name: "thyme", amount: "2 tsp" },
//       ],
//     },
//   ],
// };