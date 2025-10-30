"use client";
import { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import Filter from "@/components/ui/Filter";

// ✅ Definisikan tipe untuk filters
interface ProductFilters {
  category: string;
  priceRange: string;
  availability: boolean;
  hasDiscount: boolean;
}

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: ProductFilters) => void;
  className?: string;
}

export default function ProductSearch({
  onSearch,
  onFilter,
  className = "",
}: ProductSearchProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    category: "",
    priceRange: "",
    availability: false,
    hasDiscount: false,
  });

  // ✅ Ganti any dengan tipe ProductFilters
  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const filterOptions = {
    category: {
      label: "Kategori Produk",
      type: "select" as const,
      options: [
        { label: "Makanan & Minuman", value: "food" },
        { label: "Fashion", value: "fashion" },
        { label: "Kerajinan", value: "craft" },
        { label: "Elektronik", value: "electronic" },
        { label: "Kecantikan", value: "beauty" },
      ],
    },
    priceRange: {
      label: "Rentang Harga",
      type: "select" as const,
      options: [
        { label: "Semua Harga", value: "" },
        { label: "Dibawah Rp 50.000", value: "under-50k" },
        { label: "Rp 50.000 - 100.000", value: "50k-100k" },
        { label: "Rp 100.000 - 500.000", value: "100k-500k" },
        { label: "Diatas Rp 500.000", value: "over-500k" },
      ],
    },
    availability: {
      label: "Ketersediaan",
      type: "checkbox" as const,
      options: [{ label: "Stok Tersedia", value: "available" }],
    },
    hasDiscount: {
      label: "Promo",
      type: "checkbox" as const,
      options: [{ label: "Ada Diskon", value: "discount" }],
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="mb-4">
        <SearchBar
          placeholder="Cari produk, merek, atau kata kunci..."
          onSearch={onSearch}
        />
      </div>

      <Filter
        filters={filters}
        options={filterOptions}
        onChange={handleFilterChange}
      />
    </div>
  );
}
