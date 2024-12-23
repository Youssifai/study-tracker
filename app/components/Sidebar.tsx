'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BookOpen, Users, LogOut, Sun, Moon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
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
    <div className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-8 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex-1 flex flex-col items-center space-y-4">
        <Link
          href="/dashboard"
          className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            pathname === '/dashboard' ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
          title="Dashboard"
        >
          <Home className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Link>

        <Link
          href="/courses"
          className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            pathname === '/courses' ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
          title="Courses"
        >
          <BookOpen className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Link>

        <Link
          href={groupId ? `/group/${groupId}` : '/group'}
          className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            pathname.startsWith('/group') ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
          title="Group"
        >
          <Users className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          ) : (
            <Sun className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          )}
        </button>

        <button
          onClick={() => signOut()}
          className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
} 