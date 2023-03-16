import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, 'A car must have a model'],
    trim: true,
    maxlength: [40, 'A car model must have less or equal than 40 characters'],
    minlength: [2, 'A car model must have more or equal than 2 characters'],
  },
  year: {
    type: Number,
    required: [true, 'A car must have a year'],
  },
  price: {
    type: Number,
    required: [true, 'A car must have a price'],
    min: [0, 'A car price must be greater than 0'],

  },
  color: {
    type: String,
    required: [true, 'A car must have a color'],
    trim: true,
    enum: { values: ['red', 'blue', 'green', 'black', 'yellow', 'white'], message: 'Color is either: red, blue, green, black, yellow, white' },
    maxlength: [40, 'A car color must have less or equal than 40 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
    },

});

const Car = mongoose.model('Car', carSchema);
export default Car; 