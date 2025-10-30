"use client";
import { useState, ChangeEvent } from "react";

export type FilterType = "select" | "checkbox" | "rating" | "range";

export interface FilterOption {
  label: string;
  type: FilterType;
  options: { label: string; value: string | number | boolean }[];
}

export interface FilterProps<
  T extends Record<string, string | number | boolean>
> {
  filters: T;
  options: Record<keyof T, FilterOption>;
  onChange: (filters: T) => void;
  className?: string;
}

export default function Filter<
  T extends Record<string, string | number | boolean>
>({ filters, options, onChange, className = "" }: FilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // Ubah nilai filter tertentu
  const handleFilterChange = (
    key: keyof T,
    value: string | number | boolean
  ) => {
    const newFilters = { ...filters, [key]: value };
    onChange(newFilters);
  };

  // Hapus semua filter aktif
  const clearFilters = () => {
    const cleared = { ...filters };

    (Object.keys(filters) as (keyof T)[]).forEach((key) => {
      const opt = options[key];
      if (opt.type === "checkbox") cleared[key] = false as T[keyof T];
      else if (opt.type === "rating") cleared[key] = 0 as T[keyof T];
      else cleared[key] = "" as T[keyof T];
    });

    onChange(cleared);
  };

  // Cek apakah ada filter aktif
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== false && value !== "" && value !== 0
  );

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      {/* Header */}
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

      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${isOpen ? "block" : "hidden md:block"}`}>
        {Object.entries(options).map(([key, opt]) => (
          <div key={key} className="border-b pb-4 last:border-b-0 last:pb-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {opt.label}
            </label>

            {/* SELECT */}
            {opt.type === "select" && (
              <select
                value={String(filters[key as keyof T] ?? "")}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange(key as keyof T, e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Semua</option>
                {opt.options.map((o) => (
                  <option key={String(o.value)} value={String(o.value)}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}

            {/* CHECKBOX */}
            {opt.type === "checkbox" && (
              <div className="space-y-2">
                {opt.options.map((o) => (
                  <label key={String(o.value)} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={Boolean(filters[key as keyof T])}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleFilterChange(key as keyof T, e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* RATING */}
            {opt.type === "rating" && (
              <div className="flex space-x-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      handleFilterChange(
                        key as keyof T,
                        filters[key as keyof T] === rating ? 0 : rating
                      )
                    }
                    className={`p-2 rounded ${
                      Number(filters[key as keyof T]) >= rating
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
