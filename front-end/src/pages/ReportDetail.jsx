import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CONFIG from "../script/config";
import DownloadIcon from "@mui/icons-material/Download";

export default function ReportDetail() {
  const [report, setReport] = useState(null);
  const { reportId } = useParams();

  useEffect(() => {
    async function fetchReportDetail() {
      try {
        const res = await fetch(`${CONFIG.URL}/finance/${reportId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch Reports");
        }
        setReport(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReportDetail();
  }, [reportId]);

  const downloadPDF = async () => {
    const element = document.getElementById("report-content");
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`report_${reportId}.pdf`);
  };

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-6 h-auto">
      <button
        onClick={downloadPDF}
        className="p-1 m-4 bg-blue-500 text-white text-sm rounded-lg items-end"
      >
        <DownloadIcon /> Download PDF
      </button>
      <div
        className="w-full min-h-96 bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-auto p-4"
        id="report-content"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Laporan Keuangan
        </h1>
        <h2 className="text-lg   font-bold  text-gray-900 dark:text-white">
          Garment Maju jaya
        </h2>
        <p className="mb-4">
          Jalan Maju mundur gang jaya <br /> No Tlp: 0811821281820
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Periode: {report.month} {report.year}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Jumlah (IDR)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">Pendapatan</td>
                <td className="px-6 py-4">
                  <ul>
                    {report.sales.map((sale) => (
                      <li key={sale._id}>{sale.productName}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-right">
                  <ul>
                    {report.sales.map((sale) => (
                      <li key={sale._id}>
                        {sale.ProductRevenue.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold mt-2">
                    Total: {report.totalSales.toLocaleString()}
                  </p>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">Pengeluaran</td>
                <td className="px-6 py-4">
                  <ul>
                    <li>Biaya Material</li>
                    <li>Biaya Penjahit</li>
                    <li>Biaya Lainnya</li>
                  </ul>
                </td>
                <td className="px-6 py-4 text-right">
                  <ul>
                    <li>{report.expenses.materialCost.toLocaleString()}</li>
                    <li>{report.expenses.tailorCost.toLocaleString()}</li>
                    <li>{report.expenses.otherExpenses.toLocaleString()}</li>
                  </ul>
                  <p className="font-semibold mt-2">
                    Total: {report.totalExpense.toLocaleString()}
                  </p>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-semibold">Laba Bersih</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-right font-semibold">
                  {report.profit.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
