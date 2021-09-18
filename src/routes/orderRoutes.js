const express = require('express');
const Order = require('../models/order');

const router = express.Router();

//for admin screen
router.get('/', async (req, res) => {
    Order.find({ isCancelled: false, isDelivered: false })
        .then((orders) => res.send(orders));
});

//api for updating order status
router.put('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
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

//api to get the orders queue
router.get('/queue', async(req, res) => {
    const inProgressOrders = await Order.find({ inProgress: true, isCancelled: false }, 'number');
    const servingOrders = await Order.find({ isReady: true, isCancelled: false, isDelivered: false}, 'number');
    res.send({inProgressOrders, servingOrders});
});

module.exports = router;