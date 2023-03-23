import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  mealHeadline: { type: String, required: true },
  category: { type: String, required: true },
  instructions: { type: String, required: true },
  mealThumbnail: { type: String },
  mealVideo: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ingredients: [
    {
      name: { type: String, required: true },
      measure: { type: String },
    },
  ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // This will not show the createdAt field when we get the data
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
