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
      category: categoryId,
      createdBy,
      ingredients,
      instructions,
      mealThumbnail,
      mealVideo,
    });
    // Find the category document and update the recipes field
    // const category = await Category.findById(categoryId);
    // category.recipes.push(newRecipe);
    // await category.save();
    await newRecipe.save();
    return newRecipe;
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
