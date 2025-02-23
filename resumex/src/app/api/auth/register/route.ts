import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma'; // Make sure your Prisma client is correctly configured
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  // Parse the JSON body from the request
  const { name, email, password } = await request.json();

  // Validate that all required fields are provided
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: 'All fields are required.' },
      { status: 400 }
    );
  }

  // Check if a user with the provided email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists.' },
      { status: 400 }
    );
  }

  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user in the database
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Respond with a success message
    return NextResponse.json(
      { message: 'You have successfully signed up.', user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Registration failed.' },
      { status: 500 }
    );
  }
}
