'use client';

import { useEffect, useState } from 'react';
import { Check, Circle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
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
      <div className="text-red-500 dark:text-red-400 p-6 text-center">
        {error || 'Failed to load daily progress'}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          Today's Team Progress
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyProgress.users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 transition-all duration-200"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-center">
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
                        <Check className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={`${
                          todo.completed
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-800 dark:text-gray-200'
                        } break-words`}
                      >
                        {todo.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
                  No tasks for today
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 