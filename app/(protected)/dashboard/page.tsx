'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import TodoList from '@/app/components/TodoList';
import GroupBar from '@/app/components/GroupBar';
import GroupActions from '@/app/components/GroupActions';
import StudyProgress from '@/app/components/StudyProgress';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [hasGroup, setHasGroup] = useState<boolean>(false);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startSession = async () => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to start session');
      }

      const data = await response.json();
      setActiveSession(data.id);
      setIsRunning(true);
      setTimer(0);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const endSession = async () => {
    if (!activeSession) return;

    try {
      const response = await fetch(`/api/sessions/${activeSession}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to end session');
      }

      setActiveSession(null);
      setIsRunning(false);
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <div className="text-center">
                <h2 className="text-4xl font-mono font-bold mb-6 text-gray-800 dark:text-gray-100">
                  {formatTime(timer)}
                </h2>
                <div className="space-x-4">
                  {!isRunning ? (
                    <button
                      onClick={startSession}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Start Study Session
                    </button>
                  ) : (
                    <button
                      onClick={endSession}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      End Session
                    </button>
                  )}
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
} 