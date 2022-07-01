const express = require('express');
const router = express.Router();

const mailboxController = require('../app/controllers/MailboxController');

router.post('/publish_question', mailboxController.publish_question);
router.get('/list_questions', mailboxController.list_questions);
router.patch('/approve_question', mailboxController.approve_question);
router.patch('/refuse_question', mailboxController.refuse_question);
router.patch('/reply_question', mailboxController.reply_question);

module.exports = router;
