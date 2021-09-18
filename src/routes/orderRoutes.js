const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();
//for admin screen
router.get('/', orderController.order_admin_get);

//api for updating order status
router.put('/:id', orderController.order_admin_update);

//api to create a new order.
router.post('/', orderController.order_create_post);

//api to get the orders queue
router.get('/queue', orderController.order_queue_get);

module.exports = router;