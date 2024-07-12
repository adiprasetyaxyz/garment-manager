import React, { useState } from "react";
import CONFIG from "../script/config";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DeleteProduct({ productId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${CONFIG.URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete product");
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message || "Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessMessage = () => {
    setSuccess(false);
  };

  return (
    <div>
      <DeleteOutlineIcon
        onClick={handleDelete}
        className={` ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Product"}
      </DeleteOutlineIcon>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && (
        <div className="flex items-center mt-2">
          <p className="text-green-600">Product successfully deleted.</p>
          <button
            onClick={closeSuccessMessage}
            className="ml-2 text-sm text-gray-500 focus:outline-none"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
