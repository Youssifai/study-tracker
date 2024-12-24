import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from 'date-fns';

export const dynamic = 'force-dynamic';

interface Session {
  id: string;
  startTime: Date;
  endTime: Date | null;
  totalTime: number | null;
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
        endTime: { not: null },
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        totalTime: true,
      },
    });

    // Calculate total minutes studied today using the totalTime field
    const totalMinutes = todaySessions.reduce((acc: number, session: any) => {
      return acc + (session.totalTime || 0);
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