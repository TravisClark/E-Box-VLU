const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/Auth');

const userController = require('../app/controllers/UserController');

router.get('/list_users', userController.list_users);
router.post('/add_user', userController.add_user);

module.exports = router;
