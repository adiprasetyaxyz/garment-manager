import React, { useState, useEffect } from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateProductForm from "./UpdateProductForm";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductItem({
  productStock,
  setProductStock,
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalSold, setTotalSold] = useState(0);

  // Calculate total sold for all products
  useEffect(() => {
    let total = 0;
    productStock.forEach((product) => {
      product.colors.forEach((color) => {
        Object.values(color.sizes).forEach((size) => {
          total += size.sold;
        });
      });
    });
    setTotalSold(total);
  }, [productStock]);

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
    setTimeout(() => {}, 500);
  };

  // Function to calculate total sold for a color
  const calculateTotalSold = (sizes) => {
    let totalSold = 0;
    Object.values(sizes).forEach((size) => {
      if (size && typeof size === "object" && "sold" in size) {
        totalSold += size.sold || 0; // ensure `size.sold` is a number
      }
    });
    return totalSold;
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4"></h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productStock.map((product) => (
            <li
              key={product._id}
              className=" bg-white dark:bg-gray-400 bg-transparent-10 rounded-lg shadow-md p-2 m-2"
            >
              <div className=" grid grid-cols-2 justify-center">
                <img
                  src={
                    "https://www.hummel.net/dw/image/v2/BDWL_PRD/on/demandware.static/-/Sites-hummel-master-catalog/default/dw580bbf91/images/model/215119-9001_A.png?sw=514&sh=685&q=80"
                  }
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="mb-1 text-xs">
                    Jenis Kain: {product.fabric_type}
                  </p>
                  <p className="mb-1 text-xs">
                    Harga Jual: Rp. {product.price}
                  </p>
                  {product.colors.map((color) => (
                    <div key={color.color}>
                      <h3 className="text-sm font-semibold ">{color.color}</h3>
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
                      <p className=" mb-1 text-xs">
                        Total Terjual: {calculateTotalSold(color.sizes)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row-reverse">
                <DeleteProduct productId={product._id} />
                <EditIcon onClick={() => toggleAddForm(product)} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAddForm && selectedProduct && (
        <UpdateProductForm
          selectedProduct={selectedProduct}
          handleCloseForm={handleCloseForm}
          handleChange={handleChange}
          products={selectedProduct}
          setMessage={setMessage}
          setShowNotification={setShowNotification}
          setShowDangerNotification={setShowDangerNotification}
        />
      )}
    </div>
  );
}
