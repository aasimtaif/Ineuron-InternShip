import express from 'express';
import { addProductReview, addProducts, deleteImage, deleteProduct, getFeaturedProducts, getNewProducts, getProduct, getProducts, updateProduct } from '../Controller/Products.js';

const router = express.Router();
router.post('/', addProducts)
router.get('/', getProducts)
router.get('/new-products', getNewProducts)
router.get('/featured', getFeaturedProducts)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.put('/reviews/:id', addProductReview)
router.delete('/:id', deleteProduct)
router.delete('/image/:id', deleteImage)


export default router;