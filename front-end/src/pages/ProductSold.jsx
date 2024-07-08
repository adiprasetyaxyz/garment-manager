import React from "react";
import ProductList from "../components/ProductList";
export default function ProductSold() {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <ProductList />
      </main>
    </div>
  );
}
