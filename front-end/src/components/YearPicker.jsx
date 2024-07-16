import React, { useState } from "react";

function YearPicker({ align, startYear, endYear, onChange }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (onChange) {
      onChange(year);
    }
  };

  return (
    <div className={`relative ${align}`}>
      <select
        className="form-select pl-9 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-[15.5rem]"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 ml-3"
          viewBox="0 0 16 16"
        >
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  );
}

export default YearPicker;
