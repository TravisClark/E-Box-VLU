const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/api/check_account', userController.check_account);
router.post('/api/add_user', userController.add_user);
router.get('/', userController.index);

module.exports = router;