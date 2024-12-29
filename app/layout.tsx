import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/theme-provider';
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
      <body className={`${inter.className} antialiased p-0 m-0`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[#020817] flex flex-col">
            <main className="flex-1 p-0 m-0">
              <ClientLayout>{children}</ClientLayout>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
