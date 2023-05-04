import Recipe from '../models/RecipeSchema';
import User from '../models/UserSchema';
import Review from '../models/ReviewSchema';
import Category from '../models/CategorySchema';
import { Args, Context } from '../types/types';

export default {
  recipes: async () =>
    await Recipe.find({})
      .populate('category')
      .populate('createdBy')
      .populate({
        path: 'reviews',
        populate: {
          path: 'createdBy',
          select: 'email',
        },
      }),
  recipe: async (_parent: never, { id }: Args) =>
    await Recipe.findById(id)
      .populate('category')
      .populate({
        path: 'createdBy',
        select: 'email',
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'createdBy',
          select: 'email',
        },
      }),

  users: async () =>
    await User.find({}).populate('recipes').populate('reviews'),
  user: async (_parent: never, { id }: Args) =>
    await User.findById(id).populate('recipes').populate('reviews'),
  reviews: async () =>
    await Review.find({}).populate('createdBy').populate('recipe'),
  review: async (_parent: never, { id }: Args) =>
    await Review.findById(id).populate('createdBy').populate('recipe'),
  categories: async () => await Category.find({}),
  category: async (_parent: never, { id }: Args) =>
    await Category.findById(id).populate('recipes'),
};
