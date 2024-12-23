import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    });

    if (!todo) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    if (todo.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { completed, title, date, project, priority } = await request.json();

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        completed: completed !== undefined ? completed : todo.completed,
        title: title || todo.title,
        date: date ? new Date(date) : todo.date,
        project: project !== undefined ? project : todo.project,
        priority: priority || todo.priority,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Todo update error:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
} 