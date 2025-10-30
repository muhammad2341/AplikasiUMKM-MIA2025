"use client";
import { UMKM } from "@/types/umkm";
import ContactButtons from "@/components/shared/ContactButtons";
import Rating from "@/components/shared/Rating";
import FavoriteButton from "@/components/shared/FavoriteButton";
import { isStoreOpen, getTimeUntilOpenClose } from "@/lib/utils";

interface UMKMDetailProps {
  umkm: UMKM;
}

export default function UMKMDetail({ umkm }: UMKMDetailProps) {
  const isOpen = isStoreOpen(umkm.businessHours);
  const timeInfo = getTimeUntilOpenClose(umkm.businessHours);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-64 bg-gray-200">
          <img
            src={umkm.banner || umkm.logo || "/images/placeholder-banner.jpg"}
            alt={umkm.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{umkm.name}</h1>
            <div className="flex items-center space-x-4">
              <Rating rating={umkm.rating} showNumber />
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                🏷️ {umkm.category}
              </span>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <FavoriteButton umkmId={umkm.id} size="lg" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {umkm.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📞</span>
                  <span>{umkm.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📧</span>
                  <span>{umkm.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📍</span>
                  <span>{umkm.address}</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-2 ${
                      isOpen ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOpen ? "🟢" : "🔴"}
                  </span>
                  <span className={isOpen ? "text-green-600" : "text-red-600"}>
                    {timeInfo.message}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 lg:mt-0 lg:ml-6">
              <ContactButtons umkm={umkm} />
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours & Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Hours */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Jam Operasional</h3>
            <div className="space-y-2">
              {umkm.businessHours.map((hours, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-medium">{hours.day}</span>
                  {hours.isClosed ? (
                    <span className="text-red-500 text-sm">Tutup</span>
                  ) : (
                    <span className="text-gray-600 text-sm">
                      {hours.open} - {hours.close}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Gallery */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Produk & Layanan</h3>

            {umkm.products && umkm.products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {umkm.products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {product.name}
                      </h4>
                      <span className="font-semibold text-blue-600">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(product.price)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    {product.discount && product.discount.isActive && (
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-2">
                        🔥 Diskon {product.discount.value}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📦</div>
                <p>Belum ada produk yang ditambahkan</p>
              </div>
            )}

            {umkm.products && umkm.products.length > 4 && (
              <div className="text-center mt-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Lihat {umkm.products.length - 4} produk lainnya →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
