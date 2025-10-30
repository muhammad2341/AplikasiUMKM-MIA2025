import { NextResponse } from "next/server";
import { CATEGORIES } from "@/lib/constants";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        categories: CATEGORIES,
      },
    });
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
