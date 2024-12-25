import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/theme-provider';
import { Toaster } from 'sonner';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Study Tracker',
  description: 'Track your study sessions and progress',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[#020817] flex flex-col">
            <main className="flex-1">
              <Toaster richColors position="top-center" />
              <ClientLayout>{children}</ClientLayout>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
