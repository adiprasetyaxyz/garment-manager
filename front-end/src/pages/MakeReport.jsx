import React, { useEffect, useState } from "react";
import DataForm from "../components/reports/DataForm";
import CONFIG from "../script/config";

export default function MakeReport({
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
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

  const handleSubmit = async (report) => {
    try {
      const response = await fetch(`${CONFIG.URL}/finance`, {
        method: "POST",
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

      setMessage("Report successfully added!");
      setShowNotification(true);
    } catch (error) {
      console.error("Error make report:", error);
      setMessage("Gagal Membuat Laporan");
      setShowDangerNotification(true);
    }
  };

  return (
    <div className="relative">
      <div className="lg:m-14 bg-white lg:p-6 rounded-md sm:m-6 sm:p-6 xs:m-3 xs:p-3">
        <DataForm
          productStock={productStock}
          handleSubmitReport={handleSubmit}
        />
      </div>
    </div>
  );
}
