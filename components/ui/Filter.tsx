"use client";
import { useState } from "react";

type FilterType = "select" | "checkbox" | "rating" | "range";

interface OptionItem {
  label: string;
  value: string | number | boolean;
}

interface FilterOption {
  label: string;
  type: FilterType;
  options: OptionItem[];
}

interface FiltersState {
  [key: string]: string | number | boolean;
}

interface FilterProps {
  filters: FiltersState;
  options: Record<string, FilterOption>;
  onChange: (filters: FiltersState) => void;
  className?: string;
}

export default function Filter({
  filters,
  options,
  onChange,
  className = "",
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  /** 🔹 Ganti any → Tipe aman berdasarkan FilterOption */
  const handleFilterChange = (
    key: string,
    value: string | number | boolean
  ) => {
    const newFilters: FiltersState = { ...filters, [key]: value };
    onChange(newFilters);
  };

  /** 🔹 Reset semua filter ke nilai default */
  const clearFilters = () => {
    const clearedFilters: FiltersState = Object.keys(filters).reduce(
      (acc, key) => {
        const opt = options[key];
        if (opt?.type === "checkbox") acc[key] = false;
        else if (opt?.type === "rating") acc[key] = 0;
        else acc[key] = "";
        return acc;
      },
      {} as FiltersState
    );
    onChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== false && v !== "" && v !== 0
  );

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      {/* Header Filter */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-gray-900">Filter</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Hapus Filter
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            {isOpen ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Konten Filter */}
      <div className={`p-4 space-y-4 ${isOpen ? "block" : "hidden md:block"}`}>
        {Object.entries(options).map(([key, option]) => (
          <div key={key} className="border-b pb-4 last:border-b-0 last:pb-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {option.label}
            </label>

            {/* 🔸 Select */}
            {option.type === "select" && (
              <select
                value={String(filters[key] ?? "")}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Semua</option>
                {option.options.map((opt) => (
                  <option key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {/* 🔸 Checkbox */}
            {option.type === "checkbox" && (
              <div className="space-y-2">
                {option.options.map((opt) => (
                  <label key={String(opt.value)} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={Boolean(filters[key])}
                      onChange={(e) =>
                        handleFilterChange(key, e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* 🔸 Rating */}
            {option.type === "rating" && (
              <div className="flex space-x-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() =>
                      handleFilterChange(
                        key,
                        filters[key] === rating ? 0 : rating
                      )
                    }
                    className={`p-2 rounded ${
                      Number(filters[key]) >= rating
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    ⭐ {rating}+
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
