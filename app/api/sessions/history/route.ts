import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
        endTime: {
          not: null,
        },
      },
      orderBy: {
        startTime: 'desc',
      },
      take: 10, // Limit to last 10 sessions
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Session history error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
} 