import express from 'express';
import { checkOut, paymentVerification } from '../Controller/Payment.js';
import { verifyUser} from '../utils/verify.js';
const router = express.Router();

router.post("/checkout", verifyUser, checkOut)
router.post("/verification", verifyUser, paymentVerification)


export default router;