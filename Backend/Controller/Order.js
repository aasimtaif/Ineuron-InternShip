import { get } from "mongoose";
import { orderModel } from "../Model/Order.model.js";

export const createOrder = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);
        res.status(201).json(order);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
    }
}

export const getOrdersDetails = async (req, res) => {
    try {
        const orders = await orderModel.find().populate({
            path: 'productstext-center',
            populate: {
                path: 'product',
                model: 'productModel' // Assuming 'User' is the model name for the user details
            }
        }).populate('userId').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
    }
}