const Reply = require('../Models/Reply')

class ReplyController {

    async saveContentReply(req, res) {
        const reply = new Reply({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            content: req.body.content,

        });
        try {
            await reply.save();
            res.status(201).json({ message: 'Lưu model reply thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
        }
    }
}

module.exports = new ReplyController();
