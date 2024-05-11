import express from 'express';
import { addProductReview, addProducts, deleteImage, deleteProduct, getFeaturedProducts, getNewProducts, getProduct, getProducts, searchProducts, updateProduct } from '../Controller/Products.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';

const router = express.Router();
router.post('/', verifyAdmin, addProducts)
router.get('/', (req, res) => {
    res.send("Welcome to Products Route")
})
router.get('/new-products', getNewProducts)
router.get('/featured', getFeaturedProducts)
router.get('/search', searchProducts)
router.get('/:id', getProduct)
router.put('/:id', verifyAdmin, updateProduct)
router.put('/reviews/:id', verifyUser, addProductReview)
router.delete('/:id', verifyAdmin, deleteProduct)
router.delete('/image/:id', verifyAdmin, deleteImage)


export default router;