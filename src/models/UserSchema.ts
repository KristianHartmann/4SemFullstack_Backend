import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // This will not show the createdAt field when we get the data
  },
});

const User = mongoose.model('User', userSchema);

export default User;
