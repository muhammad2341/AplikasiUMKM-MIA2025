import { NextRequest, NextResponse } from "next/server";
import { createUser, hashPassword } from "@/lib/database/db";
import { generateToken } from "@/lib/utils/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, role } = await request.json();

    // Validate input
    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Hash password (dummy)
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data (without password)
    const userWithoutPassword = { ...user } as Partial<typeof user>;
    delete userWithoutPassword.password;

    const response = NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error("Register error:", error);
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
