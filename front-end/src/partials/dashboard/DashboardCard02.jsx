// DashboardCard01.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChartDashboard2";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import CONFIG from "../../script/config";

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

function DashboardCard01() {
  const [reports, setReports] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch(`${CONFIG.URL}/finance`);
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
        const newData1 = data.reports.map((report) => report.totalUnitSold);

        setData1(newData1);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchReports();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data1,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      {
        data: data2,
        borderColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.25)`,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.25)`,
        pointHoverBackgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.25)`,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Acme Plus
        </h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          Sales
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            $24,780
          </div>
          <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">
            +49%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
