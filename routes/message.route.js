const { Router } = require('express');
const messageController = require('../controllers/message/message.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

router.get('/', authMiddleware, messageController.fetchMessages);

module.exports = router;