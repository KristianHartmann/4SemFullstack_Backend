import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'Review can not be empty!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
