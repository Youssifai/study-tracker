'use client';

import { useEffect, useState } from 'react';
import { Plus, Book, Pencil, Trash2, Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface Course {
  id: string;
  name: string;
  description: string | null;
  examDate: string | null;
  userId: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    examDate: '',
  });
  const { data: session } = useSession();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error instanceof Error ? error.message : 'Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const url = editingCourse ? `/api/courses/${editingCourse.id}` : '/api/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save course');

      await fetchCourses();
      setIsModalOpen(false);
      setEditingCourse(null);
      setFormData({ name: '', description: '', examDate: '' });
    } catch (error) {
      console.error('Error saving course:', error);
      setError(error instanceof Error ? error.message : 'Failed to save course');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description || '',
      examDate: course.examDate || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      await fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete course');
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
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[rgb(111,142,255)]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[rgb(157,178,255)]">
            Your Courses
          </h1>
          <button
            onClick={() => {
              setEditingCourse(null);
              setFormData({ name: '', description: '', examDate: '' });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-[rgb(157,178,255)] hover:bg-[rgb(157,178,255)]/90 text-white rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(111,142,255,0.3)]"
          >
            <Plus size={20} />
            Add Course
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-black/40 border border-[rgb(111,142,255)]/20 backdrop-blur-sm rounded-lg p-6 shadow-[0_0_15px_rgba(111,142,255,0.15)] group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-[rgb(157,178,255)]" />
                  <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-1 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)] transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-1 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)] transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {course.description && (
                <p className="mt-2 text-sm text-[rgb(157,178,255)]/70">{course.description}</p>
              )}
              {course.examDate && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-[rgb(157,178,255)]" />
                  <span className="text-[rgb(157,178,255)]/70">
                    Exam in {calculateDaysUntilExam(course.examDate)} days ({new Date(course.examDate).toLocaleDateString()})
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-black/40 border border-[rgb(111,142,255)]/20 backdrop-blur-sm rounded-lg p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-semibold text-[rgb(157,178,255)] mb-4">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Course name"
                    className="w-full px-3 py-2 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg text-white placeholder-[rgb(157,178,255)]/50 focus:outline-none focus:border-[rgb(111,142,255)]/50"
                  />
                </div>
                <div>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Course description (optional)"
                    className="w-full px-3 py-2 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg text-white placeholder-[rgb(157,178,255)]/50 focus:outline-none focus:border-[rgb(111,142,255)]/50 min-h-[100px]"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg text-white placeholder-[rgb(157,178,255)]/50 focus:outline-none focus:border-[rgb(111,142,255)]/50"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[rgb(157,178,255)] hover:bg-[rgb(157,178,255)]/90 text-white rounded-lg transition-all shadow-[0_0_15px_rgba(111,142,255,0.3)]"
                  >
                    {editingCourse ? 'Save Changes' : 'Add Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}