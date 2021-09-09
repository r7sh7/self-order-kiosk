const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');
const Product = require('./src/models/product')

const app = express();
const port = process.env.PORT || 5000;

//api to get category data for listing the different categories to choose from 
app.get('/api/categories', (req,res) => {
    res.send(data.categories);
});

//configuring and connecting to mongoDB
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(result => {
    app.listen(port, () => console.log(`serve at http://localhost:${port}`))
}).catch(err => console.log(err));


//api to seed products data 
app.get('/api/products/seed', (req, res) => {
    Product.insertMany(data.products)
            .then(products => res.send(products));
});


//api to get product data from the DB at the specified endpoint 
app.get('/api/products', (req, res) => {
    const { category }  = req.query;
    Product.find(category? { category } : {})
        .then(products => res.send(products));
});

//middleware for parsing req body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api for admin to add a single product using POSTMAN 
app.post('/api/products', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save(product => res.send(product));
});
