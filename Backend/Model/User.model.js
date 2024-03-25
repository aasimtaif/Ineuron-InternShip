import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    cartItems: { type: mongoose.Types.ObjectId, ref: 'cartModel' },
}, {
    timestamps: true,
});

export const usersModel = mongoose.model('usersModel', usersSchema);