import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Update course
export async function PUT(
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

    // Verify course ownership
    const course = await prisma.course.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 }
      );
    }

    const { name, examDate } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Course name is required" },
        { status: 400 }
      );
    }

    const updatedCourse = await prisma.course.update({
      where: { id: params.id },
      data: {
        name,
        examDate: examDate ? new Date(examDate) : null,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error: any) {
    console.error("Course update error:", error);
    return NextResponse.json(
      { error: "Failed to update course", message: error.message },
      { status: 500 }
    );
  }
}

// Delete course
export async function DELETE(
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

    // Verify course ownership
    const course = await prisma.course.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.course.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Course deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete course", message: error.message },
      { status: 500 }
    );
  }
} 