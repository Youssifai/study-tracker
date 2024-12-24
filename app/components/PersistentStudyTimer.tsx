'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Play, Square, Clock, Pause, AlertCircle } from 'lucide-react';
import { useTimer } from 'react-timer-hook';
import { toast } from 'react-hot-toast';

// Constants for localStorage keys and timer settings
const STORAGE_KEY = 'study_session_data';
const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

// Types for session data management
interface SessionData {
  startTimestamp: number;
  sessionId: string;
  isPaused: boolean;
  pausedAt: number | null;
  totalPausedTime: number;
  lastSyncedTime: number;
}

interface TimerState {
  isLoading: boolean;
  error: string | null;
}

/**
 * PersistentStudyTimer Component
 * 
 * A robust study timer component that:
 * - Persists timer state across page reloads and tab switches
 * - Provides accurate time tracking even during page inactivity
 * - Integrates with backend API for session management
 * - Handles errors gracefully with user feedback
 */
export default function PersistentStudyTimer() {
  // Session management
  const { data: session } = useSession();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [totalPausedTime, setTotalPausedTime] = useState(0);

  // UI state management
  const [timerState, setTimerState] = useState<TimerState>({
    isLoading: false,
    error: null,
  });

  // Initialize timer with a far future expiry time
  const getExpiryTimestamp = useCallback((secondsToAdd: number = 0) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + secondsToAdd);
    return time;
  }, []);

  // Timer hook initialization with display time state
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const {
    isRunning,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp: getExpiryTimestamp(ONE_DAY_IN_SECONDS),
    autoStart: false,
    onExpire: () => {
      console.warn('Timer reached maximum duration');
      toast.error('Session exceeded maximum duration. Please start a new session.');
      handleEndSession();
    },
  });

  /**
   * Loads session data from localStorage and restores timer state
   */
  const loadSession = useCallback(async () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    try {
      const sessionData = JSON.parse(savedData) as SessionData;
      
      // Calculate elapsed time including pauses
      const now = Date.now();
      let elapsed = Math.floor((now - sessionData.startTimestamp) / 1000);
      
      // Subtract total paused time
      if (sessionData.totalPausedTime) {
        elapsed -= Math.floor(sessionData.totalPausedTime / 1000);
      }
      
      // If currently paused, subtract current pause duration
      if (sessionData.isPaused && sessionData.pausedAt) {
        const currentPauseDuration = now - sessionData.pausedAt;
        elapsed -= Math.floor(currentPauseDuration / 1000);
      }

      // Ensure elapsed time is not negative
      elapsed = Math.max(0, elapsed);

      // First restore local state
      setActiveSession(sessionData.sessionId);
      setIsPaused(sessionData.isPaused);
      setTotalPausedTime(sessionData.totalPausedTime || 0);
      
      // Update timer display
      const time = getExpiryTimestamp(ONE_DAY_IN_SECONDS - elapsed);
      restartTimer(time, !sessionData.isPaused);

      // Then verify session with backend
      try {
        const response = await fetch(`/api/sessions/${sessionData.sessionId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn('Session validation warning:', errorData.message || 'Session validation failed');
          
          // Don't throw error here, just sync the current state
          await fetch(`/api/sessions/${sessionData.sessionId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lastSyncedTime: now,
              totalPausedTime: sessionData.totalPausedTime || 0,
              isPaused: sessionData.isPaused,
              pausedAt: sessionData.pausedAt,
            }),
          });
        }
      } catch (error) {
        // Log backend sync error but don't disrupt the timer
        console.warn('Session sync warning:', error);
        toast.error('Session sync failed, but timer will continue');
      }

    } catch (error) {
      console.error('Error loading session:', error);
      localStorage.removeItem(STORAGE_KEY);
      toast.error('Failed to restore session data');
      setTimerState(prev => ({ ...prev, error: 'Timer reset due to data error' }));
      
      // Reset all states
      setActiveSession(null);
      setIsPaused(false);
      setTotalPausedTime(0);
      restartTimer(getExpiryTimestamp(ONE_DAY_IN_SECONDS), false);
    }
  }, [getExpiryTimestamp, restartTimer]);

  /**
   * Handles starting a new study session
   */
  const handleStartSession = async () => {
    setTimerState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to start session');
      }

      const data = await response.json();
      const now = Date.now();
      
      // Save session data
      const sessionData: SessionData = {
        startTimestamp: now,
        sessionId: data.id,
        isPaused: false,
        pausedAt: null,
        totalPausedTime: 0,
        lastSyncedTime: now,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      
      // Initialize timer
      setActiveSession(data.id);
      setIsPaused(false);
      setTotalPausedTime(0);
      restartTimer(getExpiryTimestamp(ONE_DAY_IN_SECONDS), true);
      
      toast.success('Study session started!');
    } catch (error) {
      console.error('Failed to start session:', error);
      toast.error('Failed to start session');
      setTimerState(prev => ({ ...prev, error: 'Failed to start session' }));
    } finally {
      setTimerState(prev => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * Handles pausing/resuming the study session
   */
  const handleTogglePause = useCallback(async () => {
    if (!activeSession) return;

    try {
      const now = Date.now();
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) throw new Error('No active session found');

      const sessionData = JSON.parse(savedData) as SessionData;

      if (!isPaused) {
        // Pausing
        pauseTimer();
        sessionData.isPaused = true;
        sessionData.pausedAt = now;
        toast.success('Session paused');
      } else {
        // Resuming
        if (sessionData.pausedAt) {
          const pauseDuration = now - sessionData.pausedAt;
          sessionData.totalPausedTime += pauseDuration;
        }
        sessionData.isPaused = false;
        sessionData.pausedAt = null;
        resumeTimer();
        toast.success('Session resumed');
      }

      // Update localStorage first
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      setIsPaused(!isPaused);
      setTotalPausedTime(sessionData.totalPausedTime);

      // Then sync with backend
      const response = await fetch(`/api/sessions/${activeSession}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPaused: !isPaused,
          totalPausedTime: sessionData.totalPausedTime,
          pausedAt: !isPaused ? now : null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update session state');
      }

    } catch (error) {
      console.error('Error toggling pause:', error);
      toast.error('Failed to update session state');
      // Revert local changes if backend sync fails
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const sessionData = JSON.parse(savedData) as SessionData;
        setIsPaused(sessionData.isPaused);
        setTotalPausedTime(sessionData.totalPausedTime);
      }
    }
  }, [activeSession, isPaused, pauseTimer, resumeTimer]);

  /**
   * Handles ending the study session
   */
  const handleEndSession = async () => {
    if (!activeSession) return;

    setTimerState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) throw new Error('No active session found');

      const sessionData = JSON.parse(savedData) as SessionData;
      const now = Date.now();
      
      // Calculate total duration excluding paused time
      let totalDuration = Math.floor((now - sessionData.startTimestamp) / 1000);
      
      // Subtract total paused time
      if (sessionData.totalPausedTime) {
        totalDuration -= Math.floor(sessionData.totalPausedTime / 1000);
      }
      
      // If currently paused, subtract current pause duration
      if (sessionData.isPaused && sessionData.pausedAt) {
        const currentPauseDuration = now - sessionData.pausedAt;
        totalDuration -= Math.floor(currentPauseDuration / 1000);
      }

      // Ensure duration is not negative
      totalDuration = Math.max(0, totalDuration);

      const response = await fetch(`/api/sessions/${activeSession}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration: totalDuration,
          totalPausedTime: sessionData.totalPausedTime || 0,
          endTime: now,
          isCompleted: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to end session');
      }

      toast.success(`Study session ended! You studied for ${formatTime(totalDuration)}`);
      
      // Clean up
      localStorage.removeItem(STORAGE_KEY);
      setActiveSession(null);
      setIsPaused(false);
      setTotalPausedTime(0);
      restartTimer(getExpiryTimestamp(ONE_DAY_IN_SECONDS), false);

    } catch (error) {
      console.error('Failed to end session:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to end session');
      setTimerState(prev => ({ ...prev, error: 'Failed to end session. Please try again.' }));
    } finally {
      setTimerState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Initialize session on mount and handle visibility changes
  useEffect(() => {
    loadSession();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          try {
            const sessionData = JSON.parse(savedData) as SessionData;
            if (sessionData.sessionId === activeSession) {
              // Only reload if it's the same session
              loadSession();
            }
          } catch (error) {
            console.error('Error checking session data:', error);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [loadSession, activeSession]);

  // Update sync interval to be more frequent when active
  useEffect(() => {
    let syncInterval: NodeJS.Timeout;

    if (activeSession && !isPaused) {
      syncInterval = setInterval(async () => {
        try {
          const savedData = localStorage.getItem(STORAGE_KEY);
          if (!savedData) return;

          const sessionData = JSON.parse(savedData) as SessionData;
          const now = Date.now();
          
          const response = await fetch(`/api/sessions/${activeSession}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lastSyncedTime: now,
              totalPausedTime: sessionData.totalPausedTime,
              isPaused: sessionData.isPaused,
              pausedAt: sessionData.pausedAt,
            }),
          });

          if (!response.ok) {
            console.warn('Session sync warning:', response.statusText);
            return;
          }

          sessionData.lastSyncedTime = now;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
        } catch (error) {
          console.warn('Failed to sync with backend:', error);
        }
      }, 60 * 1000); // Sync every minute instead of 5 minutes
    }

    return () => {
      if (syncInterval) clearInterval(syncInterval);
    };
  }, [activeSession, isPaused]);

  // Update display time
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (activeSession && !isPaused) {
      const updateDisplayTime = () => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const sessionData = JSON.parse(savedData) as SessionData;
          const now = Date.now();
          let elapsed = Math.floor((now - sessionData.startTimestamp) / 1000);
          
          // Subtract total paused time
          if (sessionData.totalPausedTime) {
            elapsed -= Math.floor(sessionData.totalPausedTime / 1000);
          }
          
          // If currently paused, subtract current pause duration
          if (sessionData.isPaused && sessionData.pausedAt) {
            const currentPauseDuration = now - sessionData.pausedAt;
            elapsed -= Math.floor(currentPauseDuration / 1000);
          }

          setDisplaySeconds(Math.max(0, elapsed));
        }
      };

      // Update immediately
      updateDisplayTime();
      
      // Then update every second
      intervalId = setInterval(updateDisplayTime, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeSession, isPaused]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/60 rounded-xl shadow-lg border border-purple-500/20 overflow-hidden backdrop-blur-sm">
      <div className="p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Title with Badge */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Focus Timer
            </h2>
            <span className="px-2 py-1 text-xs font-semibold bg-purple-900/30 text-purple-300 rounded-full border border-purple-500/20">
              Persistent
            </span>
          </div>

          {/* Timer Display */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="relative bg-black/40 rounded-2xl shadow-inner p-6 min-w-[240px] border border-purple-500/20">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-8 h-8 text-pink-500" />
                <span className="text-4xl font-mono font-bold text-purple-200 tabular-nums">
                  {formatTime(displaySeconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {timerState.error && (
            <div className="flex items-center gap-2 text-red-500 bg-black/40 px-4 py-2 rounded-lg border border-purple-500/20">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">{timerState.error}</span>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            {!activeSession ? (
              <button
                onClick={handleStartSession}
                disabled={timerState.isLoading}
                className={`flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-md hover:shadow-lg ${
                  timerState.isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Play size={20} className="animate-pulse" />
                <span className="font-medium">{timerState.isLoading ? 'Starting...' : 'Start Focus Session'}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleTogglePause}
                  disabled={timerState.isLoading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium 
                    ${isPaused 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-purple-900/30 hover:bg-purple-900/40 text-white'
                    } ${timerState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  <span>{isPaused ? 'Resume Focus' : 'Take a Break'}</span>
                </button>
                <button
                  onClick={handleEndSession}
                  disabled={timerState.isLoading}
                  className={`flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-md hover:shadow-lg font-medium ${
                    timerState.isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Square size={20} />
                  <span>{timerState.isLoading ? 'Ending...' : 'End Session'}</span>
                </button>
              </>
            )}
          </div>

          {/* Session Status */}
          {activeSession && (
            <div className="text-sm text-purple-300 font-medium">
              {isPaused ? 'Session Paused' : 'Focus Session in Progress'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
