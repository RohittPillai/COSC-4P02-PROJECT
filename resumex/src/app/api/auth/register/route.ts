import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import bcrypt from "bcryptjs";

// Documentation: Handles user registration. Hashes password before storing user data in the database.
// New changes: This route uses bcrypt to ensure secure password storage.

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      // If a user with the same email exists, return error.
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      // Creates a new user, storing hashed password securely.
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Registered successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
