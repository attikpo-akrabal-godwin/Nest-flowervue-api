import * as mongoose from 'mongoose';

export const BuyerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  password: String,
});
