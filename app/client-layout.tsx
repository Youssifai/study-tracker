'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import LoadingSpinner from './components/LoadingSpinner';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Add a small delay to ensure the loading state is visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SessionProvider>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen p-0 m-0">
          <LoadingSpinner />
        </div>
      ) : (
        children
      )}
    </SessionProvider>
  );
}
