"use client";
import { useState } from "react";

interface DashboardProps {
  showDetailed?: boolean;
}

export default function Dashboard({ showDetailed = false }: DashboardProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  const stats = [
    {
      name: "Total Pengunjung",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Produk Dilihat",
      value: "567",
      change: "+8%",
      changeType: "increase",
    },
    {
      name: "Kontak WhatsApp",
      value: "89",
      change: "+23%",
      changeType: "increase",
    },
    {
      name: "Rating Rata-rata",
      value: "4.8",
      change: "+0.2",
      changeType: "increase",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "view",
      message: 'Produk "Kopi Arabika" dilihat',
      time: "2 menit lalu",
    },
    {
      id: 2,
      type: "contact",
      message: "WhatsApp dari 08123456789",
      time: "1 jam lalu",
    },
    {
      id: 3,
      type: "favorite",
      message: "Produk ditambahkan ke favorit",
      time: "3 jam lalu",
    },
    { id: 4, type: "view", message: "Profil UMKM dilihat", time: "5 jam lalu" },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Ringkasan Performa
        </h2>
        <div className="flex space-x-2">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range === "week"
                ? "Minggu"
                : range === "month"
                ? "Bulan"
                : "Tahun"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow-md border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index === 0
                    ? "bg-blue-100"
                    : index === 1
                    ? "bg-green-100"
                    : index === 2
                    ? "bg-purple-100"
                    : "bg-yellow-100"
                }`}
              >
                <span className="text-lg">
                  {index === 0
                    ? "👥"
                    : index === 1
                    ? "👀"
                    : index === 2
                    ? "💬"
                    : "⭐"}
                </span>
              </div>
            </div>
            <div
              className={`flex items-center mt-2 text-sm ${
                stat.changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <span>{stat.changeType === "increase" ? "↗" : "↘"}</span>
              <span className="ml-1">{stat.change}</span>
              <span className="text-gray-500 ml-1">
                dari periode sebelumnya
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Detailed Analytics */}
      {showDetailed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">
              Grafik Pengunjung
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>Chart Analytics</p>
                <p className="text-sm">Integrasi dengan chart library</p>
              </div>
            </div>
          </div>

          {/* Popular Products */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Produk Populer</h3>
            <div className="space-y-3">
              {[
                { name: "Kopi Arabika Gayo", views: 234, contacts: 45 },
                { name: "Kopi Latte Special", views: 189, contacts: 32 },
                { name: "Espresso Double Shot", views: 156, contacts: 28 },
                { name: "Cappuccino Art", views: 143, contacts: 25 },
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.views} dilihat • {product.contacts} kontak
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {Math.round((product.contacts / product.views) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">konversi</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === "view"
                    ? "bg-blue-100 text-blue-600"
                    : activity.type === "contact"
                    ? "bg-green-100 text-green-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {activity.type === "view"
                  ? "👀"
                  : activity.type === "contact"
                  ? "💬"
                  : "❤️"}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <div className="text-2xl mb-2">📦</div>
            <div className="font-medium text-gray-900">Tambah Produk</div>
            <div className="text-sm text-gray-600">Produk baru</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium text-gray-900">Atur Diskon</div>
            <div className="text-sm text-gray-600">Promo spesial</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-gray-900">Lihat Laporan</div>
            <div className="text-sm text-gray-600">Analytics detail</div>
          </button>
        </div>
      </div>
    </div>
  );
}
