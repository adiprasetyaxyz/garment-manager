const RawMaterial = require("../models/material.model");

const addMaterialStock = async (req, res) => {
  try {
    const materialStock = await RawMaterial.create(req.body);
    res.status(200).json(materialStock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const getAllMaterialStock = async (req, res) => {
  try {
    const materialStock = await RawMaterial.find({});
    res.status(200).json(materialStock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const materialStock = await RawMaterial.findById(id);
    res.status(200).json(materialStock);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteMaterialStock = async (req, res) => {
  try {
    const { id } = req.params;
    const materialStock = await RawMaterial.findByIdAndDelete(id);
    if (!materialStock) {
      res.status(404).json({ message: "Material Not Found" });
    }
    res.status(200).json({ message: "Material Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateMaterialStock = async (req, res) => {
  try {
    const { id } = req.params;
    const materialStock = await RawMaterial.findByIdAndUpdate(id, req.body);
    if (!materialStock) {
      res.status(404).json({ message: "Material Not Found" });
    }
    const updatedMaterial = await RawMaterial.findById(id);
    res.status(200).json(req.body);
  } catch (error) {}
};
module.exports = {
  addMaterialStock,
  getAllMaterialStock,
  deleteMaterialStock,
  updateMaterialStock,
  getMaterialById,
};
