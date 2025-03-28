import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";

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

    // In a real app, you'd set a session/cookie or JWT here
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
