import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ReportList from "../components/reports/ReportList";

export default function Finance() {
  const [allReports, setAllReports] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
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
      console.log("Deleted report with ID:", reportId);
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div>
      <ReportList
        allReports={allReports}
        handleDelete={handleDelete}
        year={year}
        setYear={setYear}
      />
    </div>
  );
}
