const express = require("express");
const router = express.Router();
const {
  addMaterialStock,
  getAllMaterialStock,
  getMaterialById,
  deleteMaterialStock,
  updateMaterialStock,
} = require("../controler/material.controler");

router.post("/", addMaterialStock);
router.get("/", getAllMaterialStock);
router.get("/:id", getMaterialById);
router.delete("/:id", deleteMaterialStock);
router.put("/:id", updateMaterialStock);

module.exports = router;
