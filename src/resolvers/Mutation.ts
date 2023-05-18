import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { decodeToken } from '../logic/logic';
import {
  Args,
  Context,
  RecipeType,
  CategoryType,
  ReviewType,
  UserType,
  AuthPayload,
  TokenPayload,
  LoginInput,
  TokenType,
} from '../types/types';

import Recipe from '../models/RecipeSchema';
import Category from '../models/CategorySchema';
import Review from '../models/ReviewSchema';
import User from '../models/UserSchema';
import { Document } from 'mongoose';
import { Payload } from '@prisma/client/runtime';
import mongoose from 'mongoose';

const generateToken = (User: any): string => {
  const privateKey = process.env.JWT_PRIVATE_KEY!;
  const expiresIn = '1d';
  console.log('privatekey: ' + privateKey);
  const token = jwt.sign(
    { _id: User._id.toString(), email: User.email, role: User.role },
    privateKey,
    {
      expiresIn,
      algorithm: 'HS256',
    },
  );
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
        token,
      },
    }: { input: RecipeType },
  ) => {
    console.log('token' + token.token);
    // Decode the JWT token to get the user's role
    const decodedToken = decodeToken(token.token) as TokenPayload;

    const { role } = decodedToken;

    if (!decodedToken || role !== 'admin') {
      throw new Error('Unauthorized');
    }

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
    { input: { email, password, role } }: { input: UserType },
    context: Context,
  ): Promise<UserType> => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: any = new User({ email, password: hashedPassword, role });
    await (newUser as Document<any>).save();

    console.log('New user created:', newUser);

    return newUser;
  },
  login: async (
    _parent: never,
    { input: { email, password } }: { input: LoginInput },
    context: Context,
  ) => {
    const user = await User.findOne({ email });
    // const user: any | null = await context.prisma.user.findOne({
    //   where: { email },
    // });
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

    const token = await generateToken(user);
    console.log('token: ' + token);

    return { token, user };
  },

  // Update a recipe
  updateRecipe: async (
    _parent: never,
    {
      input: {
        id: recipeId,
        mealHeadline,
        category,
        createdBy,
        ingredients,
        instructions,
        mealThumbnail,
        mealVideo,
        token,
      } = {}, // Add default empty object
    }: { input?: Partial<RecipeType> },
  ) => {
    if (!token) {
      throw new Error('Unauthorized');
    }

    console.log('token: ' + token.token);

    // Decode the JWT token to get the user's role
    const decodedToken = decodeToken(token.token) as TokenPayload;
    const { _id: userId } = decodedToken;

    if (!decodedToken) {
      console.log('decodedToken: ' + decodedToken);
      throw new Error('Unauthorized');
    }

    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        throw new Error('Recipe not found');
      }

      if (userId !== recipe.createdBy?.toString()) {
        throw new Error('Unauthorized - current user did not create recipe');
      }

      const updatedRecipe: Partial<RecipeType> = {
        mealHeadline,
        category,
        createdBy,
        ingredients,
        instructions,
        mealThumbnail,
        mealVideo,
      };

      if (category) {
        const updateCategory = await Category.findById(category);
        if (!updateCategory) {
          throw new Error('Category not found');
        }
        updatedRecipe.category = updateCategory.id;

        updateCategory.recipes.push(recipe._id);
        await updateCategory.save();
      }

      if (createdBy) {
        const updateUser = await User.findById(createdBy);
        if (!updateUser) {
          throw new Error('User not found');
        }
        updateUser.recipes.push(recipe._id);
        await updateUser.save();
      }

      const updatedRecipeDoc = await Recipe.findByIdAndUpdate(
        recipeId,
        updatedRecipe,
        { new: true },
      )
        .populate('category')
        .populate('createdBy');

      return updatedRecipeDoc;
    } catch (err) {
      console.log(err);
      throw new Error('Error updating recipe');
    }
  },

  // Delete a recipe
  deleteRecipe: async (
    _parent: never,
    { input: { id, token } }: { input: { id: string; token: TokenType } },
  ) => {
    // Decode the JWT token to get the user's role
    console.log('token: ' + token);

    const decodedToken = decodeToken(token.token) as TokenPayload;
    console.log('decodedToken: ' + decodedToken);

    const { role, _id: userId } = decodedToken;

    try {
      // Find the recipe
      const recipe = await Recipe.findById(id);

      if (
        !decodedToken ||
        role !== 'admin' ||
        recipe?.createdBy?.toString() !== userId
      ) {
        throw new Error('Unauthorized');
      }

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      // Find the associated category and user
      const category = await Category.findById(recipe.category);
      const user = await User.findById(recipe.createdBy);

      if (!category || !user) {
        throw new Error('Category or User not found');
      }

      // Remove the recipe from the category and user
      category.recipes = category.recipes.filter(
        (recipeId) => recipeId.toString() !== id,
      );
      user.recipes = user.recipes.filter(
        (recipeId) => recipeId.toString() !== id,
      );

      // Save the updated category and user
      await Promise.all([category.save(), user.save()]);

      // Delete the recipe
      await Recipe.findByIdAndDelete(id);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
