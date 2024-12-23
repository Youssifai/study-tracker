'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = ['/', '/login', '/signup'].includes(pathname);

  return (
    <div className="min-h-screen">
      {!isAuthPage && <Sidebar />}
      <main className={!isAuthPage ? 'ml-16' : ''}>
        {children}
      </main>
    </div>
  );
} 