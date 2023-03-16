import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guide: { type: String, required: true },
  time: { type: Number, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      amount: { type: String },
      weight: { type: Number },
    },
  ],
  image: { type: String },
  ratings: [{ type: Number }],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // This will not show the createdAt field when we get the data
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;