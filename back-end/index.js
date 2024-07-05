const mongoose = require("mongoose");
const express = require("express");
const productRoute = require("./routes/product.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("hello world!");
});

mongoose
  .connect(
    "mongodb+srv://adiprasetyawan20:BrmSW0vU5sn9KeWN@adixyz.da93wgk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=adixyz"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
      console.log("server running");
    });
  })
  .catch(() => console.log("failed connection"));
