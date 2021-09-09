const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');


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
