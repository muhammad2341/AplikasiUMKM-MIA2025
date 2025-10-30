// app/api/discounts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// GET: Get all discounts for current seller
// POST: Create new discount
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get("sellerId");
    const status = searchParams.get("status"); // 'active', 'expired', 'upcoming'

    // Mock data - replace with actual database query
    const discounts = [
      {
        id: 1,
        name: "Diskon Akhir Tahun",
        code: "AKHIRTAHUN25",
        type: "percentage" as const,
        value: 25,
        minPurchase: 100000,
        maxDiscount: 50000,
        startDate: "2024-12-01T00:00:00Z",
        endDate: "2024-12-31T23:59:59Z",
        usageLimit: 100,
        usedCount: 45,
        isActive: true,
        products: [1, 2, 3],
      },
      {
        id: 2,
        name: "Flash Sale",
        code: "FLASH50",
        type: "fixed" as const,
        value: 50000,
        minPurchase: 150000,
        maxDiscount: 50000,
        startDate: "2024-12-15T00:00:00Z",
        endDate: "2024-12-17T23:59:59Z",
        usageLimit: 50,
        usedCount: 12,
        isActive: true,
        products: [], // All products
      },
    ];

    return NextResponse.json({ discounts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validation
    const requiredFields = [
      "name",
      "code",
      "type",
      "value",
      "startDate",
      "endDate",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create discount logic here
    const newDiscount = {
      id: Date.now(), // Mock ID
      ...body,
      usedCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newDiscount, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
