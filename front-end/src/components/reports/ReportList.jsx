import React, { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
export default function ReportList({
  allReports,
  handleDelete,
  year,
  setYear,
  setShowUpdateForm,
  setId,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleYear = (currentYear) => {
    setYear(currentYear);
    console.log(currentYear);
  };
  const monthOrder = {
    Januari: 1,
    Februari: 2,
    Maret: 3,
    April: 4,
    Mei: 5,
    Juni: 6,
    Juli: 7,
    Agustus: 8,
    September: 9,
    Oktober: 10,
    November: 11,
    Desember: 12,
  };

  // Sort reports by month using custom order
  const sortedReports = allReports.sort((a, b) => {
    return monthOrder[a.month] - monthOrder[b.month];
  });
  const yearList = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-9">
      <div className="w-full inline-block p-2">
        <div className="flex justify-between items-center w-full">
          <button
            id="dropdownRadioButton"
            onClick={toggleDropdown}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <svg
              className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
            </svg>
            {year}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <Link
            className="ml-8 mt-4 btn bg-indigo-500 hover:bg-indigo-600 text-white"
            to={"/finance/make-report"}
          >
            Buat Laporan <AddCircleIcon />
          </Link>
        </div>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div
            id="dropdownRadio"
            className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              {yearList.map((currentYear) => {
                return (
                  <li key={currentYear}>
                    <button
                      className="w-full text-left text-gray-700 dark:text-gray-200 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => {
                        handleYear(currentYear);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {currentYear}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full min-h-96 bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Detail
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3">
                Pengeluaran
              </th>
              <th scope="col" className="px-6 py-3">
                Penjualan
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Terjual
              </th>
              <th scope="col" className="px-6 py-3">
                Keuntungan
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report) => (
              <tr
                key={`${report.month}-${report.year}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <Link to={`detail/${report._id}`}>
                    <LibraryBooksIcon className="text-blue-400 cursor-pointer"></LibraryBooksIcon>
                  </Link>
                </td>
                <td className="px-6 py-4">{`${report.month} ${report.year}`}</td>
                <td className="px-6 py-4">
                  {report.totalExpense.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {report.totalSales.toLocaleString()}
                </td>
                <td className="px-6 py-4">{report.totalUnitSold}</td>
                <td className="px-6 py-4">{report.profit.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <EditNoteIcon
                    onClick={() => {
                      return setShowUpdateForm(true), setId(report._id);
                    }}
                    className="text-red-500 cursor-pointer"
                  ></EditNoteIcon>
                  <DeleteOutlineIcon
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(report._id)}
                  ></DeleteOutlineIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
