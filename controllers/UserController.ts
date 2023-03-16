import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import User from '../models/UserSchema';

import { Document, Types } from 'mongoose';

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  savedRecipes: Types.Array<Types.ObjectId>;
  shoppingLists: Types.Array<Types.ObjectId>;
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await User.find(),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const getUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await User.findById(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: await User.create(req.body),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Delete',
      data: await User.findByIdAndDelete(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};
