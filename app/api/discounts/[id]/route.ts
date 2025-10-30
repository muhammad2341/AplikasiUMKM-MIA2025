// app/api/discounts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET: Get discount by ID
// PUT: Update discount
// DELETE: Delete discount
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const discountId = parseInt(params.id);
    if (isNaN(discountId)) {
      return NextResponse.json(
        { error: "Invalid discount ID" },
        { status: 400 }
      );
    }

    // Mock data - replace with actual database query
    const discount = {
      id: discountId,
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
      description: "Diskon spesial akhir tahun untuk semua produk",
      createdAt: "2024-11-15T10:00:00Z",
    };

    if (!discount) {
      return NextResponse.json(
        { error: "Discount not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ discount });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const discountId = parseInt(params.id);
    if (isNaN(discountId)) {
      return NextResponse.json(
        { error: "Invalid discount ID" },
        { status: 400 }
      );
    }
    const body = await request.json();

    // Update discount logic here
    const updatedDiscount = {
      id: discountId,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedDiscount);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const discountId = parseInt(params.id);
    if (isNaN(discountId)) {
      return NextResponse.json(
        { error: "Invalid discount ID" },
        { status: 400 }
      );
    }

    // Delete discount logic here
    // await deleteDiscount(discountId);

    return NextResponse.json({ message: "Discount deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
