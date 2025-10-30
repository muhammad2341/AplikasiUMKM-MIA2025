import { NextRequest, NextResponse } from "next/server";
import { searchProducts, createProduct } from "@/lib/database/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const umkmId = searchParams.get("umkmId") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // Build filters object with proper types
    const filters: Record<string, unknown> = {};
    if (category) filters.category = category;
    if (umkmId) filters.umkmId = umkmId;

    const products = searchProducts(query, filters);

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: products.length,
          totalPages: Math.ceil(products.length / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await createProduct(body);

    return NextResponse.json(
      {
        success: true,
        data: { product },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Create product error:", error);

    if (error instanceof Error && error.message.includes("Validation failed")) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
