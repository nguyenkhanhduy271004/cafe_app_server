const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/list-user-offline', userController.getListUserOffline)

router.get('/list-user-online', userController.getListUserOnline)

router.get('/get-infor-user-for-admin', userController.getInforUserForAdmin)

router.get('/get-infor-user', userController.getInforUser)

router.patch('/set-online-for-user-for-admin', userController.setOnlineForUserForAdmin)

router.patch('/set-online-for-user', userController.setOnlineForUser)

router.patch('/update-role-for-user-for-admin', userController.updateRoleForUserForAdmid)

router.get('/get-password', userController.getPassword)

router.post('/save-infor-user', userController.saveInforUser)

router.post('/save-image-user', userController.saveImageUser)

router.post('/change-password', userController.changePassword)


module.exports = router;