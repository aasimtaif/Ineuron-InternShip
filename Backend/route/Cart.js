import express from 'express';
import { addToCart, fetchCartItemsWithUserData } from '../Controller/Cart.js';

const router = express.Router();
router.post('/', addToCart)
router.get('/:userId', fetchCartItemsWithUserData)

export default router;