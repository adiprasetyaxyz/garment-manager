import React, { useState } from "react";
import CONFIG from "../script/config";
import CloseIcon from "@mui/icons-material/Close";
function UpdateProductForm({
  selectedProduct,
  handleCloseForm,
  handleChange,
  products,
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const initialProductState = selectedProduct || {
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
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate product data before sending
      if (!product.colors || product.colors.length === 0) {
        throw new Error("Please add at least one color with sizes.");
      }

      // Prepare the data to be sent to the server
      const { _id, name, fabric_type, price, colors } = product;
      const dataToSend = {
        name,
        fabric_type,
        price,
        colors: colors.map(({ color, sizes }) => ({
          color,
          sizes: Object.fromEntries(
            Object.entries(sizes).map(([size, { stock, sold, _id }]) => {
              if (size !== "_id") {
                return [size, { stock: Number(stock), sold: Number(sold) }];
              }
              return [size, _id];
            })
          ),
        })),
      };

      const response = await fetch(`${CONFIG.URL}/products/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log(dataToSend);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      console.log("Product successfully updated:", data);
      setSubmitted(true);
      handleCloseForm();
      setMessage("Product berhasil diperbarui");
      setShowNotification(true);
    } catch (error) {
      setError(error.message || "Failed to update product. Please try again.");
      console.error("Error updating product:", error);
      setMessage("Product gagal diperbarui");
      setShowDangerNotification(true);
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

  const handleSizeChange = (index, size, e, field) => {
    const { value } = e.target;
    const newColors = [...product.colors];
    newColors[index].sizes[size][field] = value;
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
    <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="mt-10 mb-10 pb-5 overflow-auto max-w-md mx-auto p-6 bg-white dark:bg-slate-800 h-screen border border-slate-200 dark:border-slate-700 rounded shadow-md">
        <div className="flex justify-between items-center">
          <div></div>
          <CloseIcon
            className="hover:cursor-pointer hover:text-gray-700"
            onClick={handleCloseForm}
          />
        </div>
        <h1 className="text-xl font-semibold mb-4">Input Product Data</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 h-full "
        >
          <div>
            <label className="block text-sm font-medium">Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Material:</label>
            <input
              type="text"
              name="fabric_type"
              value={product.fabric_type}
              onChange={handleInputChange}
              className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price:</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {product.colors.map((colorObj, index) => (
            <div key={index} className="col-span-2">
              <label className="block text-sm font-medium">Color:</label>
              <input
                type="text"
                name="color"
                value={colorObj.color}
                onChange={(e) => handleColorChange(index, e)}
                className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
              {["S", "M", "L", "XL"].map((size) => (
                <div key={size}>
                  <label className="block text-sm font-medium">
                    Size {size} stock:
                  </label>
                  <input
                    type="text"
                    value={colorObj.sizes[size].stock}
                    onChange={(e) => handleSizeChange(index, size, e)}
                    className="text-gray-700 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
    </div>
  );
}

export default UpdateProductForm;
