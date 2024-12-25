'use client';

import { useEffect, useState } from 'react';
import { Plus, Book, Pencil, Trash2, Calendar, GraduationCap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

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
  const theme = session?.user?.theme;
  const router = useRouter();

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
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${
        theme === 'blue-dark' 
          ? 'bg-[rgba(41,58,247,0.2)]' 
          : 'bg-purple-600/20'
      } blur-[120px] rounded-full pointer-events-none`} />

      <div className="relative max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className={`p-6 rounded-lg border backdrop-blur-sm bg-black ${
          theme === 'blue-dark'
            ? 'border-[rgb(111,142,255)]/20'
            : 'border-purple-500/20'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <GraduationCap className={
                theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-400'
              } />
              <h1 className={`text-xl font-semibold ${
                theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
              }`}>
                Your Courses
              </h1>
            </div>

            <button
              onClick={() => {
                setFormData({ name: '', description: '', examDate: '' });
                setIsModalOpen(true);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
                theme === 'blue-dark'
                  ? 'bg-[rgb(111,142,255)] hover:bg-[rgb(111,142,255)]/90'
                  : 'bg-pink-500 hover:bg-pink-600'
              }`}
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
              className={`p-6 rounded-lg border backdrop-blur-sm bg-black ${
                theme === 'blue-dark'
                  ? 'border-[rgb(111,142,255)]/20'
                  : 'border-purple-500/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Book className={
                    theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
                  } />
                  <h3 className={`text-lg font-semibold ${
                    theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
                  }`}>
                    {course.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setFormData({
                        name: course.name,
                        description: course.description || '',
                        examDate: course.examDate || '',
                      });
                      setIsModalOpen(true);
                    }}
                    className={`p-1 transition-colors ${
                      theme === 'blue-dark'
                        ? 'text-[rgb(111,142,255)]/70 hover:text-[rgb(111,142,255)]'
                        : 'text-purple-300/70 hover:text-purple-300'
                    }`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className={`p-1 transition-colors ${
                      theme === 'blue-dark'
                        ? 'text-[rgb(111,142,255)]/70 hover:text-[rgb(111,142,255)]'
                        : 'text-purple-300/70 hover:text-purple-300'
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {course.description && (
                <p className={`mt-2 text-sm ${
                  theme === 'blue-dark'
                    ? 'text-[rgb(111,142,255)]/70'
                    : 'text-purple-300/70'
                }`}>
                  {course.description}
                </p>
              )}

              {course.examDate && (
                <div className={`mt-3 flex items-center gap-2 text-sm ${
                  theme === 'blue-dark'
                    ? 'text-[rgb(111,142,255)]/70'
                    : 'text-purple-300/70'
                }`}>
                  <Calendar className={
                    theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
                  } />
                  <span>
                    Exam in {calculateDaysUntilExam(course.examDate)} days ({new Date(course.examDate).toLocaleDateString()})
                  </span>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className={`w-full px-4 py-2 rounded-lg text-white transition-colors ${
                    theme === 'blue-dark'
                      ? 'bg-[rgb(111,142,255)] hover:bg-[rgb(111,142,255)]/90'
                      : 'bg-pink-500 hover:bg-pink-600'
                  }`}
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
          <div className={`p-6 rounded-lg border backdrop-blur-sm bg-black w-[90%] max-w-md ${
            theme === 'blue-dark'
              ? 'border-[rgb(111,142,255)]/20'
              : 'border-purple-500/20'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              theme === 'blue-dark' ? 'text-[rgb(111,142,255)]' : 'text-purple-300'
            }`}>
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Course name"
                className={`w-full px-3 py-2 bg-black border rounded-lg text-white placeholder-white/50 focus:outline-none ${
                  theme === 'blue-dark'
                    ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(111,142,255)]/50'
                    : 'border-purple-500/20 focus:border-purple-500/50'
                }`}
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Course description (optional)"
                className={`w-full px-3 py-2 bg-black border rounded-lg text-white placeholder-white/50 focus:outline-none min-h-[100px] ${
                  theme === 'blue-dark'
                    ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(111,142,255)]/50'
                    : 'border-purple-500/20 focus:border-purple-500/50'
                }`}
              />
              <input
                type="date"
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className={`w-full px-3 py-2 bg-black border rounded-lg text-white focus:outline-none ${
                  theme === 'blue-dark'
                    ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(111,142,255)]/50'
                    : 'border-purple-500/20 focus:border-purple-500/50'
                }`}
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCourse(null);
                    setFormData({ name: '', description: '', examDate: '' });
                  }}
                  className={`px-4 py-2 transition-colors ${
                    theme === 'blue-dark'
                      ? 'text-[rgb(111,142,255)]/70 hover:text-[rgb(111,142,255)]'
                      : 'text-purple-300/70 hover:text-purple-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${
                    theme === 'blue-dark'
                      ? 'bg-[rgb(111,142,255)] hover:bg-[rgb(111,142,255)]/90'
                      : 'bg-pink-500 hover:bg-pink-600'
                  }`}
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