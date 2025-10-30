"use client";

import { useEffect } from "react";
import Link from "next/link"; // ✅ Tambahkan ini!
import { useParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useUMKM } from "@/hooks/useUMKM";
import ProductDetail from "@/components/products/ProductDetail";
import Loading from "@/components/ui/Loading";
import { trackProductView } from "@/lib/database/db";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { getProductById } = useProducts();
  const { umkm } = useUMKM();

  const product = getProductById(productId);
  const productUMKM = umkm.find((u) => u.id === product?.umkmId);

  useEffect(() => {
    if (product) {
      trackProductView(product.id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Produk tidak ditemukan
        </h1>
        <p className="text-gray-600 mb-8">
          Produk yang Anda cari tidak ditemukan atau mungkin sudah tidak
          tersedia.
        </p>

        {/* ✅ Gunakan Link dari next/link untuk navigasi internal */}
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <ProductDetail product={product} umkm={productUMKM} />
    </div>
  );
}
