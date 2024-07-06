import React, { useState } from "react";

const StockByColorForm = ({ onAddColor }) => {
  const [newColor, setNewColor] = useState("");
  const [sizes, setSizes] = useState({
    S: { stock: "", sold: "" },
    M: { stock: "", sold: "" },
    L: { stock: "", sold: "" },
    XL: { stock: "", sold: "" },
  });

  const handleColorChange = (e) => {
    setNewColor(e.target.value);
  };

  const handleSizeChange = (e, size) => {
    const updatedSizes = {
      ...sizes,
      [size]: {
        ...sizes[size],
        [e.target.name]: parseInt(e.target.value, 10),
      },
    };
    setSizes(updatedSizes);
  };

  const handleAddColor = () => {
    const newColorData = {
      name: newColor,
      sizes: {
        ...sizes,
      },
    };
    onAddColor(newColorData);
    setNewColor("");
    setSizes({
      S: { stock: "", sold: "" },
      M: { stock: "", sold: "" },
      L: { stock: "", sold: "" },
      XL: { stock: "", sold: "" },
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Add Color and Stock</h2>
      <div className="flex items-center mb-2">
        <label className="mr-2">Color:</label>
        <input
          type="text"
          value={newColor}
          onChange={handleColorChange}
          className="border rounded-md px-2 py-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(sizes).map((size) => (
          <div key={size}>
            <label className="block mb-1">{size}:</label>
            <div className="flex items-center">
              <label className="mr-2">Stock:</label>
              <input
                type="number"
                name="stock"
                value={sizes[size].stock}
                onChange={(e) => handleSizeChange(e, size)}
                className="border rounded-md px-2 py-1"
              />
            </div>
            <div className="flex items-center mt-1">
              <label className="mr-2">Sold:</label>
              <input
                type="number"
                name="sold"
                value={sizes[size].sold}
                onChange={(e) => handleSizeChange(e, size)}
                className="border rounded-md px-2 py-1"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddColor}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add Color
      </button>
    </div>
  );
};

export default StockByColorForm;
