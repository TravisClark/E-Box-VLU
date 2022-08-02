const express = require('express');
const router = express.Router();

const { checkLogin } = require('../middleware/Auth');
const conversationController = require('../app/controllers/ConversationController');

router.get('/list_conversations', conversationController.list_conversations);

module.exports = router;
