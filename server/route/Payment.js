import express from 'express';
import { checkOut, paymentVerification } from '../Controller/Payment.js';
const router = express.Router();

router.post("/checkout", checkOut)
router.post("/verification", paymentVerification)


export default router;