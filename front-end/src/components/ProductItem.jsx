import React from "react";

export default function ProductItem({ productStock, setProductStock }) {
  return (
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
              Harga Jual: ${product.price}
            </p>
            {product.colors.map((color) => (
              <div key={color.color}>
                <h3
                  className="text-md font-semibold "
                  style={{ color: color.color.toLowerCase() }}
                >
                  {color.color}
                </h3>
                <div className="flex flex-wrap">
                  {Object.entries(color.sizes).map(
                    ([size, value]) =>
                      size !== "_id" && (
                        <div key={size} className="grid grid-row-4 p-0.5">
                          <span className="text-sm">
                            {size} {value.stock}
                          </span>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
