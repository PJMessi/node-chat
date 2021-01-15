const { Router } = require('express');
const userRoutes = require('./users.route');
const authRoutes = require('./auth.route');
const messageRoutes = require('./message.route');
const paymentRoutes = require('./payment.route');
const router = Router();

router.get('/', (request, response) => {
    response.json({
        message: 'APIs for Node Chart Application.'
    })
});

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);
router.use('/payments', paymentRoutes);


module.exports = router;