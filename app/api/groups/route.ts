import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Use a singleton pattern for Prisma client
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Generate a random invite code
function generateInviteCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Create a new group
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session details:", {
      session,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
      userName: session?.user?.name
    });

    if (!session?.user?.id) {
      console.log("No user ID in session");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name } = await request.json();
    console.log("Creating group with name:", name);

    if (!name) {
      return NextResponse.json(
        { error: "Group name is required" },
        { status: 400 }
      );
    }

    // Check if user is already in a group
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        id: true,
        groupId: true
      }
    });

    console.log("Existing user check:", existingUser);

    if (existingUser?.groupId) {
      return NextResponse.json(
        { error: "You are already in a group" },
        { status: 400 }
      );
    }

    // Generate a unique invite code
    const inviteCode = generateInviteCode();
    console.log("Generated invite code:", inviteCode);

    try {
      console.log("Creating group with Prisma...");
      // Create the group directly without transaction since we don't need it
      const group = await prisma.group.create({
        data: {
          name,
          inviteCode,
          ownerId: session.user.id,
          users: {
            connect: {
              id: session.user.id
            }
          }
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          users: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      console.log("Group created successfully:", group);
      return NextResponse.json(group, { status: 201 });
    } catch (error) {
      console.error("Error creating group with Prisma:", error);
      throw error;
    }
  } catch (error: any) {
    console.error("Group creation error details:", {
      error,
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    return NextResponse.json(
      { error: "Failed to create group", message: error.message },
      { status: 500 }
    );
  }
}

// Get user's group
export async function GET() {
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

    if (!user?.group) {
      return NextResponse.json(null);
    }

    return NextResponse.json(user.group);
  } catch (error: any) {
    console.error("Group fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch group" },
      { status: 500 }
    );
  }
} 