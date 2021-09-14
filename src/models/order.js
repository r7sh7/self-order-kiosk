const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        number: { type: Number, default: 0 },
        orderType: String,
        paymentType: String,
        isPaid: {type: Boolean, default: false},
        isReady: {type: Boolean, default: false},
        inProgress: {type: Boolean, default: true},
        isCancelled: {type: Boolean, default: false},
        isDelivered: {type: Boolean, default: false},
        itemsCount: Number,
        tax: Number,
        total: Number,
        orderItems: [
            {
                name: String,                   
                price: Number, 
                quantity: Number
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;