import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ReportList from "../components/reports/ReportList";
import UpdateDataForm from "../components/reports/UpdateDataForm";

export default function Finance({
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [allReports, setAllReports] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    async function fetchAllReports() {
      try {
        const res = await fetch(`${CONFIG.URL}/finance?year=${year}&limit=12`);
        if (!res.ok) {
          throw new Error("Failed to fetch Reports");
        }
        const data = await res.json();
        setAllReports(data.reports);
        console.log(year);
      } catch (error) {
        console.error("Error fetching Product:", error);
      }
    }
    fetchAllReports();
  }, [year]);
  const [productStock, setProductStock] = useState([]);

  useEffect(() => {
    async function fetchProductStock() {
      try {
        const res = await fetch(`${CONFIG.URL}/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch recipe information");
        }
        const data = await res.json();
        setProductStock(data);
      } catch (error) {
        console.error("Error fetching Product:", error);
      }
    }
    fetchProductStock();
  }, []);
  const handleDelete = async (reportId) => {
    try {
      const res = await fetch(`${CONFIG.URL}/finance/${reportId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete report");
      }
      // Filter out the deleted report from allReports
      setAllReports((prevReports) =>
        prevReports.filter((report) => report._id !== reportId)
      );
      setMessage(`Laporan telah dihapus`);
      setShowNotification(true);
    } catch (error) {
      console.error("Error deleting report:", error);
      setMessage("Laporan gagal dihapus");
      setShowDangerNotification(true);
    }
  };
  const handleUpdateSubmit = async (report, reportId) => {
    try {
      const response = await fetch(`${CONFIG.URL}/finance/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to add report");
      }
      setAllReports([data]);
      setMessage("Laporan berhasil di ubah");
      setShowNotification(true);
    } catch (error) {
      console.error("Error make report:", error);
      setMessage("Gagal Membuat Laporan");
      setShowDangerNotification(true);
    }
  };

  return (
    <div>
      <ReportList
        allReports={allReports}
        handleDelete={handleDelete}
        year={year}
        setYear={setYear}
        setShowUpdateForm={setShowUpdateForm}
        setId={setId}
      />
      {showUpdateForm && (
        <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <UpdateDataForm
            handleUpdateSubmitReport={handleUpdateSubmit}
            allReports={allReports}
            productStock={productStock}
            setShowUpdateForm={setShowUpdateForm}
            id={id}
          />
        </div>
      )}
    </div>
  );
}
