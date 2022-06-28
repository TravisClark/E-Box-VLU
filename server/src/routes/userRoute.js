const express = require('express');
const router = express.Router();
const {checkLogin} = require('../middleware/Auth');

const userController = require('../app/controllers/UserController');

router.post('/login', userController.login);
router.post('/add_user', userController.add_user);
router.put('/change_password', userController.change_password);
router.get('/account_info', userController.account_info);
router.get('/list_users', userController.list_users);

module.exports = router;
