// app/(seller)/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface ProfileData {
  storeName: string;
  description: string;
  phone: string;
  address: string;
  category: string;
  since: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

export default function SellerProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    storeName: "",
    description: "",
    phone: "",
    address: "",
    category: "",
    since: "",
    website: "",
    instagram: "",
    facebook: "",
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProfile: ProfileData = {
      storeName:
        session?.user?.storeName || session?.user?.name || "Toko UMKM Saya",
      description:
        "UMKM lokal yang menyediakan berbagai produk kerajinan tangan dan makanan tradisional dengan kualitas terbaik. Kami berkomitmen untuk melestarikan warisan budaya melalui produk-produk autentik.",
      phone: "+6281234567890",
      address:
        "Jl. Merdeka No. 123, Kec. Central, Kota Jakarta Pusat, DKI Jakarta 10110",
      category: "Kerajinan Tangan & Makanan",
      since: "2020",
      website: "www.tokoumkm-saya.com",
      instagram: "@tokoumkm_saya",
      facebook: "Toko UMKM Saya",
    };

    Promise.resolve().then(() => {
      setFormData(mockProfile);
      setLoading(false);
    });
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simpan data profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Profile saved:", formData);
      alert("Profil berhasil disimpan!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Terjadi kesalahan saat menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const categories = [
    "Makanan & Minuman",
    "Kerajinan Tangan",
    "Fashion & Aksesoris",
    "Pertanian & Perkebunan",
    "Jasa & Kerajinan",
    "Kesehatan & Kecantikan",
    "Elektronik & Gadget",
    "Lainnya",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil UMKM</h1>
        <p className="text-gray-600">
          Kelola informasi dan identitas toko UMKM Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Informasi Dasar UMKM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Toko UMKM *
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nama toko UMKM Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori UMKM *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi UMKM *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ceritakan tentang UMKM Anda, visi misi, produk unggulan, dan keunggulan..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Deskripsi yang menarik akan membantu pelanggan memahami bisnis
              Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tahun Berdiri *
              </label>
              <input
                type="text"
                name="since"
                value={formData.since}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon/WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+6281234567890"
              />
            </div>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Kontak & Alamat
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jl. Contoh No. 123, Kecamatan, Kota, Provinsi Kode Pos"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="www.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nama Halaman Facebook"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Jam Operasional
          </h2>

          <div className="space-y-4">
            {[
              { day: "Senin", open: "08:00", close: "17:00", isOpen: true },
              { day: "Selasa", open: "08:00", close: "17:00", isOpen: true },
              { day: "Rabu", open: "08:00", close: "17:00", isOpen: true },
              { day: "Kamis", open: "08:00", close: "17:00", isOpen: true },
              { day: "Jumat", open: "08:00", close: "17:00", isOpen: true },
              { day: "Sabtu", open: "09:00", close: "15:00", isOpen: true },
              { day: "Minggu", open: "09:00", close: "15:00", isOpen: false },
            ].map((schedule) => (
              <div
                key={schedule.day}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={schedule.isOpen}
                    readOnly
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="w-20 font-medium text-gray-700">
                    {schedule.day}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={schedule.open}
                    readOnly
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">sampai</span>
                  <input
                    type="time"
                    value={schedule.close}
                    readOnly
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            * Hubungi admin untuk mengubah jam operasional
          </p>
        </div>

        {/* Gallery Placeholder */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Galeri UMKM
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">
              Upload foto toko, proses produksi, dan produk unggulan
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">Foto {i}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Tambah Foto
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Profil"}
          </button>
        </div>
      </form>
    </div>
  );
}
