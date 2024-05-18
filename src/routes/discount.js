const express = require('express');
const router = express.Router();

const discountController = require('../app/controllers/DiscountController');

router.get('/get-all-discounts', discountController.getAllDiscounts)

module.exports = router;
