import React, { useState } from "react";
import CONFIG from "../../script/config";
import UpdateFabricForm from "./UpdateFabricForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

export default function FabricStockItem({
  fabricStock,
  setFabricStock,
  handleUpdateFormSubmit,
}) {
  const [fabricToUpdate, setFabricToUpdate] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdate = (fabricId) => {
    const fabric = fabricStock.find((fabric) => fabric._id === fabricId);
    setFabricToUpdate(fabric);
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
    setFabricToUpdate(null); // Reset fabricToUpdate state
  };

  const handleDelete = async (fabricId) => {
    try {
      const response = await fetch(`${CONFIG.URL}/materials/${fabricId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete fabric");
      }

      setFabricStock((prevStock) =>
        prevStock.filter((fabric) => fabric._id !== fabricId)
      );
      console.log("Fabric successfully deleted");
    } catch (error) {
      console.error("Error deleting fabric:", error);
    }
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4 p-4">
      {fabricStock.map((fabric) => {
        const totalUsedColorQuantity = fabric.colors.reduce(
          (total, color) => total + color.usedMaterial,
          0
        );

        return (
          <div key={fabric._id} className="fabric-item">
            <div className="bg-gray-300 p-6 rounded-lg">
              <div className="flex justify-between mb-2">
                <div className="text-left">
                  <p>Jenis Kain</p>
                  <p>Harga</p>
                  <p>Total</p>
                  <p>Terpakai</p>
                </div>
                <div className="text-right">
                  <p>{fabric.fabric_type}</p>
                  <p>{fabric.price}</p>
                  <p>{fabric.total_quantity}</p>
                  <p>{totalUsedColorQuantity}</p>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                {fabric.colors.map((color, index) => (
                  <div
                    key={`${fabric._id}-${index}`}
                    className="flex items-center"
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color.color }}
                    ></span>
                    <span>{color.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <EditIcon
                  onClick={() => handleUpdate(fabric._id)}
                  className="hover:cursor-pointer"
                ></EditIcon>
                <DeleteOutlineIcon
                  onClick={() => handleDelete(fabric._id)}
                  className="hover:cursor-pointer"
                ></DeleteOutlineIcon>
              </div>
            </div>
          </div>
        );
      })}
      {showUpdateForm && fabricToUpdate && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <CloseIcon
              onClick={handleCloseForm}
              className="hover:cursor-pointer absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            ></CloseIcon>
            <UpdateFabricForm
              onSubmit={handleUpdateFormSubmit}
              initialData={fabricToUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
