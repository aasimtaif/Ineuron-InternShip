import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
}, {
    timestamps: true,
});

export const orderModel = mongoose.model('orderModel', orderSchema);