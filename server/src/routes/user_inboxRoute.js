const express = require('express');
const router = express.Router();

const inboxController = require('../app/controllers/InboxController');

router.get('/list_messages', inboxController.list_messages);
router.post('/send_message', inboxController.send_message);

module.exports = router;
