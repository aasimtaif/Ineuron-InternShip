import express from 'express';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../Controller/Category.js';

const router = express.Router();
router.post('/', addCategory)
router.get('/', getCategories)
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)
export default router;