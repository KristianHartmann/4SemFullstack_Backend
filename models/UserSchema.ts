import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
    trim: true,
    maxlength: [
      20,
      'A user first name must have less or equal than 20 characters',
    ],
    minLength: [
      2,
      'A user first name must have more or equal than 2 characters',
    ],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
    trim: true,
    maxlength: [
      20,
      'A user last name must have less or equal than 20 characters',
    ],
    minLength: [
      2,
      'A user last name must have more or equal than 2 characters',
    ],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (email: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    trim: true,
    minlength: [8, 'A user password must have more or equal than 8 characters'],
    select: false,
  },
  profilePicture: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png',
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // This will not show the createdAt field when we get the data
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
  shoppingList: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShoppingList',
    },
});

const User = mongoose.model('User', userSchema);

export default User;
