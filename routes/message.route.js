const { Router } = require('express');
const MessageController = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();
const messageController = new MessageController();

router.get('/', authMiddleware, messageController.fetchMessages);

module.exports = router;