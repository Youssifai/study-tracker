import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
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

    // Parse request body
    const body = await request.json();
    const { isPaused, totalPausedTime, pausedAt, endTime, isCompleted } = body;

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

    // Prepare update data
    const updateData: any = {};

    // Handle pause state
    if (typeof isPaused === 'boolean') {
      updateData.isPaused = isPaused;
      updateData.pausedAt = isPaused ? pausedAt : null;
    }

    // Handle total paused time
    if (typeof totalPausedTime === 'number') {
      updateData.totalPausedTime = totalPausedTime;
    }

    // Handle session completion
    if (isCompleted) {
      const sessionEndTime = endTime ? new Date(endTime) : new Date();
      updateData.endTime = sessionEndTime;
      
      // Calculate total active time (excluding pauses)
      const totalDuration = Math.floor(
        (sessionEndTime.getTime() - studySession.startTime.getTime() - (totalPausedTime || 0)) / (1000 * 60)
      );
      updateData.totalTime = Math.max(0, totalDuration);
    }

    // Update the session
    const updatedSession = await prisma.session.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
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