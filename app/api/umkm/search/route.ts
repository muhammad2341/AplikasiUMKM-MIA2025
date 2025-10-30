import { NextRequest, NextResponse } from "next/server";
import { searchUMKM } from "@/lib/database/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const rating = searchParams.get("rating")
      ? parseInt(searchParams.get("rating")!)
      : 0;
    const isOpen = searchParams.get("isOpen") === "true";

    // Build filters object with proper types
    const filters: Record<string, unknown> = {};
    if (category) filters.category = category;
    if (searchParams.has("rating") && rating) filters.rating = rating;
    if (searchParams.has("isOpen")) filters.isOpen = isOpen;

    const results = searchUMKM(query, filters);

    return NextResponse.json({
      success: true,
      data: {
        umkm: results,
        total: results.length,
        query,
        filters,
      },
    });
  } catch (error) {
    console.error("Search UMKM error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
