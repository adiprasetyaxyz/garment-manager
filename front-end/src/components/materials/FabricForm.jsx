import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function FabricForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fabric_type: "",
      price: 0,
      total_quantity: 0,
      colors: [{ color: "", quantity: 0, usedMaterial: 0 }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "colors",
  });

  const onSubmitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 relative h-auto flex-wrap"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Input Fabric Data</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fabric Type
          </label>
          <input
            type="text"
            {...register("fabric_type", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.fabric_type && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total Quantity
          </label>
          <input
            type="number"
            {...register("total_quantity", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.total_quantity && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Colors
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex space-x-2">
              <input
                type="text"
                {...register(`colors.${index}.color`, { required: true })}
                placeholder="Color"
                className=" w-36 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="number"
                {...register(`colors.${index}.quantity`, { required: true })}
                placeholder="Quantity"
                className=" w-36 *:shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          {errors.colors && (
            <span className="text-red-500 text-sm">
              All color fields are required
            </span>
          )}
          <button
            type="button"
            onClick={() => append({ color: "", quantity: 0, usedMaterial: 0 })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Add Color
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
