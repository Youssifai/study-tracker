import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

interface Member {
  id: string;
  name: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id: params.id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!group) {
      return new NextResponse('Group not found', { status: 404 });
    }

    // Check if the user is a member of the group
    const isMember = await prisma.user.findFirst({
      where: {
        email: session.user.email,
        OR: [
          { groupId: params.id }, // Direct group membership
          { ownedGroups: { some: { id: params.id } } } // Owner of the group
        ]
      },
    });

    if (!isMember) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Ensure we return the exact structure expected by the frontend
    return NextResponse.json({
      id: group.id,
      name: group.name,
      inviteCode: group.inviteCode,
      ownerId: group.ownerId,
      members: group.users.map((member: Member) => ({
        id: member.id,
        name: member.name
      })),
      owner: {
        id: group.owner.id,
        name: group.owner.name
      }
    });
  } catch (error) {
    console.error('Error in GET /api/groups/[id]:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id: params.id },
    });

    if (!group) {
      return new NextResponse('Group not found', { status: 404 });
    }

    if (group.ownerId !== session.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const updatedGroup = await prisma.group.update({
      where: { id: params.id },
      data: { name },
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: updatedGroup.id,
      name: updatedGroup.name,
      inviteCode: updatedGroup.inviteCode,
      ownerId: updatedGroup.ownerId,
      members: updatedGroup.users.map((member: Member) => ({
        id: member.id,
        name: member.name
      })),
      owner: {
        id: updatedGroup.owner.id,
        name: updatedGroup.owner.name
      }
    });
  } catch (error) {
    console.error('Error in PATCH /api/groups/[id]:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id: params.id },
    });

    if (!group) {
      return new NextResponse('Group not found', { status: 404 });
    }

    if (group.ownerId !== session.user.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prisma.group.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/groups/[id]:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 