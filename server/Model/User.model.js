import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    address: { type: String },
}, {
    timestamps: true,
});

export const usersModel = mongoose.model('usersModel', usersSchema);