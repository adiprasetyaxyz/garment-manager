import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ProductItem from "./ProductItem";
import AddProductForm from "./AddProductForm";

export default function ProductList() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleAddForm = (product) => {
    setShowAddForm(!showAddForm);
    setSelectedProduct(product);
  };

  const handleChange = (updatedProduct) => {
    const updatedProducts = productStock.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setProductStock(updatedProducts);
    setShowAddForm(false);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setSelectedProduct(null);
    setTimeout(() => {
      window.location.reload(); // Refresh the page after successful deletion
    }, 500);
  };
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
  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => toggleAddForm({ colors: [] })}
      >
        Tambah Product
      </button>
      {productStock.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          <ProductItem
            productStock={productStock}
            setProductStock={setProductStock}
          />
        </ul>
      )}{" "}
      {showAddForm && (
        <AddProductForm
          selectedProduct={selectedProduct}
          handleCloseForm={handleCloseForm}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
