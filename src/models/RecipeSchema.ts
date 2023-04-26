import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  mealHeadline: { type: String, required: true },
  instructions: { type: String, required: true },
  mealThumbnail: { type: String },
  mealVideo: { type: String, required: false },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  ingredients: [{ name: String, measure: String }],
  category: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  reviews: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // This will not show the createdAt field when we get the data
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
