import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/UserSchema';
import catchAsync from '../../utility/catchAsync';

import { Document, Types } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
}

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      method: 'Get',
      results: users.length,
      data: users,
    });
  },
);

export const getUserByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: user,
    });
  },
);

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newUser,
    });
  },
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: user,
    });
  },
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      method: 'Delete',
      data: null,
    });
  },
);
