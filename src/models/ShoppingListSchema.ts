import mongoose from 'mongoose';

const shoppingListSchema = new mongoose.Schema({
  ingredients: [
    {
      name: { type: String, required: true },
      measure: { type: String },
    },
  ],
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;
