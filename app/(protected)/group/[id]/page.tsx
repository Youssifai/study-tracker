'use client';

import { useEffect, useState } from 'react';
import { Edit2, X, Crown, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface Member {
  id: string;
  name: string;
}

interface GroupStats {
  todayStats: Array<{
    userId: string;
    userName: string;
    todayTime: number;
    monthlyTime: number;
  }>;
  monthlyStats: Array<{
    userId: string;
    userName: string;
    todayTime: number;
    monthlyTime: number;
  }>;
  groupTotals: {
    totalMinutes: number;
    averageMinutesPerMember: number;
    memberCount: number;
  };
}

interface Group {
  id: string;
  name: string;
  inviteCode: string;
  ownerId: string;
  members: Member[];
  owner: {
    id: string;
    name: string;
  };
}

interface MemberWithStats {
  userId: string;
  userName: string;
  todayTime: number;
  monthlyTime: number;
  isOwner: boolean;
}

export default function GroupPage({ params }: { params: { id: string } }) {
  const [group, setGroup] = useState<Group | null>(null);
  const [groupStats, setGroupStats] = useState<GroupStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchGroup();
    fetchGroupStats();

    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(fetchGroupStats, 30000);

    return () => clearInterval(refreshInterval);
  }, [params.id]);

  const fetchGroup = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/groups/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch group');
      }

      const data = await response.json();
      setGroup(data);
      setNewGroupName(data.name);
    } catch (error) {
      console.error('Error fetching group:', error);
      setError(error instanceof Error ? error.message : 'Failed to load group');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroupStats = async () => {
    try {
      const response = await fetch(`/api/groups/${params.id}/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch group stats');
      }
      const data = await response.json();
      setGroupStats(data);
    } catch (error) {
      console.error('Error fetching group stats:', error);
    }
  };

  const updateGroupName = async () => {
    if (!group || !newGroupName.trim()) return;

    try {
      const response = await fetch(`/api/groups/${group.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newGroupName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update group name');
      }

      setGroup({ ...group, name: newGroupName });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating group name:', error);
      setError(error instanceof Error ? error.message : 'Failed to update group name');
    }
  };

  const removeMember = async (memberId: string) => {
    if (!group) return;

    try {
      const response = await fetch(`/api/groups/${group.id}/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove member');
      }

      setGroup({
        ...group,
        members: group.members.filter(member => member.id !== memberId),
      });
    } catch (error) {
      console.error('Error removing member:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove member');
    }
  };

  const getMemberWithStats = (member: Member): MemberWithStats => {
    const stats = groupStats?.todayStats?.find(stat => stat.userId === member.id);
    return {
      userId: member.id,
      userName: member.name,
      todayTime: stats?.todayTime || 0,
      monthlyTime: stats?.monthlyTime || 0,
      isOwner: member.id === group?.ownerId
    };
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="p-6">
        <div className="text-red-500 dark:text-red-400">{error || 'Failed to load group'}</div>
      </div>
    );
  }

  const isOwner = session?.user?.email === group.ownerId;

  return (
    <div className="p-6">
      {/* Centered Group Header */}
      <div className="mb-8 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Users className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="px-3 py-1 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
              <button
                onClick={updateGroupName}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewGroupName(group.name);
                }}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{group.name}</h1>
              {isOwner && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <Edit2 size={18} />
                </button>
              )}
            </div>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Invite Code: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{group.inviteCode}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Members List */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Members</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {group.members.length > 0 ? (
                group.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between px-4 py-2 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-gray-100">{member.name}</span>
                      {member.id === group.ownerId && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    {isOwner && member.id !== group.ownerId && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-1 text-gray-500 dark:text-gray-400"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500 dark:text-gray-400">No members found</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Stats and Leaderboard */}
        <div className="space-y-6">
          {/* Monthly Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Monthly Leaderboard</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {groupStats?.monthlyStats.map((stat, index) => (
                <div
                  key={stat.userId}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-gray-100">{stat.userName}</span>
                      {index === 0 && stat.monthlyTime > 0 && (
                        <Crown className="w-5 h-5 text-yellow-500" />
                      )}
                      {stat.userId === group.ownerId && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          Owner
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">
                      {Math.floor(stat.monthlyTime / 60)}h {Math.round(stat.monthlyTime % 60)}m
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 ml-1">this month</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Today's Activity</h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {groupStats?.todayStats.map((stat, index) => (
                <div
                  key={stat.userId}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-gray-100">{stat.userName}</span>
                      {index === 0 && stat.todayTime > 0 && (
                        <Crown className="w-5 h-5 text-yellow-500" />
                      )}
                      {stat.userId === group.ownerId && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          Owner
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">
                      {Math.floor(stat.todayTime / 60)}h {Math.round(stat.todayTime % 60)}m
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 ml-1">today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 