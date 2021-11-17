const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./data");
const orderRoutes = require("./src/routes/orderRoutes");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
const port = process.env.PORT || 5000;

//api to get category data for listing the different categories to choose from
app.get("/api/categories", (req, res) => {
  res.send(data.categories);
});

//configuring and connecting to mongoDB
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => console.log(`serve at http://localhost:${port}`));
  })
  .catch((err) => console.log(err));

//making the build folder files static for FE
// app.use(express.static(path.join(__dirname, '/build')));

//serving the build folder
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, '/build/index.html'));
  res.send("Server is running properly");
});

//middleware for parsing req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using productRoutes
app.use("/api/products", productRoutes);

//using orderRoutes
app.use("/api/orders", orderRoutes);
