"use client";
import { useState, useEffect } from "react";
import { UMKM } from "@/types/umkm";

interface UMKMMapProps {
  umkm: UMKM[];
  onUMKMClick?: (umkm: UMKM) => void;
}

export default function UMKMMap({ umkm, onUMKMClick }: UMKMMapProps) {
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);

  // This is a simplified map component
  // In a real app, you would integrate with Google Maps or Leaflet

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-lg mb-4">Lokasi UMKM</h3>

      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative">
        {/* Simplified map representation */}
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Peta Interaktif</p>
          <p className="text-sm mt-2">
            {umkm.length} UMKM ditemukan di area ini
          </p>
        </div>

        {/* Map markers - simplified */}
        {umkm.map((umkmItem, index) => (
          <button
            key={umkmItem.id}
            onClick={() => {
              setSelectedUMKM(umkmItem);
              onUMKMClick?.(umkmItem);
            }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              selectedUMKM?.id === umkmItem.id ? "z-10" : "z-0"
            }`}
            style={{
              left: `${20 + ((index * 15) % 70)}%`,
              top: `${30 + ((index * 20) % 60)}%`,
            }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-transform hover:scale-110 ${
                selectedUMKM?.id === umkmItem.id
                  ? "bg-red-500 scale-110"
                  : "bg-blue-500"
              }`}
            >
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Selected UMKM Info */}
      {selectedUMKM && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">
            {selectedUMKM.name}
          </h4>
          <p className="text-blue-700 text-sm">{selectedUMKM.address}</p>
          <p className="text-blue-600 text-sm">📞 {selectedUMKM.phone}</p>
        </div>
      )}

      {/* UMKM List */}
      <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
        {umkm.map((umkmItem, index) => (
          <div
            key={umkmItem.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedUMKM?.id === umkmItem.id
                ? "bg-blue-50 border-blue-300"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => {
              setSelectedUMKM(umkmItem);
              onUMKMClick?.(umkmItem);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">{umkmItem.name}</h5>
                  <p className="text-gray-500 text-sm">
                    {umkmItem.address.split(",")[0]}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{umkmItem.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
