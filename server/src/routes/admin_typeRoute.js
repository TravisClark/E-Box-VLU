const express = require('express');
const router = express.Router();

const typeController = require('../app/controllers/TypeController');

router.get('/list_types_admin', typeController.list_types_admin);
router.post('/add_type', typeController.add_type);

module.exports = router;
