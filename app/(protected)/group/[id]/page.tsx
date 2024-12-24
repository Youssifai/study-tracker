'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Users, UserMinus, Copy, Check, Crown, Pencil, X } from 'lucide-react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface Member {
  id: string;
  name: string;
  email: string;
  image: string | null;
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
}

interface Group {
  id: string;
  name: string;
  inviteCode: string;
  members: Member[];
  ownerId: string;
}

export default function GroupPage() {
  const params = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [groupStats, setGroupStats] = useState<GroupStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
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
      const response = await fetch(`/api/groups/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch group');
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
      if (!response.ok) throw new Error('Failed to fetch group stats');
      const data = await response.json();
      setGroupStats(data);
    } catch (error) {
      console.error('Error fetching group stats:', error);
    }
  };

  const handleCopyInviteCode = async () => {
    if (!group?.inviteCode) return;
    try {
      await navigator.clipboard.writeText(group.inviteCode);
      setCopied(true);
      toast.success('Invite code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy invite code:', error);
      toast.error('Failed to copy invite code');
    }
  };

  const handleLeaveGroup = async () => {
    if (!confirm('Are you sure you want to leave this group?')) return;

    try {
      const response = await fetch(`/api/groups/${params.id}/leave`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to leave group');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error leaving group:', error);
      toast.error('Failed to leave group');
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

      if (!response.ok) throw new Error('Failed to update group name');
      setGroup({ ...group, name: newGroupName });
      setIsEditing(false);
      toast.success('Group name updated successfully');
    } catch (error) {
      console.error('Error updating group name:', error);
      toast.error('Failed to update group name');
    }
  };

  const handleKickMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;

    try {
      const response = await fetch(`/api/groups/${group?.id}/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove member');
      await fetchGroup();
      toast.success('Member removed successfully');
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove member');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-white mb-4">Error</h2>
        <p className="text-[rgb(157,178,255)]/70">{error || 'Failed to load group'}</p>
      </div>
    );
  }

  const isOwner = session?.user?.email === group.ownerId;

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[rgb(111,142,255)]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="px-3 py-2 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg text-white focus:outline-none focus:border-[rgb(111,142,255)]/50"
                />
                <button
                  onClick={updateGroupName}
                  className="px-3 py-2 bg-[rgb(157,178,255)] hover:bg-[rgb(157,178,255)]/90 text-white rounded-lg transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewGroupName(group.name);
                  }}
                  className="px-3 py-2 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-[rgb(157,178,255)]">
                  {group.name}
                </h1>
                {isOwner && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)] transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                )}
              </>
            )}
          </div>
          <button
            onClick={handleLeaveGroup}
            className="px-4 py-2 bg-black/40 border border-[rgb(111,142,255)]/20 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)] rounded-lg transition-all flex items-center gap-2"
          >
            <UserMinus size={20} />
            Leave Group
          </button>
        </div>

        {/* Invite Code Section */}
        <div className="bg-black/40 border border-[rgb(111,142,255)]/20 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-[0_0_15px_rgba(111,142,255,0.15)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Invite Code</h2>
              <p className="text-[rgb(157,178,255)]/70">Share this code with others to invite them to your group</p>
            </div>
            <button
              onClick={handleCopyInviteCode}
              className={`px-4 py-2 text-white rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(107,139,251,0.3)] ${
                'bg-[#6b8bfb] hover:bg-[#6b8bfb]/90'
              }`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="mt-4 p-3 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg">
            <code className="text-[rgb(157,178,255)] font-mono">{group.inviteCode}</code>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Members */}
          <div className="bg-black/40 border border-[rgb(111,142,255)]/20 backdrop-blur-sm rounded-lg p-6 shadow-[0_0_15px_rgba(111,142,255,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-[rgb(157,178,255)]" />
              <h2 className="text-xl font-semibold text-white">Group Members</h2>
            </div>
            <div className="grid gap-4">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg group"
                >
                  <div className="flex items-center gap-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[rgb(157,178,255)]/20 flex items-center justify-center">
                        <span className="text-[rgb(157,178,255)]">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{member.name}</h3>
                      {member.id === group.ownerId && (
                        <Crown className="w-4 h-4 text-[rgb(157,178,255)]" />
                      )}
                    </div>
                  </div>
                  {isOwner && member.id !== group.ownerId && (
                    <button
                      onClick={() => handleKickMember(member.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[rgb(157,178,255)]/70 hover:text-[rgb(157,178,255)] transition-all"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            {/* Monthly Leaderboard */}
            <div className="bg-black/40 border border-[rgb(111,142,255)]/20 backdrop-blur-sm rounded-lg p-6 shadow-[0_0_15px_rgba(111,142,255,0.15)]">
              <h2 className="text-xl font-semibold text-white mb-6">Monthly Leaderboard</h2>
              <div className="space-y-4">
                {groupStats?.monthlyStats.map((stat, index) => (
                  <div
                    key={stat.userId}
                    className="flex items-center justify-between p-4 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white">{stat.userName}</span>
                      {index === 0 && stat.monthlyTime > 0 && (
                        <Crown className="w-4 h-4 text-[rgb(157,178,255)]" />
                      )}
                    </div>
                    <div className="text-[rgb(157,178,255)]/70">
                      {Math.floor(stat.monthlyTime / 60)}h {Math.round(stat.monthlyTime % 60)}m
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Activity */}
            <div className="bg-black/40 border border-[rgb(111,142,255)]/20 backdrop-blur-sm rounded-lg p-6 shadow-[0_0_15px_rgba(111,142,255,0.15)]">
              <h2 className="text-xl font-semibold text-white mb-6">Today's Activity</h2>
              <div className="space-y-4">
                {groupStats?.todayStats.map((stat, index) => (
                  <div
                    key={stat.userId}
                    className="flex items-center justify-between p-4 bg-black/40 border border-[rgb(111,142,255)]/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white">{stat.userName}</span>
                      {index === 0 && stat.todayTime > 0 && (
                        <Crown className="w-4 h-4 text-[rgb(157,178,255)]" />
                      )}
                    </div>
                    <div className="text-[rgb(157,178,255)]/70">
                      {Math.floor(stat.todayTime / 60)}h {Math.round(stat.todayTime % 60)}m
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}