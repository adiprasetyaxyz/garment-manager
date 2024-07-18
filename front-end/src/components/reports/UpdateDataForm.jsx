import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
export default function UpdateDataForm({
  productStock,
  handleUpdateSubmitReport,
  id,
  allReports,
  setShowUpdateForm,
}) {
  const productNameArr = productStock.map((product) => product.name);

  // Array untuk nama bulan
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Temukan report saat ini berdasarkan ID
  const currentValue = allReports.find((report) => report._id === id);

  // Temukan nomor bulan berdasarkan nama bulan dari data report
  const monthIndex = currentValue ? monthNames.indexOf(currentValue.month) : -1;

  // Jika monthIndex ditemukan, buat tanggal dengan tahun dan bulan yang benar
  const convertDate =
    currentValue && monthIndex !== -1
      ? {
          ...currentValue,
          date: new Date(currentValue.year || 2024, monthIndex + 1, 1)
            .toISOString()
            .split("T")[0], // Pastikan tahun ada, gunakan tahun default jika null
        }
      : {};

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: convertDate,
  });

  const { fields: salesFields, append: appendSales } = useFieldArray({
    control,
    name: "sales",
  });

  const onSubmit = (data) => {
    // Convert sales data to numbers
    data.sales = data.sales.map((sale) => ({
      ...sale,
      ProductSold: parseFloat(sale.ProductSold),
      ProductRevenue: parseFloat(sale.ProductRevenue),
    }));

    // Convert expense data to numbers
    data.expenses.materialCost = parseFloat(data.expenses.materialCost);
    data.expenses.tailorCost = parseFloat(data.expenses.tailorCost);
    data.expenses.otherExpenses = parseFloat(data.expenses.otherExpenses);

    const date = new Date(data.date);
    const month = monthNames[date.getMonth()]; // Month as text
    const year = date.getFullYear();

    const formData = {
      ...data,
      month: month,
      year: year,
    };

    handleUpdateSubmitReport(formData, id);
    setShowUpdateForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="top-5  space-y-6  bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg relative max-h-full overflow-y-auto w-3/4 p-8 m-8"
    >
      <button
        onClick={() => setShowUpdateForm(false)}
        className="absolute top-2 right-2"
      >
        <CloseIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
      </button>
      <h2 className="text-xl font-bold">Sales</h2>
      <div>
        <label>Tanggal</label>
        <input
          {...register("date")}
          type="date"
          className="border p-2 rounded w-full text-gray-700"
          placeholder="Tanggal"
        />
      </div>
      {salesFields.map((field, index) => (
        <div key={field.id} className="space-y-4 ">
          <div>
            <label>Product Name</label>
            <Controller
              name={`sales.${index}.productName`}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border p-2 rounded w-full text-gray-700"
                >
                  <option value="">Select a product</option>
                  {productNameArr.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div>
            <label>Product Sold</label>
            <input
              {...register(`sales.${index}.ProductSold`)}
              type="number"
              className="border p-2 rounded w-full text-gray-700"
              placeholder="Product Sold"
            />
          </div>
          <div>
            <label>Product Revenue</label>
            <input
              {...register(`sales.${index}.ProductRevenue`)}
              type="number"
              className="border p-2 rounded w-full text-gray-700"
              placeholder="Product Revenue"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendSales({ productName: "", ProductSold: "", ProductRevenue: "" })
        }
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Product
      </button>

      <h2 className="text-xl font-bold">Expenses</h2>
      <div>
        <label>Material Cost</label>
        <input
          {...register("expenses.materialCost")}
          type="number"
          className="border p-2 rounded w-full text-gray-700"
          placeholder="Material Cost"
        />
      </div>
      <div>
        <label>Tailor Cost</label>
        <input
          {...register("expenses.tailorCost")}
          type="number"
          className="border p-2 rounded w-full text-gray-700"
          placeholder="Tailor Cost"
        />
      </div>
      <div>
        <label>Other Expenses</label>
        <input
          {...register("expenses.otherExpenses")}
          type="number"
          className="border p-2 rounded w-full text-gray-700"
          placeholder="Other Expenses"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Submit
      </button>
      <button
        type="button"
        onClick={() => reset(convertDate)}
        className="bg-gray-500 text-white p-2 rounded m-2"
      >
        Reset
      </button>
    </form>
  );
}
