// app/(seller)/analytics/page.tsx
"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  period: string;
  overview: {
    totalViews: number;
    totalLikes: number;
    totalProducts: number;
    conversionRate: number;
  };
  traffic: {
    labels: string[];
    data: number[];
  };
  popularProducts: {
    id: number;
    name: string;
    views: number;
    likes: number;
    conversion: number;
  }[];
}

export default function SellerAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData: AnalyticsData = {
          period,
          overview: {
            totalViews: 1250,
            totalLikes: 156,
            totalProducts: 24,
            conversionRate: 3.6,
          },
          traffic: {
            labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
            data: [120, 190, 150, 200, 180, 240, 210],
          },
          popularProducts: [
            {
              id: 1,
              name: "Keripik Singkong Pedas",
              views: 450,
              likes: 67,
              conversion: 4.2,
            },
            {
              id: 2,
              name: "Dodol Garut Premium",
              views: 380,
              likes: 54,
              conversion: 3.8,
            },
            {
              id: 3,
              name: "Batik Tulis Solo",
              views: 290,
              likes: 45,
              conversion: 2.9,
            },
            {
              id: 4,
              name: "Kerupuk Ikan Original",
              views: 210,
              likes: 32,
              conversion: 2.1,
            },
          ],
        };

        setData(mockData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  if (loading || !data) {
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
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Statistik performa UMKM Anda</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
          <option value="year">Tahun Ini</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.overview.totalViews}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">❤️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.overview.totalLikes}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Produk</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.overview.totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {data.overview.conversionRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Pengunjung
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Chart Traffic Pengunjung</p>
              <p className="text-sm text-gray-400">
                (Integrasi chart library akan datang)
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Rata-rata pengunjung per hari:{" "}
              {Math.round(
                data.traffic.data.reduce((a, b) => a + b, 0) /
                  data.traffic.data.length
              )}
            </p>
            <p>
              Total pengunjung: {data.traffic.data.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Engagement Rate
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Chart Engagement Rate</p>
              <p className="text-sm text-gray-400">
                (Integrasi chart library akan datang)
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Engagement rate:{" "}
              {(
                (data.overview.totalLikes / data.overview.totalViews) *
                100
              ).toFixed(1)}
              %
            </p>
            <p>Total interactions: {data.overview.totalLikes}</p>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Produk Paling Populer
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.popularProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.views} views • {product.likes} likes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {product.conversion}%
                  </p>
                  <p className="text-sm text-green-600">Conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">
            Performance Metrics
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Page Views</span>
              <span className="text-sm font-medium">1,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Unique Visitors</span>
              <span className="text-sm font-medium">890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Bounce Rate</span>
              <span className="text-sm font-medium">42%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Avg. Session Duration
              </span>
              <span className="text-sm font-medium">2m 15s</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">
            Customer Insights
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New Customers</span>
              <span className="text-sm font-medium">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Returning Customers</span>
              <span className="text-sm font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Customer Satisfaction
              </span>
              <span className="text-sm font-medium">4.5/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Recommendation Rate</span>
              <span className="text-sm font-medium">78%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Business Growth</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Growth</span>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Product Views Growth
              </span>
              <span className="text-sm font-medium text-green-600">+18%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Growth</span>
              <span className="text-sm font-medium text-green-600">+8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Revenue Growth</span>
              <span className="text-sm font-medium text-green-600">+15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
