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
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto p-8">
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Welcome back, {session?.user?.name}!
        </h1>

        {/* Group Section at Top - Only show if not logged in */}
        {!session?.user && (
          <div className="mb-8 bg-black/60 rounded-xl border border-purple-500/20 p-4 shadow-[0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-sm">
            {hasGroup ? <GroupBar /> : <GroupActions />}
          </div>
        )}

        {/* Two Column Layout for Tasks and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Timer and Tasks */}
          <div className="space-y-8">
            {/* Timer Section */}
            <div className="shadow-[0_0_25px_rgba(168,85,247,0.15)]">
              <PersistentStudyTimer />
            </div>

            {/* Tasks Section */}
            <div className="bg-black/60 rounded-xl border border-purple-500/20 p-6 shadow-[0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Your Tasks
              </h2>
              <TodoList />
            </div>
          </div>

          {/* Right Column - Study Progress */}
          <div className="space-y-8">
            <div className="bg-black/60 rounded-xl border border-purple-500/20 p-6 shadow-[0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Study Progress
              </h2>
              <StudyProgress />
            </div>
            <div className="bg-black/60 rounded-xl border border-purple-500/20 p-6 shadow-[0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Today's Team Progress
              </h2>
              <DailyTeamProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 