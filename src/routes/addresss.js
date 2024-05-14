const express = require('express');
const router = express.Router();

const addressController = require('../app/controllers/AddressController');

router.get('/get-address', addressController.getAddress)

router.get('/get-address-for-user', addressController.getAddressForUser)

router.post('/save-data-address', addressController.saveDataAddress)

router.post('/update-data-address', addressController.updateDataAddress)


module.exports = router;