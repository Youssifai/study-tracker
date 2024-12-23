import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create Todo
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Received todo data:', body);

    // If courseId is provided, verify course ownership
    if (body.courseId) {
      const course = await prisma.course.findUnique({
        where: {
          id: body.courseId,
          userId: session.user.id, // Ensure the course belongs to the user
        },
      });

      if (!course) {
        return NextResponse.json(
          { error: "Course not found or unauthorized" },
          { status: 403 }
        );
      }
    }

    const todo = await prisma.todo.create({
      data: {
        userId: session.user.id,
        title: body.title,
        date: new Date(body.date),
        project: body.project || null,
        priority: body.priority || 'MEDIUM',
        courseId: body.courseId || null, // Add courseId if provided
      },
    });

    console.log('Created todo:', todo);
    return NextResponse.json(todo, { status: 201 });
  } catch (error: any) {
    console.error("Todo creation error:", error);
    return NextResponse.json(
      { error: "Failed to create todo", message: error.message },
      { status: 500 }
    );
  }
}

// Get Todos
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    const date = dateParam ? new Date(dateParam) : new Date();
    
    // Set time to start of day
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    // Set time to end of day
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'asc' },
      ],
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Todo fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
} 