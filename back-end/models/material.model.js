const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  usedMaterial: {
    type: Number,
    required: true,
  },
});

const RawMaterialSchema = new mongoose.Schema(
  {
    fabric_type: {
      type: String,
      required: [true, "Please enter the fabric type"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the fabric price per meter"],
      default: 0,
    },
    total_quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    colors: [ColorSchema],
  },
  {
    timestamps: true,
  }
);

const RawMaterial = mongoose.model("RawMaterial", RawMaterialSchema);
module.exports = RawMaterial;
