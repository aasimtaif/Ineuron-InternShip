import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    quantity: Number,
    product: { type: mongoose.Types.ObjectId, ref: 'productModel' }
});
const orderSchema = new mongoose.Schema({
    razerpayId: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'usersModel' },
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    cashFreeOrderId: String,
    paid: { type: Boolean, default: false },
    totalPrice: Number,
    products: [productSchema]
}, {
    timestamps: true,
});

export const orderModel = mongoose.model('orderModel', orderSchema);