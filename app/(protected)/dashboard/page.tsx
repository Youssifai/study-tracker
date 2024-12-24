'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TodoList from '@/app/components/TodoList';
import GroupBar from '@/app/components/GroupBar';
import GroupActions from '@/app/components/GroupActions';
import StudyProgress from '@/app/components/StudyProgress';
import DailyTeamProgress from '@/app/components/DailyTeamProgress';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PersistentStudyTimer from '@/app/components/PersistentStudyTimer';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [hasGroup, setHasGroup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkGroup = async () => {
      try {
        const response = await fetch('/api/groups');
        const data = await response.json();
        setHasGroup(!!data?.id);
      } catch (error) {
        console.error('Error checking group:', error);
      }
    };

    if (session?.user) {
      checkGroup();
    }
  }, [session]);

  useEffect(() => {
    // Wait for session and initial data to be loaded
    if (status !== 'loading') {
      // Add a small delay to ensure all components are ready
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Message */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name}!
        </h1>

        {/* Group Section at Top */}
        <div className="mb-8">
          {hasGroup ? (
            <GroupBar />
          ) : (
            <GroupActions />
          )}
        </div>

        {/* Two Column Layout for Tasks and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Timer and Tasks */}
          <div className="space-y-8">
            {/* Timer Section */}
            <PersistentStudyTimer />

            {/* Tasks Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Tasks</h2>
              <TodoList />
            </div>
          </div>

          {/* Right Column - Study Progress */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Study Progress</h2>
            <StudyProgress />
            <DailyTeamProgress />
          </div>
        </div>
      </div>
    </div>
  );
} 