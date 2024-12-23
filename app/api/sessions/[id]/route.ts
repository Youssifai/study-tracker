import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the study session
    const studySession = await prisma.session.findUnique({
      where: { id: params.id },
    });

    if (!studySession) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Verify the session belongs to the user
    if (studySession.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const endTime = new Date();
    const totalMinutes = Math.round(
      (endTime.getTime() - studySession.startTime.getTime()) / (1000 * 60)
    );

    // Update the session with end time and total time
    const updatedSession = await prisma.session.update({
      where: { id: params.id },
      data: {
        endTime,
        totalTime: totalMinutes,
      },
    });

    return NextResponse.json({
      totalTime: totalMinutes,
      unit: "minutes",
      session: updatedSession,
    });

  } catch (error) {
    console.error("Session update error:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
} 