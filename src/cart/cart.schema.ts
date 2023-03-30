import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
      nbr: Number,
    },
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer',
  },
});
