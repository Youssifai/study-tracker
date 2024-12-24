'use client';

import { useEffect, useState } from 'react';
import { Check, Flame } from 'lucide-react';

interface StudyStats {
  weeklyProgress: number; // 0-7 days
  dailyProgress: number; // 0-12 hours
  streaks: boolean[]; // last 7 days, true if studied
  totalStudyDays: number;
}

export default function StudyProgress() {
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
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>Week: {stats.weeklyProgress}/7</span>
            <span>{Math.round(weeklyPercentage)}%</span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${weeklyPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>Day: {stats.dailyProgress.toFixed(1)}/12</span>
            <span>{Math.round(dailyPercentage)}%</span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${dailyPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Streaks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Streaks</h3>
          <div className="flex items-center gap-1">
            <Flame className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            <span className="text-yellow-500 dark:text-yellow-400 font-bold">{stats.totalStudyDays}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Your track record in the last 7 days:
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stats.streaks[index] 
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
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