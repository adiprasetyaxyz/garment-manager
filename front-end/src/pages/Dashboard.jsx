import React, { useEffect, useState } from "react";

import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import YearPicker from "../components/YearPicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import CONFIG from "../script/config";

const monthToNumber = {
  Januari: "1",
  Februari: "2",
  Maret: "3",
  April: "4",
  Mei: "5",
  Juni: "6",
  Juli: "7",
  Agustus: "8",
  September: "9",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [labels, setLabels] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [soldData, setSoldData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch(`${CONFIG.URL}/finance?year=${year}&limit=12`);
        const data = await res.json();
        setReports(data.reports);

        // Generate labels in the format "MM-01-YYYY"
        const labelsData = data.reports.map((report) => {
          const month = monthToNumber[report.month];
          const paddedMonth = month.length === 1 ? `0${month}` : month;
          return `${paddedMonth}-01-${report.year}`;
        });
        setLabels(labelsData);

        // Set data1 and data2
        const newProfitData = data.reports.map((report) => report.profit);
        const newRevenueData = data.reports.map((report) => report.totalSales);
        const newSoldData = data.reports.map((report) => report.totalUnitSold);
        const newExpenseData = data.reports.map(
          (report) => report.totalExpense
        );
        setProfitData(newProfitData);
        setSoldData(newSoldData);
        setExpenseData(newExpenseData);
        setRevenueData(newRevenueData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchReports();
  }, [year]);

  const handleYearChange = (year) => {
    setYear(year);
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Avatars */}
            <DashboardAvatars />

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <YearPicker
                align="custom-class"
                startYear={2015}
                endYear={2030}
                onChange={handleYearChange}
              />
              {/* Add view button */}
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span
                  className="hidden xs:block ml-2"
                  onClick={() => fetchReports()}
                >
                  Add view
                </span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Line chart (Acme Plus) */}
            <DashboardCard01
              labels={labels}
              data1={profitData}
              reports={reports}
            />
            {/* Line chart (Acme Advanced) */}
            <DashboardCard02
              labels={labels}
              data1={soldData}
              reports={reports}
            />
            {/* Line chart (Acme Professional) */}
            <DashboardCard03
              labels={labels}
              data1={expenseData}
              reports={reports}
            />
            {/* Bar chart (Direct vs Indirect) */}
            <DashboardCard04
              labels={labels}
              revenueData={revenueData}
              expenseData={expenseData}
              reports={reports}
            />
            {/* Card (Customers) */}
            <DashboardCard10 />

            {/* Table (Top Channels) */}
            <DashboardCard07 />
            {/* Doughnut chart (Top Countries) */}
            <DashboardCard06 />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
