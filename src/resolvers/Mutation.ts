import {
  Args,
  Context,
  RecipeType,
  CategoryType,
  ReviewType,
  UserType,
} from '../types/types';
import Recipe from '../models/RecipeSchema';
import Category from '../models/CategorySchema';
import Review from '../models/ReviewSchema';
import User from '../models/UserSchema';
export default {
  createRecipe: async (
    _parent: never,
    {
      input: {
        mealHeadline,
        categoryId,
        createdBy,
        ingredients,
        instructions,
        mealThumbnail,
        mealVideo,
      },
    }: { input: RecipeType },
  ) => {
    const newRecipe = new Recipe({
      mealHeadline,
      categoryId,
      createdBy,
      ingredients,
      instructions,
      mealThumbnail,
      mealVideo,
    });
    await newRecipe.save();
    return newRecipe;
  },
  createCategory: async (_parent: never, { category }: CategoryType) => {
    const newCategory = new Category({ category });
    await newCategory.save();
    return newCategory.category;
  },
  createReview: async (
    _parent: never,
    { input: { rating, comment, createdBy, recipeId } }: { input: ReviewType },
  ) => {
    const newReview = new Review({ rating, comment, createdBy, recipeId });
    await newReview.save();
    return newReview;
  },
  createUser: async (
    _parent: never,
    { input: { email, password } }: { input: UserType },
  ) => {
    const newUser = new User({ email, password });
    await newUser.save();
    return newUser;
  },
};
