import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/database/db";

export async function GET() {
  try {
    const db = getDatabase();

    // Get featured products (products with discount or high rating)
    const featuredProducts = db.products
      .filter((product) => product.discount?.isActive || product.rating >= 4.5)
      .slice(0, 6); // Limit to 6 featured products

    return NextResponse.json({
      success: true,
      data: {
        products: featuredProducts,
      },
    });
  } catch (error) {
    console.error("Get featured products error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
