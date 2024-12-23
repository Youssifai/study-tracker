'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Check, X, ChevronUp, ChevronDown, Flag, Book } from 'lucide-react';
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
  LOW: 'text-gray-500 dark:text-gray-400',
  MEDIUM: 'text-yellow-500 dark:text-yellow-400',
  HIGH: 'text-red-500 dark:text-red-400'
} as const;

export default function TodoList() {
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
            className="flex-1 px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <div className="flex items-center gap-1 px-2 border rounded-lg dark:border-gray-600">
            <button
              type="button"
              onClick={() => handlePriorityChange('up')}
              className="p-1 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <ChevronUp size={16} />
            </button>
            <Flag className={priorityColors[newTodo.priority]} size={16} />
            <button
              type="button"
              onClick={() => handlePriorityChange('down')}
              className="p-1 hover:text-blue-500 dark:hover:text-blue-400"
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
            className="flex-1 px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            value={newTodo.courseId}
            onChange={(e) => setNewTodo({ ...newTodo, courseId: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => {
          const course = courses.find(c => c.id === todo.courseId);
          return (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 group"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-1 rounded-md transition-colors ${
                    todo.completed
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-500 dark:text-green-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Check size={16} className={todo.completed ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} />
                </button>
                <div className={`flex flex-col ${todo.completed ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                  <span className="text-sm">{todo.title}</span>
                  <div className="flex items-center gap-2 text-xs">
                    {todo.tag && (
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                        {todo.tag}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Flag className={`${priorityColors[todo.priority]} w-3 h-3`} />
                      {course && (
                        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Book size={12} />
                          {course.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
} 