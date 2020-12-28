const { Router } = require('express')
const userRoutes = require('./users.route')
const authRoutes = require('./auth.route')
const router = Router()

router.get('/', (request, response) => {
    response.json({
        message: 'APIs for Node Chart Application.'
    })
})

router.use('/users', userRoutes)
router.use('/auth', authRoutes)


module.exports = router