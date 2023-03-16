import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import CarModel from '../models/carModel';
import Car from '../models/carModel';

interface Car {
  id: string;
  model: string;
  year: number;
  price: number;
  color: string;
}
export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await CarModel.find(),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const getCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await CarModel.findById(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newCar = await CarModel.create(req.body);

    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newCar,
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const updateCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Patch',
      data: await CarModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const deleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Delete',
      data: await CarModel.findByIdAndDelete(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};
