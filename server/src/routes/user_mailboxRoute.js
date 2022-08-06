const express = require("express");
const router = express.Router();
const { checkLogin } = require("../middleware/Auth");
const mailboxController = require("../app/controllers/MailboxController");

router.get(
  "/list_questions_user",
  mailboxController.list_questions_user
);
router.get("/details_question", mailboxController.details_question);
router.post("/publish_question", mailboxController.publish_question);
router.put("/like", mailboxController.like);

module.exports = router;
