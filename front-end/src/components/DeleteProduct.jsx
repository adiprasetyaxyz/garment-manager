import React, { useState } from "react";
import CONFIG from "../script/config";

export default function DeleteProduct({ productId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

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
      setTimeout(() => {
        window.location.reload(); // Refresh the page after successful deletion
      }, 500); // Adjust the timeout as needed
    } catch (error) {
      setError(error.message || "Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <button
        onClick={handleDelete}
        className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Product"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && (
        <p className="text-green-600 mt-2">Product successfully deleted.</p>
      )}
    </div>
  );
}
