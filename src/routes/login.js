const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/login', loginController.login);

router.post('/signup', loginController.signup);


module.exports = router;
