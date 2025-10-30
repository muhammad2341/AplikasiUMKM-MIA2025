"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import Rating from "@/components/shared/Rating";
import ContactButtons from "@/components/shared/ContactButtons";
import { calculateDiscountPrice, isDiscountActive } from "@/lib/utils";

// Tipe untuk UMKM
interface UMKM {
  id: string;
  name: string;
  logo: string;
  address: string;
  rating: number;
}

interface ProductDetailProps {
  product: Product;
  umkm?: UMKM | null; // boleh kosong atau null
}

export default function ProductDetail({ product, umkm }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const hasDiscount = product.discount && isDiscountActive(product.discount);

  const finalPrice = hasDiscount
    ? calculateDiscountPrice(product.price, product.discount!)
    : product.price;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={
                  product.images?.[selectedImage] ||
                  "/images/placeholder-product.jpg"
                }
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Nama & Rating */}
            <div className="mb-4">
              {hasDiscount && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                  🔥 Diskon {product.discount?.value}%
                </span>
              )}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <Rating rating={4.5} showNumber />
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Harga */}
            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(finalPrice)}
                </span>

                {hasDiscount && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.price)}
                  </span>
                )}
              </div>

              {hasDiscount && product.discount?.endDate && (
                <div className="text-sm text-gray-600">
                  <span>Diskon berlaku sampai: </span>
                  <span className="font-medium">
                    {new Date(product.discount.endDate).toLocaleDateString(
                      "id-ID"
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Detail Produk */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-500">Kategori:</span>
                <span className="ml-2 font-medium">🏷️ {product.category}</span>
              </div>
              <div>
                <span className="text-gray-500">Stok:</span>
                <span
                  className={`ml-2 font-medium ${
                    product.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.isAvailable ? "Tersedia" : "Habis"}
                </span>
              </div>
            </div>

            {/* Info UMKM */}
            {umkm && (
              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Ditawarkan oleh:</h3>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={umkm.logo}
                    alt={umkm.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{umkm.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {umkm.address?.split(",")[0] || "Alamat tidak tersedia"}
                    </p>
                    <Rating rating={umkm.rating} showNumber />
                  </div>
                </div>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="space-y-3">
              <ContactButtons umkm={umkm} product={product} />
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                ❤️ Tambah ke Favorit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-lg mb-4">Informasi Tambahan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Deskripsi Produk</h4>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Cara Pemesanan</h4>
            <ul className="text-gray-600 space-y-1">
              <li>1. Klik tombol Hubungi via WhatsApp</li>
              <li>2. Sampaikan produk yang ingin dipesan</li>
              <li>3. Konfirmasi jumlah dan alamat pengiriman</li>
              <li>4. Lakukan pembayaran sesuai kesepakatan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
