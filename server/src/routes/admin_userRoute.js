const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/Auth');

const userController = require('../app/controllers/UserController');

router.get('/list_users', userController.list_users);
router.get('/details_user', userController.details_user);
router.post('/add_user', userController.add_user);
router.patch('/deactivate_user', userController.deactivate_user);
router.patch('/change_user_information', userController.change_user_information);

module.exports = router;
