const Email = require('../Models/Email');
const nodemailer = require('nodemailer');

class EmailController {

    resetPassword(req, res) {
        const { email } = req.query;
        const newPassword = Math.random().toString(36).substring(2, 10);
        const newEmail = new Email({ resetPassword: newPassword });

        newEmail.save()
            .then(() => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'bogiaoffline@gmail.com',
                        pass: 'ydcu bnwo jisl lsax'
                    }
                });

                const mailOptions = {
                    from: 'your.email@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    text: `Your new password is: ${newPassword}`
                };

                return transporter.sendMail(mailOptions);
            })
            .then(() => {
                res.status(200).json(newEmail);
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ message: 'Internal server error' });
            });
    }
}

module.exports = new EmailController();
