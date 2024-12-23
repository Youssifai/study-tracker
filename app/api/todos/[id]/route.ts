import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: { completed: data.completed },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return new NextResponse('Failed to update todo', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // First verify that the todo belongs to the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    });

    if (!todo) {
      return new NextResponse('Todo not found', { status: 404 });
    }

    if (todo.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Delete the todo
    await prisma.todo.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return new NextResponse('Failed to delete todo', { status: 500 });
  }
} 