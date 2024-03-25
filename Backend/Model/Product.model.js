import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'categoryModel' },
    properties: { type: Object },
}, {
    timestamps: true,
});

export const productModel = mongoose.model('productModel', productSchema);