const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/Auth');

const mailboxController = require('../app/controllers/MailboxController');

module.exports = router;