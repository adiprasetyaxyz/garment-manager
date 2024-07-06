import React, { useEffect, useState } from "react";
import CONFIG from "../script/config";
import ProductItem from "./ProductItem";

export default function ProductList() {
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
      <h1>Product List</h1>
      {productStock.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          <ProductItem
            productStock={productStock}
            setProductStock={setProductStock}
          />
        </ul>
      )}
    </div>
  );
}
