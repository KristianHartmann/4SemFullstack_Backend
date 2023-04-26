import Recipe from '../models/RecipeSchema';
import User from '../models/UserSchema';
import Review from '../models/ReviewSchema';
import Category from '../models/CategorySchema';
import { Args, Context } from '../types/types';

export default {
  recipes: async () => await Recipe.find({}),
  recipe: async (_parent: never, { id }: Args) => await Recipe.findById(id),
  users: async () => await User.find({}),
  user: async (_parent: never, { id }: Args) => await User.findById(id),
  reviews: async () => await Review.find({}),
  review: async (_parent: never, { id }: Args) => await Review.findById(id),
  categories: async () => await Category.find({}),
  category: async (_parent: never, { id }: Args) => await Category.findById(id),
};
