const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {}
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const soldProduct = async (req, res) => {
  const { id, color, size, quantity } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const colorObj = product.colors.find((c) => c.color === color);

    if (!colorObj) {
      return res.status(404).json({ message: "Color not found" });
    }

    if (colorObj.sizes[size].stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    colorObj.sizes[size].stock -= quantity;
    colorObj.sizes[size].sold += quantity;

    await product.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  deleteProduct,
  soldProduct,
};
