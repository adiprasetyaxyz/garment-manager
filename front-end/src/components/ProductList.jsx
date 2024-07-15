import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ProductItem from "./ProductItem";
import AddProductForm from "./AddProductForm";

export default function ProductList({
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [productStock, setProductStock] = useState([]);

  useEffect(() => {
    fetchProductStock();
  }, []);

  const fetchProductStock = async () => {
    try {
      const res = await fetch(`${CONFIG.URL}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch product information");
      }
      const data = await res.json();
      setProductStock(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <AddProductForm
        setMessage={setMessage}
        setShowNotification={setShowNotification}
        setShowDangerNotification={setShowDangerNotification}
        productStock={productStock}
        setProductStock={setProductStock}
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
    </div>
  );
}
