const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.patch('/set-payment-method', orderController.setPaymentMethod)

router.patch('/set-value-discount', orderController.setValueDiscount)

router.post('/save-address-for-cart', orderController.saveAddressForCart)

router.get('/get-address-for-bill', orderController.getAddressForBill)

router.get('/total-price-for-bill', orderController.getTotalPriceForBill)

router.get('/get-infor-for-bill', orderController.getInforForBill)

router.get('/get-infor-for-bill-1', orderController.getInforForBill1)



module.exports = router;