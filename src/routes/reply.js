const express = require('express');
const router = express.Router();

const replyController = require('../app/controllers/ReplyController');

router.post('/save-content-reply', replyController.saveContentReply);

router.get('/get-content-reply', replyController.getContentReply);


module.exports = router;
