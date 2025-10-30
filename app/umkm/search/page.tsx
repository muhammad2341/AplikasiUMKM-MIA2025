"use client";
import { useState, useEffect } from "react";
import { useUMKM } from "@/hooks/useUMKM";
import UMKMSearch from "@/components/umkm/UMKMSearch";
import UMKMCard from "@/components/umkm/UMKMCard";
import Loading from "@/components/ui/Loading";
import { useSearchParams } from "next/navigation";

export default function UMKMSearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { umkm, loading, searchUMKM } = useUMKM();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({});
  const [filteredUMKM, setFilteredUMKM] = useState(umkm);

  useEffect(() => {
    const results = searchUMKM(searchQuery, filters);
    setFilteredUMKM(results);
  }, [searchQuery, filters, umkm, searchUMKM]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {initialQuery
            ? `Hasil pencarian untuk "${initialQuery}"`
            : "Cari UMKM"}
        </h1>
        <p className="text-gray-600">
          Temukan UMKM berdasarkan nama, kategori, atau lokasi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Search & Filter */}
        <div className="lg:col-span-1">
          <UMKMSearch onSearch={handleSearch} onFilter={handleFilter} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <Loading text="Mencari UMKM..." />
          ) : (
            <>
              {/* Results Info */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Ditemukan{" "}
                  <span className="font-semibold">{filteredUMKM.length}</span>{" "}
                  UMKM
                  {searchQuery && ` untuk "${searchQuery}"`}
                </p>
              </div>

              {/* UMKM Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUMKM.map((umkm) => (
                  <UMKMCard key={umkm.id} umkm={umkm} />
                ))}
              </div>

              {/* Empty State */}
              {filteredUMKM.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Coba gunakan kata kunci yang berbeda atau sesuaikan filter
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({});
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Tampilkan Semua UMKM
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
