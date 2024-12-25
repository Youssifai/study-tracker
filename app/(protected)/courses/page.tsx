'use client';

import { useEffect, useState } from 'react';
import { Plus, Book, Pencil, Trash2, Calendar, GraduationCap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/providers/theme-provider';

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
  const { theme } = useTheme();
  const router = useRouter();

  // Theme-specific classes
  const glowEffect = theme === 'blue-dark' 
    ? "bg-[rgba(41,58,247,0.2)]" 
    : "bg-purple-600/20";

  const headerTextClass = theme === 'blue-dark'
    ? "text-[rgb(111,142,255)]"
    : "text-purple-300";

  const cardBorderClass = theme === 'blue-dark'
    ? "border-[rgb(111,142,255)]/20"
    : "border-purple-500/20";

  const buttonClass = theme === 'blue-dark'
    ? "bg-[rgb(111,142,255)] hover:bg-[rgb(111,142,255)]/90"
    : "bg-pink-500 hover:bg-pink-600";

  const iconClass = theme === 'blue-dark'
    ? "text-[rgb(111,142,255)]"
    : "text-purple-400";

  const shadowClass = theme === 'blue-dark'
    ? "shadow-[0_0_15px_rgba(41,58,247,0.2)]"
    : "shadow-[0_0_15px_rgba(168,85,247,0.15)]";

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
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${glowEffect} blur-[120px] rounded-full pointer-events-none`} />

      <div className="relative max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className={`p-6 rounded-lg border backdrop-blur-sm bg-black/40 ${cardBorderClass} ${shadowClass}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <GraduationCap className={iconClass} />
              <h1 className={`text-xl font-semibold ${headerTextClass}`}>
                Your Courses
              </h1>
            </div>

            <button
              onClick={() => {
                setFormData({ name: '', description: '', examDate: '' });
                setIsModalOpen(true);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${buttonClass}`}
            >
              <Plus size={20} />
              Add Course
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`p-6 rounded-lg border backdrop-blur-sm bg-black/40 ${cardBorderClass} ${shadowClass}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Book className={iconClass} />
                  <h3 className={`text-lg font-semibold ${headerTextClass}`}>
                    {course.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className={`p-1 transition-colors hover:${iconClass}`}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className={`p-1 transition-colors hover:${iconClass}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {course.description && (
                <p className={`mt-2 text-sm ${headerTextClass}/70`}>
                  {course.description}
                </p>
              )}

              {course.examDate && (
                <div className={`mt-3 flex items-center gap-2 text-sm ${headerTextClass}/70`}>
                  <Calendar className={iconClass} />
                  <span>
                    Exam in {calculateDaysUntilExam(course.examDate)} days ({new Date(course.examDate).toLocaleDateString()})
                  </span>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className={`w-full px-4 py-2 rounded-lg text-white transition-colors ${buttonClass}`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg border backdrop-blur-sm bg-black/40 w-[90%] max-w-md ${cardBorderClass} ${shadowClass}`}>
            <h2 className={`text-xl font-semibold mb-4 ${headerTextClass}`}>
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Course name"
                className={`w-full px-3 py-2 bg-black border rounded-lg text-white placeholder-white/50 focus:outline-none ${cardBorderClass}`}
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Course description (optional)"
                className={`w-full px-3 py-2 bg-black border rounded-lg text-white placeholder-white/50 focus:outline-none min-h-[100px] ${cardBorderClass}`}
              />
              <input
                type="date"
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className={`w-full px-3 py-2 bg-black border rounded-lg text-white focus:outline-none ${cardBorderClass}`}
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCourse(null);
                    setFormData({ name: '', description: '', examDate: '' });
                  }}
                  className={`px-4 py-2 transition-colors ${headerTextClass}/70 hover:${headerTextClass}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${buttonClass}`}
                >
                  {editingCourse ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}