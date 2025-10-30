"use client";
import { useState } from "react";
import { useUMKM } from "@/hooks/useUMKM";
import UMKMMap from "@/components/umkm/UMKMMap";
import UMKMCard from "@/components/umkm/UMKMCard";
import UMKMSearch from "@/components/umkm/UMKMSearch";
import Loading from "@/components/ui/Loading";

export default function UMKMMapPage() {
  const { umkm, loading, searchUMKM } = useUMKM();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedUMKM, setSelectedUMKM] = useState<any>(null);
  const [filteredUMKM, setFilteredUMKM] = useState(umkm);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchUMKM(query, filters);
    setFilteredUMKM(results);
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    const results = searchUMKM(searchQuery, newFilters);
    setFilteredUMKM(results);
  };

  const handleUMKMClick = (umkm: any) => {
    setSelectedUMKM(umkm);
  };

  if (loading) {
    return <Loading text="Memuat peta UMKM..." />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Peta UMKM</h1>
        <p className="text-gray-600">
          Lihat lokasi UMKM di peta interaktif dan temukan yang terdekat dengan
          Anda
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <UMKMSearch onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <UMKMMap umkm={filteredUMKM} onUMKMClick={handleUMKMClick} />
        </div>

        {/* UMKM List */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Daftar UMKM ({filteredUMKM.length})
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredUMKM.map((umkm, index) => (
                <div
                  key={umkm.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedUMKM?.id === umkm.id
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                  onClick={() => handleUMKMClick(umkm)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {umkm.name}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {umkm.address.split(",")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected UMKM Details */}
          {selectedUMKM && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Detail UMKM</h3>
              <UMKMCard umkm={selectedUMKM} showActions={false} />
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredUMKM.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🗺️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada UMKM ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah pencarian atau filter untuk melihat UMKM di peta
          </p>
        </div>
      )}
    </div>
  );
}
