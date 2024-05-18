const express = require('express');
const router = express.Router();

const replyController = require('../app/controllers/ReplyController');

router.post('/save-content-reply', replyController.saveContentReply);
module.exports = router;
