const MonthlyFinancialReport = require("../models/finance.model");

// Function to calculate total sales and profit
const calculateTotals = (report) => {
  const totalSales = report.sales.reduce(
    (sum, product) => sum + product.ProductRevenue,
    0
  );
  const totalUnitSold = report.sales.reduce(
    (sum, product) => sum + product.ProductSold,
    0
  );
  const totalExpense =
    report.expenses.materialCost +
    report.expenses.tailorCost +
    report.expenses.otherExpenses;
  const profit = totalSales - totalExpense;
  return { totalSales, totalUnitSold, totalExpense, profit };
};

// Create Monthly Financial Report
const createMonthlyReport = async (req, res) => {
  try {
    const reportData = req.body;

    // Calculate totals
    const { totalSales, totalExpense, profit, totalUnitSold } =
      calculateTotals(reportData);
    reportData.totalSales = totalSales;
    reportData.totalExpense = totalExpense;
    reportData.profit = profit;
    reportData.totalUnitSold = totalUnitSold;

    const report = await MonthlyFinancialReport.create(reportData);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Monthly Financial Report
const updateMonthlyReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reportData = req.body;

    // Calculate totals
    const { totalSales, totalExpense, profit } = calculateTotals(reportData);
    reportData.totalSales = totalSales;
    reportData.totalExpense = totalExpense;
    reportData.profit = profit;

    const report = await MonthlyFinancialReport.findByIdAndUpdate(
      id,
      reportData,
      { new: true }
    );

    if (!report) {
      return res
        .status(404)
        .json({ message: "Monthly financial report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all monthly reports with pagination based on year
const getAllMonthlyReport = async (req, res) => {
  try {
    const { year, page = 1, limit = 10 } = req.query;

    const query = year ? { year: parseInt(year, 10) } : {};

    const reports = await MonthlyFinancialReport.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    const totalReports = await MonthlyFinancialReport.countDocuments(query);
    const totalPages = Math.ceil(totalReports / limit);

    res.status(200).json({
      reports,
      totalReports,
      totalPages,
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await MonthlyFinancialReport.findById(id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteMonthlyReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await MonthlyFinancialReport.findByIdAndDelete(id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createMonthlyReport,
  updateMonthlyReport,
  getAllMonthlyReport,
  getMonthlyReport,
  deleteMonthlyReport,
};