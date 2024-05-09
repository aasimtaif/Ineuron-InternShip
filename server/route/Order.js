import express from 'express';
import { getOrdersDetails, getOrdersDetailsByUserId, getOrdersDetailsByOrderId } from '../Controller/Order.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';
const router = express.Router();

router.get('/', verifyAdmin, getOrdersDetails)
router.get('/order/:id', verifyUser, getOrdersDetailsByOrderId)
router.get('/:id', verifyUser, getOrdersDetailsByUserId)

export default router;