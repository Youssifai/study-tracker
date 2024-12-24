import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './providers/auth-provider';
import { ThemeProvider } from './providers/theme-provider';

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
