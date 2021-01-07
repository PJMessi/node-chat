const { Router } = require('express');
const userController = require('../controllers/user/user.controller');
const validationMiddleware = require('../controllers/user/validation');

const router = Router();

router.post('/', validationMiddleware.storeValidation, userController.store);
router.get('/', userController.index);
router.get('/:uuid', userController.show);
router.put('/:uuid', userController.update);
router.delete('/:uuid', userController.destroy);

module.exports = router;