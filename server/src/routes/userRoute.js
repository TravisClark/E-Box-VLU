const express = require('express');
const router = express.Router();
const {checkLogin} = require('../middleware/Auth');

const userController = require('../app/controllers/UserController');

router.post('/api/login', userController.login);
router.post('/api/add_user', userController.add_user);
router.put('/api/change_password', userController.change_password);
router.get('/api/list_users', checkLogin, userController.list_users);

module.exports = router;
