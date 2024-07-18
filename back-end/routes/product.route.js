const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  soldProduct,
} = require("../controler/product.controler");
const router = express.Router();

router.post("/", createProduct);
router.put("/sold", soldProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
