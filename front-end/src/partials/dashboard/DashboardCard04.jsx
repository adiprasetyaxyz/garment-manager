import React from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04({ labels, revenueData, expenseData }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Pemasukan",
        data: revenueData,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: "Pengeluaran",
        data: expenseData,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Direct VS Indirect
        </h2>
      </header>
      <div className="grow max-sm:max-h-[300px] xl:max-h-[300px]">
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard04;
