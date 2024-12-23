import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    // Get all sessions for today
    const todaySessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
        startTime: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    // Calculate total minutes studied today
    const totalMinutes = todaySessions.reduce((acc, session) => {
      if (session.endTime) {
        const duration = Math.floor((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60));
        return acc + duration;
      }
      return acc;
    }, 0);

    return NextResponse.json({
      totalMinutes,
      sessions: todaySessions,
    });
  } catch (error) {
    console.error("Daily statistics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
} 