"use client";
import { UMKM } from "@/types/umkm";
import ContactButtons from "@/components/shared/ContactButtons";
import FavoriteButton from "@/components/shared/FavoriteButton";
import Rating from "@/components/shared/Rating";
import { isStoreOpen } from "@/lib/utils";

interface UMKMCardProps {
  umkm: UMKM;
  showActions?: boolean;
}

export default function UMKMCard({ umkm, showActions = true }: UMKMCardProps) {
  const isOpen = isStoreOpen(umkm.businessHours);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in">
      {/* UMKM Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={umkm.logo || "/images/placeholder-shop.jpg"}
          alt={umkm.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <FavoriteButton umkmId={umkm.id} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isOpen ? "🟢 Buka" : "🔴 Tutup"}
          </span>
        </div>
      </div>

      {/* UMKM Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {umkm.name}
          </h3>
          <Rating rating={umkm.rating} />
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {umkm.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-3">🏷️ {umkm.category}</span>
          <span>📍 {umkm.address.split(",")[0]}</span>
        </div>

        {/* Contact Buttons */}
        {showActions && (
          <div className="flex space-x-2">
            <ContactButtons umkm={umkm} size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}
