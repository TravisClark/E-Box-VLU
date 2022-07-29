const express = require('express');
const router = express.Router();

const { checkLogin } = require('../middleware/Auth');
const roleController = require('../app/controllers/RoleController');

router.get('/list_roles', roleController.list_roles);
router.post('/add_role', roleController.add_role);

module.exports = router;
