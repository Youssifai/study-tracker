'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from '@/app/providers/theme-provider';
import TodoList from '@/app/components/TodoList';
import GroupBar from '@/app/components/GroupBar';
import GroupActions from '@/app/components/GroupActions';
import StudyProgress from '@/app/components/StudyProgress';
import DailyTeamProgress from '@/app/components/DailyTeamProgress';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PersistentStudyTimer from '@/app/components/PersistentStudyTimer';
import PageTransition from '@/app/components/PageTransition';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
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
        setHasGroup(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      checkGroup();
    }
  }, [session]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  const glowEffect = theme === 'blue-dark' 
    ? "bg-[rgba(41,58,247,0.2)]" 
    : "bg-purple-600/20";

  const headerTextClass = theme === 'blue-dark'
    ? "text-[rgb(107,140,251)] font-bold"
    : "bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-bold";

  const cardBorderClass = theme === 'blue-dark'
    ? "border-[rgb(111,142,255)]/20"
    : "border-purple-500/20";

  const shadowClass = theme === 'blue-dark'
    ? "shadow-[0_0_15px_rgba(41,58,247,0.2)]"
    : "shadow-[0_0_15px_rgba(168,85,247,0.15)]";

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-black">
        {/* Background Glow Effect */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${glowEffect} blur-[120px] rounded-full pointer-events-none`} />

        <div className="relative max-w-7xl mx-auto px-8">
          {/* Welcome Message */}
          <div className="pt-9 pb-7">
            <h1 className={`text-2xl font-semibold ${headerTextClass}`}>Home OS</h1>
          </div>

          {/* Group Section at Top - Show if user has no group */}
          {!hasGroup && session?.user && (
            <div className={`mb-8 bg-black/40 rounded-xl border ${cardBorderClass} p-6 ${shadowClass} backdrop-blur-sm`}>
              <GroupActions />
            </div>
          )}

          {/* Two Column Layout for Tasks and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Timer and Tasks */}
            <div className="space-y-8">
              {/* Timer Section */}
              <div className={shadowClass}>
                <PersistentStudyTimer />
              </div>

              {/* Tasks Section */}
              <div className={`bg-black rounded-xl border ${cardBorderClass} p-6 ${shadowClass} backdrop-blur-sm`}>
                <h2 className={`text-xl font-semibold mb-6 ${headerTextClass}`}>
                  Your Tasks
                </h2>
                <TodoList />
              </div>
            </div>

            {/* Right Column - Study Progress */}
            <div className="space-y-8">
              <div className={`bg-black rounded-xl border ${cardBorderClass} p-6 ${shadowClass} backdrop-blur-sm`}>
                <h2 className={`text-xl font-semibold mb-6 ${headerTextClass}`}>
                  Study Progress
                </h2>
                <StudyProgress />
              </div>
              <div className={`bg-black rounded-xl border ${cardBorderClass} p-6 ${shadowClass} backdrop-blur-sm`}>
                <h2 className={`text-xl font-semibold mb-6 ${headerTextClass}`}>
                  Today's Team Progress
                </h2>
                <DailyTeamProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}