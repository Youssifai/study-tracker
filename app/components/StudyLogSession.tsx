'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Clock, Calendar } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface StudySession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  courseName?: string;
}

export default function StudyLogSession() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchStudySessions();
  }, []);

  const fetchStudySessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/study-sessions');
      if (!response.ok) throw new Error('Failed to fetch study sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching study sessions:', error);
      setError(error instanceof Error ? error.message : 'Failed to load study sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Study Log</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {sessions.length > 0 ? (
          sessions.map((studySession) => (
            <div
              key={studySession.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {studySession.courseName && (
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {studySession.courseName}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    <span>{formatDate(studySession.startTime)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  <Clock size={14} />
                  <span>{formatDuration(studySession.duration)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500 dark:text-gray-400">
            No study sessions recorded yet
          </div>
        )}
      </div>
    </div>
  );
} 