import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

interface User {
  id: string;
  name: string;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the date from query params
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return new NextResponse('Date parameter is required', { status: 400 });
    }

    // Get the user's group
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        group: {
          include: {
            users: true
          }
        }
      }
    });

    if (!user?.group) {
      return new NextResponse('User is not in a group', { status: 400 });
    }

    // Get the start and end of the specified date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Get todos for all group members for the specified date
    const todos = await prisma.todo.findMany({
      where: {
        userId: {
          in: user.group.users.map((user: User) => user.id)
        },
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // Format the response
    const usersWithTodos = user.group.users.map((groupUser: User) => ({
      id: groupUser.id,
      name: groupUser.name,
      todos: todos.filter((todo: Todo) => todo.userId === groupUser.id)
    }));

    return NextResponse.json({
      users: usersWithTodos,
      date
    });
  } catch (error) {
    console.error('Error in daily todos endpoint:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 