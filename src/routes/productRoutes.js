const express = require('express');
const Product = require('../models/product');
const data = require('../../data');

const router = express.Router();


//api to seed products data 
router.get('/seed', (req, res) => {
    Product.insertMany(data.products)
            .then(products => res.send(products));
});


//api to get product data from the DB at the specified endpoint 
router.get('/', (req, res) => {
    const { category }  = req.query;
    Product.find(category ? { category } : {}) 
        .then(products => res.send(products));
});

//middleware for parsing req body 
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//api for admin to add a single product using POSTMAN 
router.post('/', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save(product => res.send(product));
});

module.exports = router;