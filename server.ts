import app from './app';
import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import mongoose from 'mongoose';
const DB = process.env.DATABASE_DEV!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);

mongoose.connect(DB, {
}).then(() => {
    console.log('DB connection successful!');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

