const mongoose = require("mongoose");
const express = require("express");
const productRoute = require("./routes/product.route");
const materialRoute = require("./routes/material.route");
const financeRoute = require("./routes/finance.route");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", productRoute);
app.use("/api/materials", materialRoute);
app.use("/api/finance", financeRoute);

app.get("/", (req, res) => {
  res.send("hello world!");
});

const port = process.env.PORT || 3000;
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("PORT:", process.env.PORT);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Failed connection", error);
  });
