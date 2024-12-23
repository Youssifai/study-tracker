import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { inviteCode } = await request.json();

    if (!inviteCode) {
      return NextResponse.json(
        { error: "Invite code is required" },
        { status: 400 }
      );
    }

    // Find the group with the invite code
    const group = await prisma.group.findUnique({
      where: { inviteCode },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Invalid invite code" },
        { status: 404 }
      );
    }

    // Check if user is already in a group
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.groupId) {
      return NextResponse.json(
        { error: "You are already in a group" },
        { status: 400 }
      );
    }

    // Update user's groupId and return updated group info
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { groupId: group.id },
      include: {
        group: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedUser.group);
  } catch (error: any) {
    console.error("Group join error:", error);
    return NextResponse.json(
      { error: "Failed to join group", message: error.message },
      { status: 500 }
    );
  }
} 