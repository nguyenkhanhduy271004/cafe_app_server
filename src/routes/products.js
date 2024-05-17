const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/products', productController.getProducts)

router.get('/list-best-cafe', productController.getListBestCafe)

router.get('/list-best-cake', productController.getListBestCake)

router.get('/products-evaluate', productController.getProductsEvaluate)

router.get('/products-price', productController.getProductsPrice)

router.get('/products-search', productController.getProductsSearch)

router.get('/products-in-category', productController.getProductsCategory)

router.get('/get-infor-product', productController.getInforProduct)

router.get('/set-best-product', productController.updateProductPopularStatus)

router.post('/add-product', productController.addProduct)

router.put('/update-infor-product', productController.updateInforProduct)

router.delete('/delete-product', productController.deleteProduct)


module.exports = router;
