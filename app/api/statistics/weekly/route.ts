import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface WeeklyStat {
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

    // Get last 4 weeks of statistics
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const weeklyStats = await prisma.session.groupBy({
      by: ['startTime'],
      where: {
        userId: session.user.id,
        startTime: {
          gte: fourWeeksAgo,
        },
        endTime: {
          not: null,
        },
      },
      _sum: {
        totalTime: true,
      },
    });

    const formattedStats = weeklyStats.map((stat: WeeklyStat) => ({
      week: `Week ${new Date(stat.startTime).getDate()}`,
      totalHours: Math.round((stat._sum.totalTime || 0) / 60 * 10) / 10,
    }));

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error("Weekly statistics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
} 