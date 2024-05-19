const Reply = require('../Models/Reply');

class ReplyController {

    saveContentReply(req, res) {
        const reply = new Reply({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            content: req.body.content,
        });

        reply.save()
            .then(() => {
                res.status(201).json({ message: 'Lưu model reply thành công' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
            });
    }

    getContentReply(req, res) {
        Reply.find({}).sort({ createdAt: -1 }).exec()
            .then(replies => {
                res.json(replies);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

}

module.exports = new ReplyController();
