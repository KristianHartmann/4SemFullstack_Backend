import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type RecipeType = {
  id: string;
  mealHeadline: string;
  instructions: string;
  mealThumbnail: string;
  mealVideo: string;
  createdBy: string;
  ingredients: [IngredientType];
  categoryId: string;
};
type ReviewType = {
  id: string;
  rating: number;
  comment: string;
  recipeId: string;
  createdBy: string;
};
type UserType = {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
};

type IngredientType = {
  name: string;
  measure: string;
};

type CategoryType = {
  id: string;
  category: string;
  recipeid: string;
};

type Context = {
  recipes: RecipeType[];
  reviews: ReviewType[];
  users: UserType[];
  categories: CategoryType[];
  prisma: PrismaClient;
};
type Args = {
  id: string;
  input: RecipeType | ReviewType | UserType | CategoryType | IngredientType;
};

type AuthPayload = {
  token: string;
  user: UserType;
};

type LoginInput = {
  email: string;
  password: string;
};
export type {
  RecipeType,
  Context,
  Args,
  ReviewType,
  UserType,
  CategoryType,
  IngredientType,
  AuthPayload,
  LoginInput,
};
