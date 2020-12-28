const { Router } = require('express')
const UserController = require('../controllers/user.controller')

const router = Router()
const userController = new UserController()

router.post('/', userController.store)
router.get('/', userController.index)
router.get('/:uuid', userController.show)
router.put('/:uuid', userController.update)
router.delete('/:uuid', userController.destroy)

module.exports = router