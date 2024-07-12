import React, { useState } from "react";
import CONFIG from "../script/config";

function ProductForm() {
  const initialProductState = {
    name: "",
    fabric_type: "",
    price: "",
    colors: [
      {
        color: "",
        sizes: {
          S: { stock: "", sold: 0 },
          M: { stock: "", sold: 0 },
          L: { stock: "", sold: 0 },
          XL: { stock: "", sold: 0 },
        },
      },
    ],
  };

  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate product data before sending
      if (!product.colors || product.colors.length === 0) {
        throw new Error("Please add at least one color with sizes.");
      }

      const response = await fetch(`${CONFIG.URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      console.log("Product successfully added:", data);
      setProduct(initialProductState);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index, e) => {
    const { name, value } = e.target;
    const newColors = [...product.colors];
    newColors[index][name] = value;
    setProduct({ ...product, colors: newColors });
  };

  const handleSizeChange = (index, size, e) => {
    const { value } = e.target;
    const newColors = [...product.colors];
    newColors[index].sizes[size].stock = value;
    setProduct({ ...product, colors: newColors });
  };

  const addColor = () => {
    setProduct((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          color: "",
          sizes: {
            S: { stock: "", sold: 0 },
            M: { stock: "", sold: 0 },
            L: { stock: "", sold: 0 },
            XL: { stock: "", sold: 0 },
          },
        },
      ],
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-xl font-semibold mb-4">Input Product Data</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 h-full overflow-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Material:
          </label>
          <input
            type="text"
            name="fabric_type"
            value={product.fabric_type}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {product.colors.map((colorObj, index) => (
          <div key={index} className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Color:
            </label>
            <input
              type="text"
              name="color"
              value={colorObj.color}
              onChange={(e) => handleColorChange(index, e)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {["S", "M", "L", "XL"].map((size) => (
              <div key={size}>
                <label className="block text-sm font-medium text-gray-700">
                  Size {size} stock:
                </label>
                <input
                  type="text"
                  value={colorObj.sizes[size].stock}
                  onChange={(e) => handleSizeChange(index, size, e)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            ))}
          </div>
        ))}

        <div className="col-span-2">
          <button
            type="button"
            onClick={addColor}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Color
          </button>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
