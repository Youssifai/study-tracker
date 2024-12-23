import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, subDays } from 'date-fns';

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

    // Get the current date
    const today = new Date();
    
    // Calculate the start of the week (Saturday) by getting last Saturday
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 6 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 6 });

    // Get sessions for the current week
    const weekSessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
        startTime: {
          gte: currentWeekStart,
          lte: currentWeekEnd,
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    // Get all days in the current week
    const weekDays = eachDayOfInterval({
      start: currentWeekStart,
      end: currentWeekEnd,
    });

    // Create a map of days with sessions
    const sessionsMap = new Map();
    weekDays.forEach(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      sessionsMap.set(dayStr, []);
    });

    // Group sessions by day
    weekSessions.forEach(session => {
      const dayStr = format(session.startTime, 'yyyy-MM-dd');
      const daySessions = sessionsMap.get(dayStr) || [];
      daySessions.push(session);
      sessionsMap.set(dayStr, daySessions);
    });

    // Calculate streak
    const thirtyDaysAgo = subDays(today, 30);
    const streakSessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
        startTime: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });

    // Calculate current streak
    let currentStreak = 0;
    let previousDate = new Date();
    const uniqueDates = new Set(
      streakSessions.map(session => 
        format(session.startTime, 'yyyy-MM-dd')
      )
    );

    // Count consecutive days backwards from today
    for (let i = 0; i < 30; i++) {
      const checkDate = format(subDays(today, i), 'yyyy-MM-dd');
      if (uniqueDates.has(checkDate)) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Format the response
    const sessions = Array.from(sessionsMap.entries()).map(([date, daySessions]) => ({
      date,
      totalMinutes: daySessions.reduce((acc, session) => {
        if (session.endTime) {
          const duration = Math.floor((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60));
          return acc + duration;
        }
        return acc;
      }, 0),
      hasSession: daySessions.length > 0,
    }));

    return NextResponse.json({
      sessions,
      totalDays: currentStreak,
    });
  } catch (error) {
    console.error("Weekly statistics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
} 