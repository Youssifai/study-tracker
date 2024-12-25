'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { useTheme } from '@/app/providers/theme-provider';

export default function GroupActions() {
  const { theme } = useTheme();
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      const data = await response.json();
      router.push(`/group/${data.id}`);
    } catch (error) {
      console.error('Error creating group:', error);
      setError(error instanceof Error ? error.message : 'Failed to create group');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!inviteCode.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to join group');
      }

      const data = await response.json();
      router.push(`/group/${data.id}`);
    } catch (error) {
      console.error('Error joining group:', error);
      setError(error instanceof Error ? error.message : 'Failed to join group');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="p-4">
        <div className="flex flex-col items-center gap-4">
          {/* Icon and Title */}
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${
              theme === 'blue-dark' 
                ? 'bg-[rgb(111,142,255)]/20' 
                : 'bg-pink-500/20'
            }`}>
              <Users className={`w-5 h-5 ${
                theme === 'blue-dark' 
                  ? 'text-[rgb(111,142,255)]' 
                  : 'text-pink-500'
              }`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Join or Create a Study Group
              </h2>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex gap-4 w-full max-w-4xl">
            {/* Create Group Section */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className={`flex-1 px-3 py-2 rounded-lg border text-white placeholder-white/50 bg-black/40 ${
                  theme === 'blue-dark'
                    ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(111,142,255)]/50'
                    : 'border-pink-500/20 focus:border-pink-500/50'
                }`}
              />
              <button
                onClick={handleCreateGroup}
                disabled={isLoading || !groupName.trim()}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-all whitespace-nowrap ${
                  theme === 'blue-dark'
                    ? 'bg-[rgb(111,142,255)] hover:bg-[rgb(111,142,255)]/90'
                    : 'bg-pink-500 hover:bg-pink-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Create Group
              </button>
            </div>

            {/* Join Group Section */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
                className={`flex-1 px-3 py-2 rounded-lg border text-white placeholder-white/50 bg-black/40 ${
                  theme === 'blue-dark'
                    ? 'border-[rgb(111,142,255)]/20 focus:border-[rgb(111,142,255)]/50'
                    : 'border-pink-500/20 focus:border-pink-500/50'
                }`}
              />
              <button
                onClick={handleJoinGroup}
                disabled={isLoading || !inviteCode.trim()}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-all whitespace-nowrap ${
                  theme === 'blue-dark'
                    ? 'bg-[rgb(111,142,255)]/20 hover:bg-[rgb(111,142,255)]/30'
                    : 'bg-pink-500/20 hover:bg-pink-500/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Join Group
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-2 text-red-500 text-center text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}