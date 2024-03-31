import express from 'express';
import { createOrder, getOrdersDetails } from '../Controller/Order.js';

const router = express.Router();
router.post('/', createOrder)
router.get('/', getOrdersDetails)

export default router;