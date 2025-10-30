import { NextRequest, NextResponse } from "next/server";
import { getUMKMById, updateUMKM } from "@/lib/database/db";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const umkm = getUMKMById(params.id);

    if (!umkm) {
      return NextResponse.json(
        { success: false, error: "UMKM not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { umkm },
    });
  } catch (error) {
    console.error("Get UMKM detail error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();

    const umkm = await updateUMKM(params.id, body);

    return NextResponse.json({
      success: true,
      data: { umkm },
    });
  } catch (error: unknown) {
    console.error("Update UMKM error:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
