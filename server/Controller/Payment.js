import crypto from 'crypto';
import { Cashfree } from 'cashfree-pg';
import { orderModel } from "../Model/Order.model.js";
import dotenv from 'dotenv';
dotenv.config();

Cashfree.XClientId = process.env.CASH_FREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASH_FREE_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}

export const checkOut = async (req, res) => {

    try {
        const { userId, name, email, phone, total } = req.body
        let request = {
            "order_amount": total,
            "order_currency": "INR",
            "order_id": generateOrderId(),
            "customer_details": {
                "customer_id": userId,
                "customer_phone": phone,
                "customer_name": name,
                "customer_email": email
            },
        }

        const response = await Cashfree.PGCreateOrder("2023-08-01", request)
        res.status(201).json(response?.data);
        console.log(response?.data, "line 48")

    } catch (error) {
        console.log(error, "line 49");
        res.status(400).json(error);
    }

}

export const paymentVerification = async (req, res) => {

    try {
        const { orderId, ...details } = req.body;
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
        if (response.data[0].payment_status === 'SUCCESS') {
            const order = await orderModel.create({ cashFreeOrderId: orderId, ...details, paid: true });
            res.status(201).json(order);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}