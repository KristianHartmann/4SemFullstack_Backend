import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import ShoppingList from '../models/ShoppingListSchema';
import catchAsync from '../utility/catchAsync';

export interface ShoppingList {}

export const getAllShoppingLists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await ShoppingList.find();

    res.status(200).json({
      status: 'success',
      method: 'Get',
      results: shoppingList.length,
      data: shoppingList,
    });
  },
);

export const getShoppingListByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await ShoppingList.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: shoppingList,
    });
  },
);

export const createShoppingList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newShoppingList = await ShoppingList.create(req.body);

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newShoppingList,
    });
  },
);

export const updateShoppingList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shoppinglist = await ShoppingList.findByIdAndUpdate(
      req.params.id,
      { $push: { ingredients: req.body.ingredients } },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: shoppinglist,
    });
  },
);

export const deleteShoppingList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await ShoppingList.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      method: 'Delete',
      data: shoppingList,
    });
  },
);
