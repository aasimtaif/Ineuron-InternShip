import express from 'express';
import { createOrder, getOrdersDetails } from '../Controller/Order.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';
const router = express.Router();
router.post('/', verifyUser, createOrder)
router.get('/', verifyAdmin, getOrdersDetails)

export default router;