import React, { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./UpdateProductForm";

export default function ProductItem({ productStock, setProductStock }) {
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
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productStock.map((product) => (
            <li
              key={product._id}
              className="bg-white rounded-lg shadow-md grid grid-cols-2 justify-center"
            >
              <img
                src={
                  "https://s3.belanjapasti.com/media/image/kaos-polos-katun-lengan-pendek-508560.jpg"
                }
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-1 text-sm">
                  Jenis Kain: {product.fabric_type}
                </p>
                <p className="text-gray-700 mb-1 text-sm">
                  Harga Jual: Rp. {product.price}
                </p>
                {product.colors.map((color) => (
                  <div key={color.color}>
                    <h3
                      className="text-sm font-semibold "
                      style={{ color: color.color.toLowerCase() }}
                    >
                      {color.color}
                    </h3>
                    <div className="flex flex-row">
                      {Object.entries(color.sizes).map(([size, value]) =>
                        size !== "_id" ? (
                          <div key={size} className="grid grid-row-4 p-0.5">
                            <span className="text-xs">
                              {size} {value.stock}
                            </span>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <DeleteProduct productId={product._id} />
                {showAddForm && (
                  <UpdateProductForm
                    selectedProduct={selectedProduct}
                    handleCloseForm={handleCloseForm}
                    handleChange={handleChange}
                    products={product}
                  />
                )}
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                  onClick={() => toggleAddForm({ colors: [] })}
                >
                  Update Product
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}