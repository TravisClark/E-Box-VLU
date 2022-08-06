const express = require('express');
const router = express.Router();

const { checkLogin } = require('../middleware/Auth');
const mailboxController = require('../app/controllers/MailboxController');

router.get('/list_questions_admin', mailboxController.list_questions_admin);
router.get('/statistical', mailboxController.statistical);
router.patch('/approve_question', mailboxController.approve_question);
router.patch('/refuse_question', mailboxController.refuse_question);
router.patch('/restore_question', mailboxController.restore_question);
router.patch('/reply_question', mailboxController.reply_question);

module.exports = router;
