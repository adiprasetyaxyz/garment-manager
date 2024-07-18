import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import FabricForm from "../components/materials/FabricForm";
import FabricStockItem from "../components/materials/fabricStockItem";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function FabricStock({
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [fabricStock, setFabricStock] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFabricStock();
  }, []);

  const fetchFabricStock = async () => {
    try {
      const res = await fetch(`${CONFIG.URL}/materials`);
      if (!res.ok) {
        throw new Error("Failed to fetch stock information");
      }
      const data = await res.json();
      setFabricStock(data);
    } catch (error) {
      console.error("Error fetching Product:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (stock) => {
    try {
      const response = await fetch(`${CONFIG.URL}/materials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
      });

      const data = await response.json();
      console.log("Product successfully added:", data);
      setMessage("Produk berhasil dibuat");
      setFabricStock([...fabricStock, data]); // Update fabricStock state
      setShowForm(false); // Hide the form
      setShowNotification(true);
      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Gagal membuat produk!");
      setShowDangerNotification(true);
    }
  };

  const handleUpdateFormSubmit = async (updatedFabric) => {
    const { _id, ...data } = updatedFabric; // Extract _id and other data

    try {
      const response = await fetch(`${CONFIG.URL}/materials/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Product successfully updated:", responseData);
      setMessage("Produk berhasil diubah");
      setShowNotification(true);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update product");
      }

      // Ensure responseData contains _id
      if (!responseData._id) {
        responseData._id = _id; // If not, assign the original _id to responseData
      }

      setFabricStock((prevStock) =>
        prevStock.map((fabric) => (fabric._id === _id ? responseData : fabric))
      );
      setShowForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Gagal mengubah produk!");
      setShowDangerNotification(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="ml-4 mt-4 select-none btn bg-indigo-500 hover:bg-indigo-600 text-white"
        type="button"
      >
        Tambah Stock <AddCircleIcon />
      </button>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <FabricForm onSubmit={handleFormSubmit} toggleForm={toggleForm} />
        </div>
      )}
      <FabricStockItem
        fabricStock={fabricStock}
        setFabricStock={setFabricStock}
        handleUpdateFormSubmit={handleUpdateFormSubmit}
        setMessage={setMessage}
        setShowNotification={setShowNotification}
        setShowDangerNotification={setShowDangerNotification}
      />
    </div>
  );
}
