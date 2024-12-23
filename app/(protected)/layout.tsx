'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-16">{children}</main>
    </div>
  );
} 