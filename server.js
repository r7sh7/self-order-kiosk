const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');
const Product = require('./src/models/product')
const Order = require('./src/models/order');

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

//making the build folder files static for FE
app.use(express.static(path.join(__dirname, '/build')));

//serving the build folder 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});


//api to seed products data 
app.get('/api/products/seed', (req, res) => {
    Product.insertMany(data.products)
            .then(products => res.send(products));
});


//api to get product data from the DB at the specified endpoint 
app.get('/api/products', (req, res) => {
    const { category }  = req.query;
    Product.find(category ? { category } : {}) 
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

//for admin screen
app.get('/api/orders', async (req, res) => {
    Order.find({ isCancelled: false, isDelivered: false })
        .then((orders) => res.send(orders));
});

//api for updating order status
app.put('/api/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        if(req.body.status === 'ready'){
            order.isReady = true;
            order.inProgress = false;
        }else if(req.body.status === 'cancel') {
            order.isCancelled = true;
            order.inProgress = false;
        }else if(req.body.status === 'delivered'){
            order.isDelivered = true;
            order.inProgress = false;
        }
        await order.save();
        res.send({ message: 'done' });
    }else{
        req.status(404).message({ message: 'Order not found' });
    }
});

//api to create a new order.
app.post('/api/orders', async (req, res) => {
    const lastOrder = await Order.find().sort({number: -1}).limit(1);
    const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
    
    if(
        !req.body.orderType || 
        !req.body.paymentType || 
        !req.body.orderItems || 
        req.body.orderItems.length === 0
    ){
        return res.send({ message: 'Data is required' });
    }   
    
    const newOrder = await new Order({ ...req.body, number: lastNumber + 1 }).save();
    res.send(newOrder);   
});

