const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()
const authController = new AuthController()

router.post('/login', authController.login)
router.get('/profile', authMiddleware, authController.profile)

module.exports = router