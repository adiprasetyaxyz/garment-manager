import React from "react";
import AttributionIcon from "@mui/icons-material/Attribution";
function DashboardCard07({ productData }) {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Top Product
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Nama Produk</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Penjualan</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Pendapatan</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}

              {productData.map((product) => (
                <tr key={product._id}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{product.total_sold}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-emerald-500">
                      {product.total_sold * product.price}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Row */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
