'use client';

import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DailyStats {
  date: string;
  totalMinutes: number;
}

interface WeeklyStats {
  week: string;
  totalHours: number;
}

export default function StudyStatistics() {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const [dailyRes, weeklyRes] = await Promise.all([
        fetch('/api/statistics/daily'),
        fetch('/api/statistics/weekly')
      ]);

      if (!dailyRes.ok || !weeklyRes.ok) throw new Error('Failed to fetch statistics');

      const daily = await dailyRes.json();
      const weekly = await weeklyRes.json();

      setDailyStats(daily);
      setWeeklyStats(weekly);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading statistics...</div>;

  return (
    <div className="space-y-8">
      {/* Daily Statistics */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Daily Study Time</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis 
                label={{ 
                  value: 'Minutes', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip />
              <Bar dataKey="totalMinutes" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Statistics */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Weekly Study Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                label={{ 
                  value: 'Hours', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip />
              <Bar dataKey="totalHours" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 