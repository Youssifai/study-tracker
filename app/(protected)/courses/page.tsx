'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Course {
  id: string;
  name: string;
  examDate: string | null;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', examDate: '' });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name.trim()) return;

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error('Failed to add course');

      const addedCourse = await response.json();
      setCourses([...courses, addedCourse]);
      setNewCourse({ name: '', examDate: '' });
      setIsAddingCourse(false);
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const updateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      const response = await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCourse),
      });

      if (!response.ok) throw new Error('Failed to update course');

      setCourses(courses.map(course => 
        course.id === editingCourse.id ? editingCourse : course
      ));
      setEditingCourse(null);
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');

      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const calculateDaysUntilExam = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Courses</h1>
        <button
          onClick={() => setIsAddingCourse(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      {isAddingCourse && (
        <form onSubmit={addCourse} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Course Name
            </label>
            <input
              type="text"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter course name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Exam Date (optional)
            </label>
            <input
              type="date"
              value={newCourse.examDate}
              onChange={(e) => setNewCourse({ ...newCourse, examDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingCourse(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400"
            >
              Add Course
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            {editingCourse?.id === course.id ? (
              <form onSubmit={updateCourse} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={editingCourse.examDate || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, examDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {course.name}
                  </h3>
                  {course.examDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar size={16} />
                      <span>
                        Exam in {calculateDaysUntilExam(course.examDate)} days ({new Date(course.examDate).toLocaleDateString()})
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 