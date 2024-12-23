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

    // Get the last 30 days of study sessions for all group members
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get all group members
    const groupMembers = await prisma.user.findMany({
      where: { groupId: params.id },
      select: { id: true, name: true },
    });

    // Get study time per member
    const memberStats = await Promise.all(
      groupMembers.map(async (member: GroupMember) => {
        const sessions = await prisma.session.aggregate({
          where: {
            userId: member.id,
            startTime: { gte: thirtyDaysAgo },
            endTime: { not: null },
          },
          _sum: {
            totalTime: true,
          },
        });

        return {
          userId: member.id,
          userName: member.name,
          totalMinutes: sessions._sum.totalTime || 0,
        };
      })
    );

    // Sort by total study time (descending)
    const leaderboard = memberStats.sort((a, b) => b.totalMinutes - a.totalMinutes);

    // Get daily group totals
    const dailyStats = await prisma.session.groupBy({
      by: ['startTime'],
      where: {
        user: {
          groupId: params.id,
        },
        startTime: { gte: thirtyDaysAgo },
        endTime: { not: null },
      },
      _sum: {
        totalTime: true,
      },
    });

    // Calculate group totals
    const totalMinutes = memberStats.reduce((sum, member) => sum + member.totalMinutes, 0);
    const averageMinutesPerMember = Math.round(totalMinutes / memberStats.length);

    return NextResponse.json({
      leaderboard,
      dailyStats,
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