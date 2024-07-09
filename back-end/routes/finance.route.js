const express = require("express");
const router = express.Router();
const {
  createMonthlyReport,
  updateMonthlyReport,
  getAllMonthlyReport,
  getMonthlyReport,
  deleteMonthlyReport,
} = require("../controler/finance.controler");

router.post("/", createMonthlyReport);
router.get("/", getAllMonthlyReport);
router.get("/:id", getMonthlyReport);
router.delete("/:id", deleteMonthlyReport);
router.put("/:id", updateMonthlyReport);

module.exports = router;
