const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


//api to seed products data 
// router.get('/seed', productController.product_seed);


//api to get product data from the DB at the specified endpoint 
router.get('/', productController.product_index);


//api for admin to add a single product using POSTMAN 
router.post('/', productController.product_create_post);

module.exports = router;