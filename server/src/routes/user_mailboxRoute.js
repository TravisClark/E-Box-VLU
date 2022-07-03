const express = require('express');
const router = express.Router();

const mailboxController = require('../app/controllers/MailboxController');

router.get('/list_questions_user/:type', mailboxController.list_questions_user);
router.post('/publish_question', mailboxController.publish_question);

module.exports = router;
