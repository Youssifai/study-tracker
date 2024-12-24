'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Play, Square, Clock } from 'lucide-react';

export default function SessionTimer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    let animationFrameId: number;
    
    if (isRunning && startTime) {
      const updateTimer = () => {
        const elapsedSeconds = Math.floor((performance.now() - startTime) / 1000);
        setTimer(elapsedSeconds);
        animationFrameId = requestAnimationFrame(updateTimer);
      };
      
      animationFrameId = requestAnimationFrame(updateTimer);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime]);

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
      setStartTime(performance.now());
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

      const duration = Math.floor(timer / 60); // Convert seconds to minutes
      alert(`Study session ended! You studied for ${formatTime(timer)}`);

      setActiveSession(null);
      setIsRunning(false);
      setTimer(0);
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Study Timer</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-gray-400" />
            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
              {formatTime(timer)}
            </span>
          </div>
          <div className="flex gap-4">
            {!isRunning ? (
              <button
                onClick={startSession}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Play size={16} />
                <span>Start Session</span>
              </button>
            ) : (
              <button
                onClick={endSession}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Square size={16} />
                <span>End Session</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 