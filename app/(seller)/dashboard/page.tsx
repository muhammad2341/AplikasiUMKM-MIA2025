// app/(seller)/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  totalViews: number;
  totalRevenue: number;
  activeCustomers: number;
}

export default function SellerDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockStats: DashboardStats = {
      totalProducts: 24,
      totalViews: 1250,
      totalRevenue: 12500000,
      activeCustomers: 89,
    };

    Promise.resolve().then(() => {
      setStats(mockStats);
      setLoading(false);
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Seller</h1>
          <p className="text-gray-600">Ringkasan performa UMKM Anda</p>
        </div>
        <Link
          href="/seller/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Produk</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalViews}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Pendapatan
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pelanggan Aktif
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.activeCustomers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/seller/products"
          className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">📦</span>
            <div>
              <h3 className="font-semibold text-gray-900">Kelola Produk</h3>
              <p className="text-sm text-gray-600">
                Tambah, edit, atau hapus produk
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/seller/profile"
          className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">🏪</span>
            <div>
              <h3 className="font-semibold text-gray-900">Profil UMKM</h3>
              <p className="text-sm text-gray-600">
                Kelola informasi toko Anda
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/seller/analytics"
          className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">📈</span>
            <div>
              <h3 className="font-semibold text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">Lihat statistik toko</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Aktivitas Terbaru
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">
                  Produk &quot;Keripik Singkong&quot; dilihat 25 kali
                </span>
              </div>
              <span className="text-sm text-gray-500">2 jam lalu</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">
                  Pelanggan baru menyukai toko Anda
                </span>
              </div>
              <span className="text-sm text-gray-500">5 jam lalu</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">
                  Ulasan baru diterima untuk produk Dodol Garut
                </span>
              </div>
              <span className="text-sm text-gray-500">1 hari lalu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
