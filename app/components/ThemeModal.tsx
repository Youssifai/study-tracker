'use client';

import { useTheme } from '@/app/providers/theme-provider';
import { X } from 'lucide-react';

const themes = [
  {
    id: 'blue-dark',
    name: 'Blue Dark',
    preview: {
      bg: 'bg-blue-900',
      text: 'text-white/70',
      accent: 'bg-blue-600'
    }
  },
  {
    id: 'pink-dark',
    name: 'Pink Dark',
    preview: {
      bg: 'bg-black',
      text: 'text-pink-500',
      accent: 'bg-pink-600'
    }
  }
] as const;

export default function ThemeModal() {
  const { theme, setTheme, isThemeModalOpen, setIsThemeModalOpen } = useTheme();

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/40 border border-blue-500/20 backdrop-blur-sm rounded-lg p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Choose Theme</h2>
          <button
            onClick={() => setIsThemeModalOpen(false)}
            className="text-blue-300 hover:text-blue-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsThemeModalOpen(false);
              }}
              className={`p-4 rounded-lg border transition-all ${
                theme === t.id
                  ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'border-blue-500/20 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Theme Preview */}
                <div className={`w-12 h-12 rounded-md ${t.preview.bg} flex items-center justify-center`}>
                  <div className={`w-6 h-6 rounded ${t.preview.accent}`} />
                </div>

                {/* Theme Info */}
                <div className="text-left">
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-sm text-blue-300">
                    {theme === t.id ? 'Currently active' : 'Click to activate'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 