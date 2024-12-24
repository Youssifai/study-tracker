'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Check, X, ChevronUp, ChevronDown, Flag, Book } from 'lucide-react';
import { useTheme } from '@/app/providers/theme-provider';
import LoadingSpinner from './LoadingSpinner';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  courseId: string | null;
  tag?: string | null;
}

interface Course {
  id: string;
  name: string;
}

type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

const priorityColors = {
  LOW: 'text-purple-300',
  MEDIUM: 'text-pink-500',
  HIGH: 'text-red-500'
} as const;

export default function TodoList() {
  const { theme } = useTheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: 'MEDIUM' as Priority,
    courseId: '',
    tag: ''
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const priorityColorsTheme = {
    LOW: theme === 'blue-dark' ? 'text-[rgb(157,178,255)]' : priorityColors.LOW,
    MEDIUM: theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : priorityColors.MEDIUM,
    HIGH: theme === 'blue-dark' ? 'text-[rgb(67,83,255)]' : priorityColors.HIGH
  } as const;

  useEffect(() => {
    fetchTodos();
    fetchCourses();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError(error instanceof Error ? error.message : 'Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
      if (data.length > 0) {
        setNewTodo(prev => ({ ...prev, courseId: data[0].id }));
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTodo.title,
          tag: newTodo.tag,
          courseId: newTodo.courseId || null,
          priority: newTodo.priority
        }),
      });

      if (!response.ok) throw new Error('Failed to create todo');
      const todo = await response.json();
      setTodos([...todos, todo]);
      setNewTodo({ title: '', tag: '', courseId: courses[0]?.id || '', priority: 'MEDIUM' });
    } catch (error) {
      console.error('Error creating todo:', error);
      setError(error instanceof Error ? error.message : 'Failed to create todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      console.error('Error updating todo:', error);
      setError(error instanceof Error ? error.message : 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete todo');
    }
  };

  const handlePriorityChange = (direction: 'up' | 'down') => {
    const priorities = ['LOW', 'MEDIUM', 'HIGH'] as const;
    const currentIndex = priorities.indexOf(newTodo.priority);
    const newIndex = direction === 'up' 
      ? Math.min(currentIndex + 1, priorities.length - 1)
      : Math.max(currentIndex - 1, 0);
    setNewTodo({ ...newTodo, priority: priorities[newIndex] });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Add a new task..."
            className={`flex-1 px-3 py-2 bg-black/40 border rounded-lg text-white placeholder-white-300/50 focus:outline-none ${
              theme === 'blue-dark' 
                ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(111,142,255)]/50'
                : 'border-purple-500/20 focus:border-purple-500/50'
            }`}
          />
          <div className={`flex items-center gap-1 px-2 bg-black/40 border rounded-lg ${
            theme === 'blue-dark'
              ? 'border-[rgb(111,142,255)]/20'
              : 'border-purple-500/20'
          }`}>
            <button
              type="button"
              onClick={() => handlePriorityChange('up')}
              className={`p-1 transition-colors ${
                theme === 'blue-dark'
                  ? 'text-[rgb(111,142,255)] hover:text-[rgb(111,142,255)]/80'
                  : 'text-purple-400 hover:text-pink-500'
              }`}
            >
              <ChevronUp size={16} />
            </button>
            <Flag className={priorityColorsTheme[newTodo.priority]} size={16} />
            <button
              type="button"
              onClick={() => handlePriorityChange('down')}
              className={`p-1 transition-colors ${
                theme === 'blue-dark'
                  ? 'text-[rgb(111,142,255)] hover:text-[rgb(111,142,255)]/80'
                  : 'text-purple-400 hover:text-pink-500'
              }`}
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo.tag}
            onChange={(e) => setNewTodo({ ...newTodo, tag: e.target.value })}
            placeholder="Tag (e.g., homework, exam)"
            className={`flex-1 px-3 py-2 bg-black/40 border rounded-lg text-white placeholder-white-300/50 focus:outline-none ${
              theme === 'blue-dark' 
                ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(157,178,255)]/50'
                : 'border-purple-500/20 focus:border-purple-500/50'
            }`}
          />
          <select
            value={newTodo.courseId}
            onChange={(e) => setNewTodo({ ...newTodo, courseId: e.target.value })}
            className={`flex-1 px-3 py-2 bg-black/40 border rounded-lg text-white focus:outline-none ${
              theme === 'blue-dark' 
                ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(157,178,255)]/50'
                : 'border-purple-500/20 focus:border-purple-500/50'
            }`}
          >
            {courses.map(course => (
              <option key={course.id} value={course.id} className="bg-black text-white">
                {course.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={`px-6 py-2 text-white rounded-lg transition-all shadow-md hover:shadow-lg ${
              theme === 'blue-dark'
                ? 'bg-[#6b8bfb] hover:bg-[#6b8bfb]/90'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 bg-black/40 border rounded-lg ${
              theme === 'blue-dark'
                ? 'border-[rgb(111,142,255)]/20'
                : 'border-purple-500/20'
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`p-1 rounded-full transition-colors ${
                todo.completed
                  ? theme === 'blue-dark'
                    ? 'bg-[rgb(111,142,255)] text-white'
                    : 'bg-purple-500 text-white'
                  : theme === 'blue-dark'
                  ? 'border border-[rgb(111,142,255)]/20 text-[rgb(111,142,255)] hover:bg-[rgb(111,142,255)]/10'
                  : 'border border-purple-500/20 text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              <Check size={14} />
            </button>
            <div className="flex-1">
              <div className={`font-medium ${todo.completed ? 'line-through opacity-50' : ''}`}>
                {todo.title}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {todo.courseId && (
                  <div className={`flex items-center gap-1 text-sm ${
                    theme === 'blue-dark' ? 'text-[#6b8bfb]' : 'text-purple-400'
                  }`}>
                    <Book size={12} />
                    <span>{courses.find(c => c.id === todo.courseId)?.name}</span>
                  </div>
                )}
                {todo.tag && (
                  <div className={`flex items-center gap-1 text-sm ${
                    theme === 'blue-dark' ? 'text-[#6b8bfb]/70' : 'text-purple-400/70'
                  }`}>
                    <span>•</span>
                    <span>#{todo.tag}</span>
                  </div>
                )}
              </div>
            </div>
            <Flag className={priorityColorsTheme[todo.priority]} size={14} />
            <button
              onClick={() => deleteTodo(todo.id)}
              className={`p-1 rounded-full transition-colors ${
                theme === 'blue-dark'
                  ? 'text-[rgb(111,142,255)] hover:text-[rgb(111,142,255)]/80'
                  : 'text-purple-400 hover:text-pink-500'
              }`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}