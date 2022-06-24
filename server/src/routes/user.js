const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/api/login', userController.login);
router.post('/api/add_user', userController.add_user);
router.get('/api/list_users', userController.index);

module.exports = router;
