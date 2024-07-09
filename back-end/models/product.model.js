const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  S: {
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  M: {
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  L: {
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  XL: {
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: false,
      default: 0,
    },
  },
});
const ColorSchema = new mongoose.Schema({
  color: {
    type: String,
    required: false,
  },
  sizes: {
    type: SizeSchema,
    required: false,
  },
});
const StockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the garment name"],
    },
    fabric_type: {
      type: String,
      required: [true, "Please enter the fabric type"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the fabric price per meter"],
      default: 0,
    },
    total_stock: {
      type: Number,
      default: 0,
    },
    total_sold: {
      type: Number,
      default: 0,
    },
    colors: [ColorSchema],
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("ProductStock", StockSchema);
module.exports = Product;
