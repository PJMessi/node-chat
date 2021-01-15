const { Router } = require('express');
const stripeWebhook = require('../controllers/webhook/stripe');

const router = Router();

router.post('/stripe', stripeWebhook);

module.exports = router;