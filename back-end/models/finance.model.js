const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  ProductSold: { type: Number, required: true },
  ProductRevenue: { type: Number, required: true },
});

const MonthlyFinancialReportSchema = new mongoose.Schema({
  month: { type: String, required: true }, // e.g., 'January'
  year: { type: Number, required: true },
  sales: [ProductSchema],
  expenses: {
    materialCost: { type: Number, required: true },
    tailorCost: { type: Number, required: true },
    otherExpenses: { type: Number, required: true },
  },
  totalExpense: { type: Number, required: true },
  totalSales: { type: Number, required: true },
  profit: { type: Number, required: true },
});

const MonthlyFinancialReport = mongoose.model(
  "MonthlyFinancialReport",
  MonthlyFinancialReportSchema
);
module.exports = MonthlyFinancialReport;
