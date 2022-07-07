const express = require('express');
const router = express.Router();

const typeController = require('../app/controllers/TypeController');

router.get('/list_types_user', typeController.list_types_user);

module.exports = router;
