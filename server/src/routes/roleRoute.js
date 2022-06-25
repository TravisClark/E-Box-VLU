const express = require('express');
const router = express.Router();

const roleController = require('../app/controllers/RoleController');

router.get('/api/list_roles', roleController.list_roles);
router.post('/api/add_role', roleController.add_role);

module.exports = router;