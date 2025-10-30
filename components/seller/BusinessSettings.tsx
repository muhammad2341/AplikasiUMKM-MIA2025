"use client";
import { useState } from "react";

// ✅ Definisikan tipe BusinessHour (kalau belum ada di @/types)
export interface BusinessHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

// ✅ Definisikan tipe UMKM dasar (jika belum)
export interface UMKM {
  name: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  lat: number;
  lng: number;
  logo?: string;
  banner?: string;
  businessHours: BusinessHour[];
}

export default function BusinessSettings() {
  const [formData, setFormData] = useState<UMKM>({
    name: "Kedai Kopi Bahagia",
    description: "Kedai kopi lokal dengan biji kopi pilihan dari petani lokal",
    category: "food",
    phone: "+628123456789",
    email: "kedai.bahagia@email.com",
    address: "Jl. Merdeka No. 123, Jakarta Pusat",
    lat: -6.2088,
    lng: 106.8456,
    logo: "/images/coffee-logo.jpg",
    banner: "/images/coffee-banner.jpg",
    businessHours: [
      { day: "Senin", open: "07:00", close: "22:00", isClosed: false },
      { day: "Selasa", open: "07:00", close: "22:00", isClosed: false },
      { day: "Rabu", open: "07:00", close: "22:00", isClosed: false },
      { day: "Kamis", open: "07:00", close: "22:00", isClosed: false },
      { day: "Jumat", open: "07:00", close: "23:00", isClosed: false },
      { day: "Sabtu", open: "08:00", close: "23:00", isClosed: false },
      { day: "Minggu", open: "08:00", close: "21:00", isClosed: false },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business Settings:", formData);
  };

  // ✅ Pastikan lat/lng dikonversi ke number
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "lat" || name === "lng"
          ? parseFloat(value)
          : (value as string),
    }));
  };

  // ✅ Gunakan tipe aman untuk field dan value
  const handleBusinessHoursChange = (
    index: number,
    field: keyof BusinessHour,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: prev.businessHours.map((hours, i) =>
        i === index ? { ...hours, [field]: value } : hours
      ),
    }));
  };

  const toggleDayClosed = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: prev.businessHours.map((hours, i) =>
        i === index ? { ...hours, isClosed: !hours.isClosed } : hours
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* === Informasi UMKM === */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi UMKM
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama UMKM *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nama usaha Anda"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi UMKM *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Jelaskan tentang UMKM Anda"
            />
          </div>

          {/* Kategori & Telepon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="food">Makanan & Minuman</option>
                <option value="fashion">Fashion</option>
                <option value="craft">Kerajinan</option>
                <option value="service">Jasa</option>
                <option value="retail">Retail</option>
                <option value="other">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="+628123456789"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="umkm@email.com"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Lengkap *
            </label>
            <textarea
              name="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Alamat lengkap UMKM"
            />
          </div>

          {/* Logo & Banner */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Logo
              </label>
              <input
                type="url"
                name="logo"
                value={formData.logo || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/logo.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Banner
              </label>
              <input
                type="url"
                name="banner"
                value={formData.banner || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/banner.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Jam Operasional === */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Jam Operasional
        </h3>

        <div className="space-y-4">
          {formData.businessHours.map((hours, index) => (
            <div
              key={hours.day}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="w-24">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!hours.isClosed}
                    onChange={() => toggleDayClosed(index)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {hours.day}
                  </span>
                </label>
              </div>

              {!hours.isClosed ? (
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Buka
                    </label>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleBusinessHoursChange(index, "open", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Tutup
                    </label>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleBusinessHoursChange(
                          index,
                          "close",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 text-sm text-gray-500">Libur</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* === Lokasi === */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Lokasi UMKM
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              name="lat"
              step="any"
              value={formData.lat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              name="lng"
              step="any"
              value={formData.lng}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🗺️</div>
            <p>Google Maps Integration (soon)</p>
          </div>
        </div>
      </div>

      {/* === Tombol Simpan === */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Simpan Pengaturan
        </button>
      </div>
    </form>
  );
}
