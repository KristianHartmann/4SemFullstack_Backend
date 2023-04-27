import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  Args,
  Context,
  RecipeType,
  CategoryType,
  ReviewType,
  UserType,
  AuthPayload,
  LoginInput,
} from '../types/types';

import Recipe from '../models/RecipeSchema';
import Category from '../models/CategorySchema';
import Review from '../models/ReviewSchema';
import User from '../models/UserSchema';
import { Document } from 'mongoose';

const generateToken = (user: { _id: string; email: string }): string => {
  const privateKey = process.env.JWT_PRIVATE_KEY!;
  // const privateKey = process.env.JWT_PRIVATE_KEY || 'default_private_key';
  const expiresIn = '1d';
  console.log('privatekey: ' + privateKey);
  const token = jwt.sign({ _id: user._id, email: user.email }, privateKey, {
    expiresIn,
    algorithm: 'HS256',
  });
  return token;
};

export default {
  createRecipe: async (
    _parent: never,
    {
      input: {
        mealHeadline,
        category,
        createdBy,
        ingredients,
        instructions,
        mealThumbnail,
        mealVideo,
      },
    }: { input: RecipeType },
    context: Context,
  ) => {
    const updateCategory = await Category.findById(category);
    if (!updateCategory) {
      throw new Error('Category not found');
    }
    const updateUser = await User.findById(createdBy);
    if (!updateUser) {
      throw new Error('User not found');
    }

    const newRecipe = new Recipe({
      mealHeadline,
      category: updateCategory.id,
      createdBy,
      ingredients,
      instructions,
      mealThumbnail,
      mealVideo,
    });

    try {
      await Promise.all([
        newRecipe.save(),
        updateCategory.recipes.push(newRecipe._id),
        updateUser.recipes.push(newRecipe._id),
        updateCategory.save(),
        updateUser.save(),
      ]);
    } catch (err) {
      console.log(err);
      throw new Error('Error saving recipe');
    }
    const populatedRecipe = await Recipe.findById(newRecipe._id)
      .populate('category')
      .populate('createdBy');
    return populatedRecipe;
  },
  createCategory: async (
    _parent: never,
    { input: { category, recipeid } }: { input: CategoryType },
  ) => {
    const newCategory = new Category({ category, recipeid });
    await newCategory.save();
    return newCategory;
  },

  createReview: async (
    _parent: never,
    { input: { rating, comment, createdBy, recipe } }: { input: ReviewType },
  ) => {
    console.log('recipeId');
    const updateRecipe = await Recipe.findById(recipe);
    if (!updateRecipe) {
      throw new Error('Recipe not found');
    }
    const updateUser = await User.findById(createdBy);
    if (!updateUser) {
      throw new Error('User not found');
    }
    const newReview = new Review({ rating, comment, createdBy, recipe });

    try {
      await Promise.all([
        newReview.save(),
        updateRecipe.reviews.push(newReview._id),
        updateUser.reviews.push(newReview._id),
        updateRecipe.save(),
        updateUser.save(),
      ]);
    } catch (err) {
      console.log(err);
      throw new Error('Error saving recipe');
    }
    const populatedReview = await Review.findById(newReview._id)
      .populate('createdBy')
      .populate('recipe');
    return populatedReview;
  },

  createUser: async (
    _parent: never,
    { input: { email, password } }: { input: UserType },
    context: Context,
  ): Promise<AuthPayload> => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: any = new User({ email, password: hashedPassword });
    await (newUser as Document<any>).save();
  
    const token = generateToken(newUser);
  
    console.log('New user created:', newUser);
  
    return { token, user: newUser };
  },
  login: async (
    _parent: never,
    { input: { email, password } }: { input: LoginInput },
    context: Context,
  ) => {
    const user: UserType | null = await context.prisma.user.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid login credentials');
    }

    const token = generateToken(user);

    return { token, user };
  },
};
