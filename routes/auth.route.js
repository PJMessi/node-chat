const { Router } = require('express');
const authController = require('../controllers/auth/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../controllers/auth/validation');

const router = Router()

router.post('/login', validationMiddleware.loginValidation, authController.login)
router.get('/profile', authMiddleware, authController.profile)

module.exports = router