import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'productModel' },
    quantiy: { type: Number, default: 1 }
});

const cartSchema = new Schema({
    items: [cartItemSchema],
    userId: { type: Schema.Types.ObjectId, ref: 'usersModel' }
});

export const CartModel = mongoose.model('cartModel', cartSchema);