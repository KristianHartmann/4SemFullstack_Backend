import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TokenType = {
  token: string;
};
type TokenPayload = {
  _id: string;
  email: string;
  role: string;
};

type RecipeType = {
  id: string;
  mealHeadline: string;
  instructions: string;
  mealThumbnail: string;
  mealVideo: string;
  createdBy: string;
  ingredients: [IngredientType];
  category: string;
  token: TokenType;
};
type ReviewType = {
  id: string;
  rating: number;
  comment: string;
  recipe: string;
  createdBy: string;
};
type UserType = {
  _id: string;
  email: string;
  role: string;
  password: string;
  recipeid: string;
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
  TokenPayload,
  TokenType,
};
