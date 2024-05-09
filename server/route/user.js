import express from 'express';
import { UpdateUser, deleteUser, getUser, getUsers } from '../Controller/User.js';
import { verifyUser, verifyAdmin } from '../utils/verify.js';

const router = express.Router();

router.get('/:id', verifyUser, getUser)
router.get('/', verifyAdmin, getUsers)
router.put('/:id', verifyUser, UpdateUser)
router.delete('/:id', verifyAdmin, deleteUser)


export default router;