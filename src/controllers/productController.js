//product_seed, product_index, product_create_post

const data = require("../../data");
const Product = require("../models/product");


const product_seed = (req, res) => {
    Product.insertMany(data.products)
            .then(products => res.send(products));
};

const product_index = (req, res) => {
    const { category }  = req.query;
    Product.find(category ? { category } : {}) 
        .then(products => res.send(products));
};

const product_create_post = (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save(product => res.send(product));
};

module.exports = {
    product_seed, 
    product_index, 
    product_create_post
}