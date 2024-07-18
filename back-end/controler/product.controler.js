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
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    // Validate productData structure
    if (
      !productData ||
      !productData.colors ||
      !Array.isArray(productData.colors)
    ) {
      return res.status(400).json({ message: "Invalid product data format" });
    }

    // Calculate total_stock and total_sold
    let totalStock = 0;
    let totalSold = 0;

    productData.colors.forEach((color) => {
      Object.values(color.sizes).forEach((size) => {
        totalStock += parseFloat(size.stock); // Ensure stock is parsed to float
        totalSold += parseFloat(size.sold); // Ensure sold is parsed to float
      });
    });

    productData.total_stock = totalStock;
    productData.total_sold = totalSold;

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
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
  updateProduct,
  deleteProduct,
  soldProduct,
};
