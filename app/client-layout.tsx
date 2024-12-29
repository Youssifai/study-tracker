'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './components/LoadingSpinner';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Start loading when pathname changes
    setLoading(true);
    setContent(null);

    // Preload the content
    Promise.all([
      // Wait for a minimum time to prevent flash
      new Promise(resolve => setTimeout(resolve, 500)),
      // Simulate component loading
      new Promise(resolve => {
        setContent(children);
        // Use requestAnimationFrame to ensure DOM updates
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      })
    ]).then(() => {
      setLoading(false);
    });
  }, [pathname, children]);

  return (
    <SessionProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black"
          >
            <LoadingSpinner size="lg" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </SessionProvider>
  );
}
