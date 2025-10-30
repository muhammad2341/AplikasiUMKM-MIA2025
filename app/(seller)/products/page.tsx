// app/(seller)/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
  images: string[];
  createdAt: string;
  views: number;
  likes: number;
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Keripik Singkong Pedas",
        price: 15000,
        stock: 45,
        category: "Makanan Ringan",
        isActive: true,
        images: ["/placeholder.jpg"],
        createdAt: "2024-01-15",
        views: 125,
        likes: 23,
      },
      {
        id: 2,
        name: "Kerupuk Ikan Original",
        price: 12000,
        stock: 0,
        category: "Makanan Ringan",
        isActive: false,
        images: ["/placeholder.jpg"],
        createdAt: "2024-01-10",
        views: 89,
        likes: 15,
      },
      {
        id: 3,
        name: "Dodol Garut Premium",
        price: 25000,
        stock: 23,
        category: "Kue Tradisional",
        isActive: true,
        images: ["/placeholder.jpg"],
        createdAt: "2024-01-05",
        views: 156,
        likes: 34,
      },
      {
        id: 4,
        name: "Batik Tulis Solo",
        price: 185000,
        stock: 8,
        category: "Fashion & Aksesoris",
        isActive: true,
        images: ["/placeholder.jpg"],
        createdAt: "2024-01-01",
        views: 201,
        likes: 45,
      },
    ];

    Promise.resolve().then(() => {
      setProducts(mockProducts);
      setLoading(false);
    });
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : filter === "active"
      ? products.filter((p) => p.isActive)
      : products.filter((p) => !p.isActive);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produk Saya</h1>
          <p className="text-gray-600">Kelola semua produk UMKM Anda</p>
        </div>
        <Link
          href="/seller/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Produk</h3>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Produk Aktif</h3>
          <p className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.isActive).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Stok Habis</h3>
          <p className="text-2xl font-bold text-red-600">
            {products.filter((p) => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold text-blue-600">
            {products.reduce((sum, p) => sum + p.views, 0)}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex space-x-4">
          {["all", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status === "all"
                ? "Semua"
                : status === "active"
                ? "Aktif"
                : "Nonaktif"}
              <span className="ml-2 bg-white bg-opacity-20 px-1.5 py-0.5 rounded text-xs">
                {status === "all"
                  ? products.length
                  : status === "active"
                  ? products.filter((p) => p.isActive).length
                  : products.filter((p) => !p.isActive).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <Image
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </div>

              <p className="text-lg font-bold text-blue-600 mb-2">
                {formatCurrency(product.price)}
              </p>

              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Stok: {product.stock}</span>
                <span>Kategori: {product.category}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>👁️ {product.views} views</span>
                <span>❤️ {product.likes} likes</span>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={`/seller/products/${product.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit
                </Link>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  {product.isActive ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
          <p className="text-gray-500 mb-4">Tidak ada produk</p>
          <Link
            href="/seller/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Produk Pertama
          </Link>
        </div>
      )}
    </div>
  );
}
