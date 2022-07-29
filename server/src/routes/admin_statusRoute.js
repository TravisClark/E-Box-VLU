const express = require('express');
const router = express.Router();

const { checkLogin } = require('../middleware/Auth');
const statusController = require('../app/controllers/StatusController');

router.get('/list_status', statusController.list_status);
router.post('/add_status', statusController.add_status);

module.exports = router;
