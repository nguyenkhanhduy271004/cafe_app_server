const User = require('../Models/User');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

class UserController {

    getListUserOffline(req, res) {
        User.find({ isOnline: false, role: "staff" }, { _id: 0, userId: 1, username: 1, imageUrl: 1, fullname: 1, phoneNumber: 1, password: 1, role: 1 })
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    getListUserOnline(req, res) {
        User.find({ isOnline: true, role: "staff" }, { _id: 0, userId: 1, username: 1, imageUrl: 1, fullname: 1, phoneNumber: 1, password: 1, role: 1 })
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    getInforUserForAdmin(req, res) {
        const userId = req.query.userId;

        User.findOne({ userId: userId }, { _id: 0, userId: 1, username: 1, imageUrl: 1, password: 1, role: 1 }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    getInforUser(req, res) {
        const username = req.query.username;

        User.findOne({ username: username }, { _id: 0, userId: 1, username: 1, imageUrl: 1, fullname: 1, email: 1, phoneNumber: 1, password: 1, role: 1 }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    getWorkingStatusUser(req, res) {
        const username = req.query.username;

        User.findOne({ username: username }, { _id: 0, isOnline: 1 }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user.isOnline);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    setOnlineForUserForAdmin(req, res) {
        const username = req.query.username;

        User.findOneAndUpdate({ username: username }, { isOnline: true }, { new: true }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    setOnlineForUser(req, res) {
        const userId = req.query.userId;

        User.findOneAndUpdate({ userId: userId }, { isOnline: true }, { new: true }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    setOfflineForUser(req, res) {
        const userId = req.query.userId;

        User.findOneAndUpdate({ userId: userId }, { isOnline: false }, { new: true }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    updateRoleForUserForAdmid(req, res) {
        const userId = req.query.userId;
        const role = req.query.role;

        User.findOneAndUpdate({ userId: userId }, { role: role }, { new: true }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

    getPassword(req, res) {
        const username = req.query.username;

        User.findOne({ username: username }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getImageUser(req, res) {
        const username = req.query.username;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user.imageUrl);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    };


    saveInforUser(req, res) {
        const username = req.query.username;
        const fullname = req.query.fullname;
        const email = req.query.email;
        const phoneNumber = req.query.phoneNumber;

        User.findOneAndUpdate({ username: username }, { fullname: fullname, email: email, phoneNumber: phoneNumber }).exec()
            .then(() => {
                res.status(201).json({ message: 'Lưu thông tin người dùng thành công' });

            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
            });
    }

    changePassword(req, res) {
        const username = req.query.username;
        const newPassword = req.query.password;

        User.findOne({ username: username }).exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                user.password = newPassword;

                return user.save();
            })
            .then(() => {
                res.status(200).json({ message: 'Password updated successfully' });
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ message: 'Internal server error' });
            });
    }

    saveImageUser(req, res) {
        upload.single('image')(req, res, (err) => {
            const username = req.body.username;
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: 'Error uploading file' });
            }

            const imageUrl = req.file ? req.file.filename : null;

            if (!imageUrl) {
                console.error('No file uploaded');
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const serverUrl = 'http://192.168.56.1:3001';
            const fullImageUrl = `${serverUrl}/uploads/${imageUrl}`;

            User.findOneAndUpdate({ username: username }, { imageUrl: fullImageUrl }).exec()
                .then(() => {
                    res.status(201).json({ message: 'Image uploaded successfully', imageUrl: fullImageUrl });
                })
                .catch(err => {
                    console.error('Internal server error:', err);
                    res.status(500).json({ message: 'Internal server error' });
                });
        });
    }


}

module.exports = new UserController();
