import express from 'express';
import { createOrder, getOrdersDetails, getOrdersDetailsByUserId } from '../Controller/Order.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';
const router = express.Router();
router.post('/', verifyUser, createOrder)
router.get('/', verifyAdmin, getOrdersDetails)
router.get('/:id', verifyUser, getOrdersDetailsByUserId)

export default router;