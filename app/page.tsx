import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Study Tracker
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Track your study sessions, manage courses, and collaborate with study groups
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-medium"
          >
            Sign In
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Track Study Time</h3>
            <p className="text-gray-600">
              Log and monitor your study sessions to improve productivity
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Manage Courses</h3>
            <p className="text-gray-600">
              Organize your courses and track exam dates effectively
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Study Groups</h3>
            <p className="text-gray-600">
              Join study groups and collaborate with fellow students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}