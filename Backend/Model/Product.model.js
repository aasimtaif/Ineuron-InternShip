import mongoose from "mongoose";
const reviewProductSchema = new mongoose.Schema({
    rating: { type: Number, required: true, default: 0 },
    userId: { type: mongoose.Types.ObjectId, ref: 'userModel' },
    comment: { type: String, required: true }
})

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'categoryModel' },
    properties: { type: Object },
    review: [reviewProductSchema]
}, {
    timestamps: true,
});

export const productModel = mongoose.model('productModel', productSchema);