import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/auth";
import { toggleFavorite, isUMKMFavorite } from "@/lib/database/db";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

    const isFavorite = isUMKMFavorite(decoded.userId, params.id);

    return NextResponse.json({
      success: true,
      data: { isFavorite },
    });
  } catch (error) {
    console.error("Check favorite error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const isNowFavorite = toggleFavorite(decoded.userId, params.id);

    return NextResponse.json({
      success: true,
      data: {
        isFavorite: isNowFavorite,
        message: "Removed from favorites",
      },
    });
  } catch (error) {
    console.error("Remove favorite error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
