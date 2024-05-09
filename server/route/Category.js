import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategoryById, searchCategory, updateCategory } from '../Controller/Category.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';


const router = express.Router();
router.post('/', verifyAdmin, addCategory)
router.get('/', getCategories)
router.get('/find/:id', getCategoryById)
router.get('/search', searchCategory)
router.delete('/:id', verifyAdmin, deleteCategory)
router.put('/:id', verifyAdmin, updateCategory)
export default router;