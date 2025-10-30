"use client";
import { useState, useEffect } from "react";
import UMKMSearch from "@/components/umkm/UMKMSearch";
import UMKMCard from "@/components/umkm/UMKMCard";
import UMKMMap from "@/components/umkm/UMKMMap";
import { useUMKM } from "@/hooks/useUMKM";
import Loading from "@/components/ui/Loading";

export default function UMKMDirectory() {
  const { umkm, loading, searchUMKM } = useUMKM();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
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

  if (loading) {
    return <Loading text="Memuat UMKM..." />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Directory UMKM
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Temukan usaha kecil menengah terdekat dan dukung produk lokal
          berkualitas
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8">
        <UMKMSearch onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Menampilkan {filteredUMKM.length} UMKM
          {searchQuery && ` untuk "${searchQuery}"`}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📋 Grid
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`px-4 py-2 rounded-lg font-medium ${
              viewMode === "map"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🗺️ Peta
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUMKM.map((umkm) => (
            <UMKMCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      ) : (
        <UMKMMap umkm={filteredUMKM} />
      )}

      {/* Empty State */}
      {filteredUMKM.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada UMKM ditemukan
          </h3>
          <p className="text-gray-600 mb-4">
            Coba ubah kata kunci pencarian atau filter yang digunakan
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
    </div>
  );
}
