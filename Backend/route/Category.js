import express from 'express';
import { addCategory } from '../Controller/Category.js';

const router = express.Router();
router.post('/', addCategory)
export default router;