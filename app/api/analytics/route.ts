// app/api/analytics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    // Cek authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'seller', 'admin', 'overview'
    const period = searchParams.get("period") || "week"; // 'day', 'week', 'month', 'year'

    // Logic analytics berdasarkan type
    switch (type) {
      case "seller":
        return getSellerAnalytics(session, period);
      case "admin":
        return getAdminAnalytics(session, period);
      case "overview":
      default:
        return getOverviewAnalytics(session, period);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getSellerAnalytics(session: unknown, period: string) {
  // Analytics khusus seller/UMKM
  const analyticsData = {
    period,
    overview: {
      totalViews: 1250,
      totalOrders: 45,
      totalRevenue: 12500000,
      conversionRate: 3.6,
    },
    traffic: {
      labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      data: [120, 190, 150, 200, 180, 240, 210],
    },
    sales: {
      labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
      data: [3000000, 4200000, 2800000, 2500000],
    },
    popularProducts: [
      { id: 1, name: "Product A", views: 450, orders: 15 },
      { id: 2, name: "Product B", views: 380, orders: 12 },
      { id: 3, name: "Product C", views: 290, orders: 8 },
    ],
  };

  return NextResponse.json(analyticsData);
}

async function getAdminAnalytics(session: unknown, period: string) {
  // Analytics untuk admin (jika diperlukan)
  const analyticsData = {
    period,
    totalUMKM: 150,
    newUMKMThisMonth: 12,
    totalProducts: 1250,
    activeUsers: 890,
    growth: {
      umkm: 8.5,
      users: 12.3,
      transactions: 15.7,
    },
  };

  return NextResponse.json(analyticsData);
}

async function getOverviewAnalytics(session: unknown, period: string) {
  // Analytics overview umum
  const analyticsData = {
    period,
    overview: {
      totalUMKM: 150,
      totalProducts: 1250,
      activeUsers: 890,
      totalTransactions: 345,
    },
  };

  return NextResponse.json(analyticsData);
}
