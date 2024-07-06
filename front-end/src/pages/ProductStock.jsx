import React from "react";
import ProductList from "../components/ProductList";
export default function ProductStock() {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <ProductList />
      </main>
    </div>
  );
}
