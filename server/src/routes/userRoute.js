const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/Auth');

const userController = require('../app/controllers/UserController');

router.get('/account_info', userController.account_info);
router.get('/list_users', userController.list_users);
router.post('/login', userController.login);
router.post('/add_user', userController.add_user);
router.patch('/change_password', userController.change_password);

module.exports = router;
