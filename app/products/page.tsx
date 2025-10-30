"use client";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductSearch from "@/components/products/ProductSearch";
import ProductCard from "@/components/products/ProductCard";
import Loading from "@/components/ui/Loading";
import { Product } from "@/types/product"; // pastikan file ini ada

export default function ProductsPage() {
  const { products, loading, searchProducts } = useProducts();

  // State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Update hasil pencarian saat query/filter berubah
  useEffect(() => {
    const results = searchProducts(searchQuery, filters);
    setFilteredProducts(results);
  }, [searchQuery, filters, products, searchProducts]);

  // Event handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Semua Produk</h1>
        <p className="text-gray-600 max-w-2xl">
          Jelajahi berbagai produk berkualitas dari UMKM lokal terdekat
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Search & Filter */}
        <div className="lg:col-span-1">
          <ProductSearch onSearch={handleSearch} onFilter={handleFilter} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <Loading text="Memuat produk..." />
          ) : (
            <>
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Menampilkan{" "}
                  <span className="font-semibold">
                    {filteredProducts.length}
                  </span>{" "}
                  produk
                  {searchQuery && ` untuk "${searchQuery}"`}
                </p>

                {/* Sort Options */}
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Urutkan: Terbaru</option>
                  <option>Urutkan: Harga Terendah</option>
                  <option>Urutkan: Harga Tertinggi</option>
                  <option>Urutkan: Rating Tertinggi</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showUMKMInfo
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📦</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak ada produk ditemukan
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
                    Tampilkan Semua Produk
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
