import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface DailyStat {
  startTime: Date;
  _sum: {
    totalTime: number | null;
  };
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

    // Get last 7 days of statistics
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await prisma.session.groupBy({
      by: ['startTime'],
      where: {
        userId: session.user.id,
        startTime: {
          gte: sevenDaysAgo,
        },
        endTime: {
          not: null,
        },
      },
      _sum: {
        totalTime: true,
      },
    });

    const formattedStats = dailyStats.map((stat: DailyStat) => ({
      date: new Date(stat.startTime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      totalMinutes: stat._sum.totalTime || 0,
    }));

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error("Daily statistics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
} 