'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Home, BookOpen, Users, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../providers';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col items-center py-8 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex-1 flex flex-col items-center space-y-4">
        <Link
          href="/dashboard"
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            pathname === '/dashboard' ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          <Home className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Link>
        <Link
          href="/courses"
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            pathname === '/courses' ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          <BookOpen className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Link>
        {groupId ? (
          <Link
            href={`/group/${groupId}`}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              pathname.startsWith('/group/') ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
            title="View your group"
          >
            <Users className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </Link>
        ) : (
          <div
            title="You're not currently in a group. Please join or create one to access this feature."
            className="p-2 rounded-lg cursor-not-allowed opacity-50"
          >
            <Users className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Sign out"
        >
          <LogOut className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
} 