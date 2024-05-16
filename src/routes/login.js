const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/login', loginController.login);

router.post('/signup', loginController.signup);

router.post('/add-staff', loginController.addStaff);



module.exports = router;
