const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/Auth');

const userController = require('../app/controllers/UserController');

router.get('/account_info', userController.account_info);
router.post('/login', userController.login);
router.patch('/change_password', userController.change_password);

module.exports = router;
