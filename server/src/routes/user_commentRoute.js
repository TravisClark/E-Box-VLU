const express = require('express');
const router = express.Router();

const commentController = require('../app/controllers/CommentController');

router.get('/list_comments', commentController.list_comments);
router.post('/send_comment', commentController.send_comment);

module.exports = router;
