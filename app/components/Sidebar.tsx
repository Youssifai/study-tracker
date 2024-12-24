'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Home, BookOpen, Users, Palette, LogOut } from 'lucide-react';
import { useTheme } from '../providers/theme-provider';
import { useEffect, useState } from 'react';
import ThemeModal from './ThemeModal';

export default function Sidebar() {
  const pathname = usePathname();
  const { setIsThemeModalOpen } = useTheme();
  const { data: session } = useSession();
  const [groupId, setGroupId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const response = await fetch('/api/groups');
        const data = await response.json();
        if (data?.id) {
          setGroupId(data.id);
        }
      } catch (error) {
        console.error('Failed to fetch user group:', error);
      }
    };

    if (session?.user) {
      fetchUserGroup();
    }
  }, [session]);

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-16 flex flex-col items-center py-8 nav">
        <div className="flex-1 flex flex-col items-center space-y-4">
          <Link
            href="/dashboard"
            className={`p-2 rounded-lg hover:bg-accent/20 transition-colors ${
              pathname === '/dashboard' ? 'bg-accent/20' : ''
            }`}
          >
            <Home className="w-6 h-6 text-accent" />
          </Link>
          <Link
            href="/courses"
            className={`p-2 rounded-lg hover:bg-accent/20 transition-colors ${
              pathname === '/courses' ? 'bg-accent/20' : ''
            }`}
          >
            <BookOpen className="w-6 h-6 text-accent" />
          </Link>
          {groupId ? (
            <Link
              href={`/group/${groupId}`}
              className={`p-2 rounded-lg hover:bg-accent/20 transition-colors ${
                pathname.startsWith('/group/') ? 'bg-accent/20' : ''
              }`}
              title="View your group"
            >
              <Users className="w-6 h-6 text-accent" />
            </Link>
          ) : (
            <div
              title="You're not currently in a group. Please join or create one to access this feature."
              className="p-2 rounded-lg cursor-not-allowed opacity-50"
            >
              <Users className="w-6 h-6 text-accent" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
            aria-label="Change theme"
          >
            <Palette className="w-6 h-6 text-accent" />
          </button>
          <button
            onClick={() => signOut()}
            className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-6 h-6 text-accent" />
          </button>
        </div>
      </div>
      <ThemeModal />
    </>
  );
} 