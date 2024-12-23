import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Users } from "lucide-react";

interface Group {
  id: string;
  name: string;
  ownerId: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  users: {
    id: string;
    name: string;
    email: string;
  }[];
}

export default function GroupBar() {
  const { data: session } = useSession();
  const [group, setGroup] = useState<Group | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch group data when component mounts
  const fetchGroup = async () => {
    try {
      const response = await fetch("/api/groups");
      const data = await response.json();
      if (data) {
        setGroup(data);
      }
    } catch (error) {
      console.error("Failed to fetch group:", error);
    }
  };

  // Handle leaving group
  const handleLeaveGroup = async () => {
    if (!confirm("Are you sure you want to leave this group?")) return;

    try {
      const response = await fetch("/api/groups/leave", {
        method: "POST",
      });

      if (response.ok) {
        setGroup(null);
        setIsMenuOpen(false);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to leave group");
      }
    } catch (error) {
      console.error("Failed to leave group:", error);
      alert("Failed to leave group");
    }
  };

  // If user is not in a group, don't render anything
  if (!group) return null;

  const isOwner = group.ownerId === session?.user?.id;

  return (
    <div className="w-full flex justify-center py-2">
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-full hover:bg-gray-700 transition-colors"
        >
          <Users size={16} />
          <span>Part of @{group.name}</span>
          <ChevronDown size={16} />
        </button>

        {isMenuOpen && (
          <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            {isOwner ? (
              <Link
                href={`/group/${group.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Group
              </Link>
            ) : (
              <button
                onClick={handleLeaveGroup}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Leave Group
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 