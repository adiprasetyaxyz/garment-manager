import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function DataForm({ productStock, handleSubmitReport }) {
  const productNameArr = [];
  productStock.map((product) => productNameArr.push(product.name));
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      date: "",
      sales: [{ productName: "", ProductSold: "", ProductRevenue: "" }],
      expenses: {
        materialCost: "",
        tailorCost: "",
        otherExpenses: "",
      },
    },
  });

  const { fields: salesFields, append: appendSales } = useFieldArray({
    control,
    name: "sales",
  });
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
    const monthNumber = date.getMonth();
    const month = monthNames[monthNumber]; // Month as text
    const year = date.getFullYear();
    const formData = {
      ...data,
      month: month,
      year: year,
    };
    handleSubmitReport(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 rounded-md p-4"
    >
      <h2 className="text-xl font-bold ">Sales</h2>
      <div>
        <label>Tanggal</label>
        <input
          {...register("date")}
          type="Date"
          className="border p-2 rounded w-full text-gray-700"
          placeholder="Tanggal"
        />
      </div>
      {salesFields.map((field, index) => (
        <div key={field.id} className="space-y-4">
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
                      {console.log(option)}
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
              className="border p-2 rounded w-full"
              placeholder="Product Sold"
            />
          </div>
          <div>
            <label>Product Revenue</label>
            <input
              {...register(`sales.${index}.ProductRevenue`)}
              type="number"
              className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
          placeholder="Material Cost"
        />
      </div>
      <div>
        <label>Tailor Cost</label>
        <input
          {...register("expenses.tailorCost")}
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Tailor Cost"
        />
      </div>
      <div>
        <label>Other Expenses</label>
        <input
          {...register("expenses.otherExpenses")}
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Other Expenses"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Submit
      </button>
      <button
        type="button"
        onClick={() => reset()}
        className="bg-gray-500 text-white p-2 rounded m-2"
      >
        Reset
      </button>
    </form>
  );
}
