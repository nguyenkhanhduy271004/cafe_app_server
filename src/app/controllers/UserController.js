const User = require('../Models/User');

class UserController {

    getListUserOffline(req, res) {
        User.find({ isOnline: false, role: "staff" }, { _id: 0, userId: 1, username: 1, fullname: 1, phoneNumber: 1, password: 1, role: 1 })
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    getListUserOnline(req, res) {
        User.find({ isOnline: true, role: "staff" }, { _id: 0, userId: 1, username: 1, fullname: 1, phoneNumber: 1, password: 1, role: 1 })
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    async getInforUserForAdmin(req, res) {
        const userId = req.query.userId;
        try {
            const user = await User.findOne({ userId: userId }, { _id: 0, userId: 1, username: 1, password: 1, role: 1 });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getInforUser(req, res) {
        const username = req.query.username;
        try {
            const user = await User.findOne({ username: username }, { _id: 0, userId: 1, username: 1, imageUrl: 1, fullname: 1, email: 1, phoneNumber: 1, password: 1, role: 1 });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async setOnlineForUserForAdmin(req, res) {
        const username = req.query.username;
        try {
            const user = await User.findOneAndUpdate({ username: username }, { isOnline: true }, { new: true });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async setOnlineForUser(req, res) {
        const userId = req.query.userId;
        try {
            const user = await User.findOneAndUpdate({ userId: userId }, { isOnline: true }, { new: true });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateRoleForUserForAdmid(req, res) {
        const userId = req.query.userId;
        const role = req.query.role;
        try {
            const user = await User.findOneAndUpdate({ userId: userId }, { role: role }, { new: true });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getPassword(req, res) {
        try {
            const username = req.query.username;

            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async saveInforUser(req, res) {
        const username = req.query.username;
        const fullname = req.query.fullname;
        const email = req.query.email;
        const phoneNumber = req.query.phoneNumber;
        try {
            await User.findOneAndUpdate({ username: username }, { fullname: fullname, email: email, phoneNumber: phoneNumber });
            res.status(201).json({ message: 'Lưu thông tin người dùng thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
        }
    }

    async saveImageUser(req, res) {
        const username = req.query.username;
        const imageUrl = req.query.imageUrl;
        try {
            await User.findOneAndUpdate({ username: username }, { imageUrl: imageUrl });
            res.status(201).json({ message: 'Lưu thông tin người dùng thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
        }
    }

    async changePassword(req, res) {
        const username = req.query.username;
        const newPassword = req.query.password;

        try {
            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.password = newPassword;

            await user.save();

            return res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = new UserController();
