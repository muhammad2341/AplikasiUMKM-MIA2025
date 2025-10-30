import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/auth";
import { getUserFavorites, toggleFavorite } from "@/lib/database/db";

export async function GET(request: NextRequest) {
  try {
    // Get user from token
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const favorites = getUserFavorites(decoded.userId);

    return NextResponse.json({
      success: true,
      data: { favorites },
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user from token
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const { umkmId } = await request.json();

    if (!umkmId) {
      return NextResponse.json(
        { success: false, error: "UMKM ID is required" },
        { status: 400 }
      );
    }

    const isNowFavorite = toggleFavorite(decoded.userId, umkmId);

    return NextResponse.json({
      success: true,
      data: {
        isFavorite: isNowFavorite,
        message: isNowFavorite
          ? "Added to favorites"
          : "Removed from favorites",
      },
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
