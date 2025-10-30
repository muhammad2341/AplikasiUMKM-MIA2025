// app/(seller)/products/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  isActive: boolean;
  images: string[];
  weight: number;
  dimensions: string;
  createdAt: string;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        try {
          // Mock data - replace with actual API call
          const mockProduct: Product = {
            id: parseInt(params.id as string),
            name: "Keripik Singkong Pedas",
            description:
              "Keripik singkong pedas dengan bumbu rempah pilihan. Dibuat dari singkong segar pilihan dan diolah secara tradisional untuk menjaga cita rasa asli. Cocok untuk camilan sehari-hari atau oleh-oleh.",
            price: 15000,
            stock: 45,
            category: "Makanan Ringan",
            tags: ["pedas", "tradisional", "crispy", "organik"],
            isActive: true,
            images: ["/placeholder.jpg"],
            weight: 200,
            dimensions: "15x10x5 cm",
            createdAt: "2024-01-15",
          };
          setProduct(mockProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Product updated:", product);
      alert("Produk berhasil diupdate!");
      router.push("/seller/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Terjadi kesalahan saat mengupdate produk");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!product) return;

    const { name, value, type } = e.target;
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]: type === "number" ? parseFloat(value) || 0 : value,
          }
        : null
    );
  };

  const categories = [
    "Makanan Ringan",
    "Kue Tradisional",
    "Minuman",
    "Kerajinan Tangan",
    "Fashion & Aksesoris",
    "Pertanian & Perkebunan",
    "Kesehatan & Kecantikan",
    "Lainnya",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Produk tidak ditemukan</p>
        <button
          onClick={() => router.push("/seller/products")}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Kembali ke Daftar Produk
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Produk</h1>
          <p className="text-gray-600">Ubah informasi produk UMKM Anda</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          Kembali
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-6"
      >
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Produk *
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Produk *
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga (IDR) *
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stok *
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Berat (gram)
            </label>
            <input
              type="number"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={product.tags.join(", ")}
              onChange={(e) =>
                setProduct((prev) =>
                  prev
                    ? {
                        ...prev,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim()),
                      }
                    : null
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensi Produk
          </label>
          <input
            type="text"
            name="dimensions"
            value={product.dimensions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={product.isActive}
            onChange={(e) =>
              setProduct((prev) =>
                prev
                  ? {
                      ...prev,
                      isActive: e.target.checked,
                    }
                  : null
              )
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Tampilkan produk di toko (aktif)
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Produk
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">Gambar produk saat ini</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">+ Tambah</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Ubah Gambar
            </button>
          </div>
        </div>

        {/* Product Stats */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Informasi Produk</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Dibuat pada</p>
              <p className="font-medium">
                {new Date(product.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p
                className={`font-medium ${
                  product.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.isActive ? "Aktif" : "Nonaktif"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">ID Produk</p>
              <p className="font-medium">#{product.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Terakhir diupdate</p>
              <p className="font-medium">
                {new Date().toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
