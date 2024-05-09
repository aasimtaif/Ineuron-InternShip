
import { orderModel } from "../Model/Order.model.js";

export const getOrdersDetails = async (req, res) => {
    try {
        const orders = await orderModel.find().populate({
            path: 'products',
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

export const getOrdersDetailsByUserId = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.params.id }).populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'productModel' // Assuming 'User' is the model name for the user details
            }
        }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
    }
}

export const getOrdersDetailsByOrderId = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'productModel' // Assuming 'User' is the model name for the user details
            }
        }).populate('userId');
        order.userId.password = undefined;
        res.status(200).json(order);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
    }
}