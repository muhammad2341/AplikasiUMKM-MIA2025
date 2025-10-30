"use client";
import { useState } from "react";
import { Product } from "@/types/product";

interface ProductFormProps {
  product?: Product;
}

interface Discount {
  type: "percentage" | "fixed";
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function ProductForm({ product }: ProductFormProps) {
  const initialDiscount: Discount = product?.discount ?? {
    type: "percentage",
    value: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    isActive: false,
  };

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    category: product?.category ?? "",
    images: product?.images ?? [""],
    isAvailable: product?.isAvailable ?? true,
    discount: initialDiscount,
  });

  const [hasDiscount, setHasDiscount] = useState<boolean>(
    !!product?.discount?.isActive
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data:", {
      ...formData,
      discount: hasDiscount ? formData.discount : undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, type } = target;

    // Tangani input number, checkbox, atau string
    const value =
      type === "checkbox"
        ? (target as HTMLInputElement).checked
        : type === "number"
        ? Number(target.value)
        : target.value;

    if (name.startsWith("discount.")) {
      const key = name.split(".")[1] as keyof Discount;
      setFormData((prev) => ({
        ...prev,
        discount: {
          ...prev.discount,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addImageField = () =>
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));

  const removeImageField = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

  const updateImage = (index: number, value: string) =>
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informasi Produk */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Produk
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Produk *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp) *
              </label>
              <input
                type="number"
                name="price"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              >
                <option value="">Pilih Kategori</option>
                <option value="food">Makanan & Minuman</option>
                <option value="fashion">Fashion</option>
                <option value="craft">Kerajinan</option>
                <option value="electronic">Elektronik</option>
                <option value="beauty">Kecantikan</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Produk tersedia</span>
          </label>
        </div>
      </div>

      {/* Gambar Produk */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Gambar Produk
        </h3>

        <div className="space-y-3">
          {formData.images.map((image, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="url"
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md shadow-sm"
                placeholder="https://example.com/image.jpg"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            + Tambah Gambar
          </button>
        </div>
      </div>

      {/* Diskon Produk */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Pengaturan Diskon
          </h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={(e) => setHasDiscount(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Aktifkan diskon</span>
          </label>
        </div>

        {hasDiscount && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Diskon
              </label>
              <select
                name="discount.type"
                value={formData.discount.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              >
                <option value="percentage">Persentase (%)</option>
                <option value="fixed">Potongan Tetap (Rp)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.discount.type === "percentage"
                  ? "Persentase Diskon (%)"
                  : "Potongan Harga (Rp)"}
              </label>
              <input
                type="number"
                name="discount.value"
                min="0"
                max={formData.discount.type === "percentage" ? 100 : undefined}
                value={formData.discount.value}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mulai Tanggal
              </label>
              <input
                type="date"
                name="discount.startDate"
                value={formData.discount.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Berakhir Tanggal
              </label>
              <input
                type="date"
                name="discount.endDate"
                value={formData.discount.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tombol Submit */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {product ? "Update Produk" : "Tambah Produk"}
        </button>
      </div>
    </form>
  );
}
