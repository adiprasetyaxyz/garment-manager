import React from "react";
import ProductUpdateForm from "./ProductUpdateForm";
import ProductForm from "./ProductStockForm";

export default function UpdateProductForm({
  selectedProduct,
  handleCloseForm,
  handleChange,
  products,
}) {
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-h-full overflow-y-auto">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={handleCloseForm}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ProductUpdateForm
          key={selectedProduct?._id}
          product={selectedProduct}
          onChange={handleChange}
          products={products}
        />
      </div>
    </div>
  );
}
