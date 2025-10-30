import { NextRequest, NextResponse } from "next/server";
import { getDatabase, searchUMKM, createUMKM } from "@/lib/database/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    // ✅ Gunakan Record agar bisa menambahkan properti
    const filters: Record<string, unknown> = {};
    if (category) filters.category = category;

    // ✅ Pastikan searchUMKM di-await
    const umkm = await searchUMKM(query, filters);

    // ✅ Pagination setelah data didapat
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUMKM = umkm.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        umkm: paginatedUMKM,
        pagination: {
          page,
          limit,
          total: umkm.length,
          totalPages: Math.ceil(umkm.length / limit),
        },
      },
    });
  } catch (error: unknown) {
    console.error("Get UMKM error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const umkm = await createUMKM(body);

    return NextResponse.json(
      {
        success: true,
        data: { umkm },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Create UMKM error:", error);

    // ✅ Aman: periksa tipe error sebelum akses message
    if (error instanceof Error && error.message.includes("Validation failed")) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
