import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface GroupMember {
  id: string;
  name: string;
}

export async function GET(
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

    // Verify user is a member of the group
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { group: true },
    });

    if (user?.group?.id !== params.id) {
      return NextResponse.json(
        { error: "Not a member of this group" },
        { status: 403 }
      );
    }

    // Get all group members
    const groupMembers = await prisma.user.findMany({
      where: { groupId: params.id },
      select: { id: true, name: true },
    });

    // Get today's start and end time
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Get current month's start time
    const monthStart = new Date();
    monthStart.setDate(1); // First day of current month
    monthStart.setHours(0, 0, 0, 0);

    // Get study time per member
    const memberStats = await Promise.all(
      groupMembers.map(async (member) => {
        // Get today's study time
        const todayStats = await prisma.session.aggregate({
          where: {
            userId: member.id,
            startTime: { gte: todayStart, lte: todayEnd },
            endTime: { not: null },
          },
          _sum: {
            totalTime: true,
          },
        });

        // Get monthly study time
        const monthlyStats = await prisma.session.aggregate({
          where: {
            userId: member.id,
            startTime: { gte: monthStart },
            endTime: { not: null },
          },
          _sum: {
            totalTime: true,
          },
        });

        return {
          userId: member.id,
          userName: member.name,
          todayTime: todayStats._sum.totalTime || 0,
          monthlyTime: monthlyStats._sum.totalTime || 0,
        };
      })
    );

    // Sort members by today's study time
    const todayLeaderboard = [...memberStats].sort((a, b) => b.todayTime - a.todayTime);

    // Sort members by monthly study time
    const monthlyLeaderboard = [...memberStats].sort((a, b) => b.monthlyTime - a.monthlyTime);

    // Calculate group totals for today
    const totalMinutes = memberStats.reduce((sum, member) => sum + member.todayTime, 0);
    const averageMinutesPerMember = Math.round(totalMinutes / memberStats.length);

    return NextResponse.json({
      todayStats: todayLeaderboard,
      monthlyStats: monthlyLeaderboard,
      groupTotals: {
        totalMinutes,
        averageMinutesPerMember,
        memberCount: memberStats.length,
      },
    });
  } catch (error: any) {
    console.error("Group stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch group statistics", message: error.message },
      { status: 500 }
    );
  }
} 