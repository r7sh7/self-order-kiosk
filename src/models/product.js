const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String
}); 

const Product = mongoose.model('product', productSchema);

module.exports = Product;