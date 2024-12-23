import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Test database connection first
    await prisma.$connect();
    console.log("Database connection successful");

    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user - all optional fields set to null initially
    const user = await prisma.user.create({
      data: {
        name,                  // Required String
        email,                 // Required String
        passwordHash: hashedPassword,  // Required String
        currentSemester: null, // Optional Int
        dailyStudyGoal: null,  // Optional Int
        freeDays: null,        // Optional String
        groupId: null,         // Optional String
      },
      // Select all fields that match our schema
      select: {
        id: true,             // String
        name: true,           // String
        email: true,          // String
        currentSemester: true, // Int?
        dailyStudyGoal: true,  // Int?
        freeDays: true,        // String?
        groupId: true,         // String?
        createdAt: true,       // DateTime
        updatedAt: true,       // DateTime
      },
    });

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Enhanced error logging
    console.error("Registration error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });

    // Return more specific error message
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message  // Add this line for debugging
      },
      { status: 500 }
    );
  }
}