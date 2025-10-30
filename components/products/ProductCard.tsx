"use client";
import { Product } from "@/types/product";
import Rating from "@/components/shared/Rating";
import { calculateDiscountPrice, isDiscountActive } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  showUMKMInfo?: boolean;
  showActions?: boolean;
}

export default function ProductCard({
  product,
  showUMKMInfo = false,
  showActions = true,
}: ProductCardProps) {
  const hasDiscount = product.discount && isDiscountActive(product.discount);
  const finalPrice = hasDiscount
    ? calculateDiscountPrice(product.price, product.discount!)
    : product.price;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={product.images[0] || "/images/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              🔥 {product.discount!.value}% OFF
            </span>
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.isAvailable ? "Tersedia" : "Habis"}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-blue-600">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(finalPrice)}
          </span>

          {hasDiscount && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(product.price)}
            </span>
          )}
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>🏷️ {product.category}</span>
          <Rating rating={4.5} /> {/* Default rating for now */}
        </div>

        {/* UMKM Info */}
        {showUMKMInfo && (
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">🏪</span>
              <span>Nama UMKM</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex space-x-2 mt-4">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              💬 Hubungi
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
              ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
