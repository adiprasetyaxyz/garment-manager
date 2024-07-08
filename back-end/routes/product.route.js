const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProducts,
  soldProduct,
} = require("../controler/product.controler");
const router = express.Router();

router.post("/", createProduct);
router.put("/sold", soldProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProducts);

module.exports = router;
