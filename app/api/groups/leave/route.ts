import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { group: true },
    });

    if (!user?.groupId) {
      return NextResponse.json(
        { error: "You are not in a group" },
        { status: 400 }
      );
    }

    // Check if user is the owner
    if (user.group?.ownerId === user.id) {
      return NextResponse.json(
        { error: "Group owner cannot leave. Transfer ownership first." },
        { status: 400 }
      );
    }

    // Remove user from group
    await prisma.user.update({
      where: { id: session.user.id },
      data: { groupId: null },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Group leave error:", error);
    return NextResponse.json(
      { error: "Failed to leave group", message: error.message },
      { status: 500 }
    );
  }
} 