const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { createPaymentIntent, registerInStripe } = require('../controllers/payment/payment.controller');

const router = Router();

router.post('/stripe/register', authMiddleware, registerInStripe);
router.post('/paymentIntent', authMiddleware, createPaymentIntent);

module.exports = router;