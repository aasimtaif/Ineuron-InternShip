import express from 'express';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../Controller/Category.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';


const router = express.Router();
router.post('/', verifyAdmin, addCategory)
router.get('/', getCategories)
router.delete('/:id', verifyAdmin, deleteCategory)
router.put('/:id', verifyAdmin, updateCategory)
export default router;