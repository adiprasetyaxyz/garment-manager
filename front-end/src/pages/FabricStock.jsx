import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import FabricForm from "../components/materials/FabricForm";
import FabricStockItem from "../components/materials/fabricStockItem";

export default function FabricStock() {
  const [fabricStock, setFabricStock] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchFabricStock() {
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
    }
    fetchFabricStock();
  }, []);

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
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      console.log("Product successfully added:", data);
      setFabricStock([data]);
      setTimeout(() => {
        window.location.reload(); // Refresh the page after successful deletion
      }, 500);
    } catch (error) {
      console.error("Error adding product:", error);
    }
    setShowForm(false);
  };
  const handleUpdateFormSubmit = async (updatedFabric) => {
    const { _id, ...data } = updatedFabric; // Extract _id and other data

    try {
      const response = await fetch(`${CONFIG.URL}/materials/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send updated fabric data without _id
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update product");
      }

      console.log("Product successfully updated:", responseData);
      // Update fabricStock state if needed
      setFabricStock((prevStock) =>
        prevStock.map((fabric) => (fabric._id === _id ? responseData : fabric))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setShowForm(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Tambah Stock
      </button>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleForm}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <FabricForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
      <FabricStockItem
        fabricStock={fabricStock}
        setFabricStock={setFabricStock}
        handleUpdateFormSubmit={handleUpdateFormSubmit}
      />
    </div>
  );
}
