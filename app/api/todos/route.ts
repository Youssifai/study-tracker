import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    console.log('Received todo data:', data);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Create todo with current date
    const todo = await prisma.todo.create({
      data: {
        userId: user.id,
        title: data.title,
        date: new Date(), // Set to current date
        completed: false,
        priority: data.priority,
        courseId: data.courseId || null,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Todo creation error:', error);
    return new NextResponse('Failed to create todo', { status: 500 });
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