import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/database/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const priceRange = searchParams.get("priceRange") || "";
    const availability = searchParams.get("availability") === "true";
    const hasDiscount = searchParams.get("hasDiscount") === "true";

    // Build filters object with proper types
    const filters: Record<string, unknown> = {};
    if (category) filters.category = category;
    if (priceRange) filters.priceRange = priceRange;
    if (searchParams.has("availability")) filters.availability = availability;
    if (searchParams.has("hasDiscount")) filters.hasDiscount = hasDiscount;

    const results = searchProducts(query, filters);

    return NextResponse.json({
      success: true,
      data: {
        products: results,
        total: results.length,
        query,
        filters,
      },
    });
  } catch (error) {
    console.error("Search products error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
