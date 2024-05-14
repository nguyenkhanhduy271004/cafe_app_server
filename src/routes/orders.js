const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/set-payment-method', orderController.setPaymentMethod)

router.post('/save-address-for-cart', orderController.saveAddressForCart)

router.get('/get-address-for-bill', orderController.getAddressForBill)

router.get('/total-price-for-bill', orderController.getTotalPriceForBill)


module.exports = router;