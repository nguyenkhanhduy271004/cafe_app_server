const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/products-in-cart', cartController.getProductsInCart)

router.get('/set-orderId-product', cartController.setOrderIdProduct)

router.put('/set-confirmed', cartController.setConfirmed)

router.put('/set-ordered', cartController.setOrdered)

router.get('/receive-order', cartController.receiveOrder)

router.get('/get-product-in-processing', cartController.getProductsInProcessing)

router.get('/get-product-in-processing-for-staff', cartController.getProductsInProcessingForStaff)

router.get('/get-product-in-tracking', cartController.getProductsInTracking)

router.get('/get-product-in-tracking-for-staff', cartController.getProductsInTrackingForStaff)

router.get('/get-product-in-complete', cartController.getProductsInComplete)

router.get('/get-product-in-complete-for-staff', cartController.getProductsInCompleteForStaff)

router.get('/get-payment-method-for-bill', cartController.getPaymentMethosForBill)

router.get('/total-price', cartController.getToalPrice)

router.get('/get-product-for-bill', cartController.getProductsForBill)

router.get('/get-price-for-bill', cartController.getPriceForBill)

router.post('/add-to-cart', cartController.addToCart)

router.post('/update-cart-item/:username/:cartId', cartController.updateCartItem)

router.delete('/delete-product', cartController.deleteProduct)

router.delete('/delete-all-products-in-cart', cartController.deleteAllProductInCart)


module.exports = router;