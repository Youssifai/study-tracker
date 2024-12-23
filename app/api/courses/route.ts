import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Received course data:', body);

    if (!body.name) {
      return NextResponse.json(
        { error: "Validation failed", message: "Course name is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        name: body.name,
        examDate: body.examDate ? new Date(body.examDate) : null,
        userId: session.user.id,
      },
    });

    console.log('Created course:', course);
    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    console.error("Course creation error:", {
      error,
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        error: "Failed to create course", 
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const courses = await prisma.course.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(courses);
  } catch (error: any) {
    console.error("Course fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
} 