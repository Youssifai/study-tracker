import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const groupId = params.id;

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { group: true }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Check if user is in this group
    if (user.groupId !== groupId) {
      return new NextResponse('User is not in this group', { status: 400 });
    }

    // Update user to remove group association
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        groupId: null
      }
    });

    return NextResponse.json({ message: 'Successfully left the group' });
  } catch (error) {
    console.error('Error leaving group:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
