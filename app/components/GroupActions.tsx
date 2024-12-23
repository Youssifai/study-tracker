'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';

export default function GroupActions() {
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
    <div className="w-full min-h-[200px] bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 w-[400px]">
        <div className="p-5">
          <div className="flex flex-col items-center gap-4">
            {/* Icon and Title */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Join or Create a Study Group
              </h2>
            </div>

            {/* Create Group Section */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="flex-1 px-3 py-1.5 text-sm border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <button
                  onClick={handleCreateGroup}
                  disabled={isLoading || !groupName.trim()}
                  className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>

              <div className="flex items-center w-full my-1">
                <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
                <span className="px-3 text-xs text-gray-500 dark:text-gray-400">or</span>
                <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
              </div>

              {/* Join Group Section */}
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter invite code"
                  className="flex-1 px-3 py-1.5 text-sm border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <button
                  onClick={handleJoinGroup}
                  disabled={isLoading || !inviteCode.trim()}
                  className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-xs text-red-500 dark:text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 