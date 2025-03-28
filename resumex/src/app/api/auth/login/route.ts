import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";

// Documentation: Handles user login. Verifies user credentials and compares hashed passwords.
// New changes: Returns a user object upon success, or an error message for invalid credentials.

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If the password matches, respond with user info.
    return NextResponse.json({
      message: "Logged in successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
