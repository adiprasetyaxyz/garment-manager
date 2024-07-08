import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ProductItem from "./ProductItem";
import AddProductForm from "./AddProductForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
      <AddCircleIcon
        className="text-xl text-blue-950"
        onClick={() => toggleAddForm({ colors: [] })}
      ></AddCircleIcon>
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
