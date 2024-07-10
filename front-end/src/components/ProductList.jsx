import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ProductItem from "./ProductItem";
import AddProductForm from "./AddProductForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ProductList({
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productStock, setProductStock] = useState([]);

  useEffect(() => {
    fetchProductStock();
  }, []);

  const fetchProductStock = async () => {
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
  };

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

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(`${CONFIG.URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      setProductStock([...productStock, data]);
      setShowAddForm(false);
      setMessage("Produk berhasil dibuat");
      setShowNotification(true);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Gagal membuat produk");
      setShowDangerNotification(true);
    }
  };

  return (
    <div>
      <AddCircleIcon
        className="text-xl text-blue-950 cursor-pointer"
        onClick={() => toggleAddForm({ colors: [] })}
      />
      {productStock.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          <ProductItem
            productStock={productStock}
            setProductStock={setProductStock}
            setMessage={setMessage}
            setShowNotification={setShowNotification}
            setShowDangerNotification={setShowDangerNotification}
          />
        </ul>
      )}
      {showAddForm && (
        <AddProductForm
          selectedProduct={selectedProduct}
          handleCloseForm={handleCloseForm}
          handleChange={handleChange}
          handleAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
}
