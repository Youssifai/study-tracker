'use client';

import { useEffect, useState } from 'react';
import { Check, Flame } from 'lucide-react';
import { useTheme } from '@/app/providers/theme-provider';

interface StudyStats {
  weeklyProgress: number; // 0-7 days
  dailyProgress: number; // 0-12 hours
  streaks: boolean[]; // last 7 days, true if studied
  totalStudyDays: number;
}

export default function StudyProgress() {
  const { theme } = useTheme();
  const [stats, setStats] = useState<StudyStats>({
    weeklyProgress: 0,
    dailyProgress: 0,
    streaks: [],
    totalStudyDays: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [weeklyResponse, dailyResponse] = await Promise.all([
          fetch('/api/statistics/weekly'),
          fetch('/api/statistics/daily')
        ]);

        const weeklyData = await weeklyResponse.json();
        const dailyData = await dailyResponse.json();

        // Calculate weekly progress (days studied this week)
        const daysStudied = weeklyData.sessions.filter((day: any) => day.hasSession).length;
        
        // Calculate daily progress (hours studied today, max 12 hours)
        const todayMinutes = dailyData.totalMinutes || 0;
        const hoursStudied = Math.min(todayMinutes / 60, 12); // Cap at 12 hours

        // Get streak data for the last 7 days (Saturday to Friday)
        const streakData = weeklyData.sessions.map((day: any) => day.hasSession);

        setStats({
          weeklyProgress: daysStudied,
          dailyProgress: hoursStudied,
          streaks: streakData,
          totalStudyDays: weeklyData.totalDays || 0
        });
      } catch (error) {
        console.error('Error fetching study stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>;
  }

  const weeklyPercentage = (stats.weeklyProgress / 7) * 100;
  const dailyPercentage = (stats.dailyProgress / 12) * 100; // Changed to 12 hours

  // Days ordered from Saturday to Friday
  const days = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

  return (
    <div className="space-y-6">
      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <div className={`flex justify-between text-sm mb-1 ${
            theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
          }`}>
            <span>Week: {stats.weeklyProgress}/7</span>
            <span>{Math.round(weeklyPercentage)}%</span>
          </div>
          <div className={`h-4 rounded-full overflow-hidden ${
            theme === 'blue-dark' ? 'bg-[rgb(111,142,255)]/20' : 'bg-purple-500/20'
          }`}>
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                theme === 'blue-dark' ? 'bg-[rgb(111,142,255)]' : 'bg-pink-500'
              }`}
              style={{ width: `${weeklyPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className={`flex justify-between text-sm mb-1 ${
            theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
          }`}>
            <span>Day: {stats.dailyProgress.toFixed(1)}/12</span>
            <span>{Math.round(dailyPercentage)}%</span>
          </div>
          <div className={`h-4 rounded-full overflow-hidden ${
            theme === 'blue-dark' ? 'bg-[rgb(111,142,255)]/20' : 'bg-purple-500/20'
          }`}>
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                theme === 'blue-dark' ? 'bg-[rgb(111,142,255)]' : 'bg-pink-500'
              }`}
              style={{ width: `${dailyPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Streaks */}
      <div className={`bg-black/40 rounded-lg p-4 border backdrop-blur-sm ${
        theme === 'blue-dark' ? 'border-[rgb(111,142,255)]/20' : 'border-purple-500/20'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-white">Streaks</h3>
          <div className="flex items-center gap-1">
            <Flame className={theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-pink-500'} size={20} />
            <span className={theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-pink-500'}>
              {stats.totalStudyDays}
            </span>
          </div>
        </div>
        
        <div className={`text-sm mb-2 ${
          theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
        }`}>
          Your track record in the last 7 days:
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <div className={`text-xs mb-1 ${
                theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-400'
              }`}>
                {day}
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stats.streaks[index] 
                  ? theme === 'blue-dark'
                    ? 'bg-[rgb(111,142,255)]/20 text-[rgb(111,142,255)]'
                    : 'bg-pink-500/20 text-pink-500'
                  : theme === 'blue-dark'
                  ? 'bg-[rgb(111,142,255)]/10 text-[rgb(111,142,255)]/50'
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                <Check size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 