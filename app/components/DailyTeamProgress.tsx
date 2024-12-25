'use client';

import { useEffect, useState } from 'react';
import { Check, Circle } from 'lucide-react';
import { useTheme } from '@/app/providers/theme-provider';
import LoadingSpinner from './LoadingSpinner';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  tag?: string;
  course?: {
    id: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
  todos: Todo[];
}

interface DailyProgress {
  users: User[];
  date: string;
}

export default function DailyTeamProgress() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);

  useEffect(() => {
    fetchDailyProgress();
  }, []);

  const fetchDailyProgress = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/api/todos/daily?date=${today}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch daily progress');
      }

      const data = await response.json();
      setDailyProgress(data);
    } catch (error) {
      console.error('Error fetching daily progress:', error);
      setError(error instanceof Error ? error.message : 'Failed to load daily progress');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !dailyProgress) {
    return (
      <div className={`p-6 text-center ${
        theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-pink-500'
      }`}>
        {error || 'Failed to load daily progress'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dailyProgress.users.map((user) => (
        <div
          key={user.id}
          className={`bg-black/40 rounded-lg p-4 border backdrop-blur-sm transition-all duration-200 ${
            theme === 'blue-dark' ? 'border-[rgb(111,142,255)]/20' : 'border-purple-500/20'
          }`}
        >
          <h3 className="font-medium text-white mb-4 text-center">
            {user.name}
          </h3>
          
          {user.todos.length > 0 ? (
            <ul className="space-y-3">
              {user.todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-start gap-3 text-sm group"
                >
                  {todo.completed ? (
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-pink-500'
                    }`} />
                  ) : (
                    <Circle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      theme === 'blue-dark' ? 'text-[rgb(111,142,255)]/50' : 'text-purple-400'
                    }`} />
                  )}
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        todo.completed
                          ? `line-through ${theme === 'blue-dark' ? 'text-[#6b8bfb]/50' : 'text-purple-400'}`
                          : theme === 'blue-dark' ? 'text-[#6b8bfb]' : 'text-purple-300'
                      }
                    >
                      {todo.title}
                      {(todo.tag) && (
                        <span className="ml-2 text-xs opacity-70">
                          #{todo.tag}
                        </span>
                      )}
                    </span>
                    {todo.completed && (
                      <Check className={`w-4 h-4 ${
                        theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-pink-500'
                      }`} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-sm text-center italic ${
              theme === 'blue-dark' ? 'text-[rgb(111,142,255)]/70' : 'text-purple-400'
            }`}>
              No tasks for today
            </p>
          )}
        </div>
      ))}
    </div>
  );
} 