"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"

const friends = [
  {
    id: "1",
    name: "CryptoWhale",
    username: "cryptowhale",
    wallet: "0x8a2f...7b3e",
    avatar: null,
    status: "online",
    trustScore: 100,
    tradesCompleted: 142,
    memberSince: "Jan 2024",
    lastActive: "Now",
    mutualFriends: 12,
  },
  {
    id: "2",
    name: "SkinMaster",
    username: "skinmaster_pro",
    wallet: "0x3c9d...2f4a",
    avatar: null,
    status: "online",
    trustScore: 98,
    tradesCompleted: 89,
    memberSince: "Mar 2024",
    lastActive: "2m ago",
    mutualFriends: 8,
  },
  {
    id: "3",
    name: "TraderJoe",
    username: "traderjoe",
    wallet: "0x1b7e...9c8d",
    avatar: null,
    status: "away",
    trustScore: 95,
    tradesCompleted: 234,
    memberSince: "Dec 2023",
    lastActive: "15m ago",
    mutualFriends: 5,
  },
  {
    id: "4",
    name: "KnifeCollector",
    username: "knife_collector",
    wallet: "0x5e4f...1a2b",
    avatar: null,
    status: "offline",
    trustScore: 100,
    tradesCompleted: 67,
    memberSince: "Feb 2024",
    lastActive: "2h ago",
    mutualFriends: 3,
  },
  {
    id: "5",
    name: "GloveGuru",
    username: "glove_guru",
    wallet: "0x9f2c...4d5e",
    avatar: null,
    status: "offline",
    trustScore: 92,
    tradesCompleted: 156,
    memberSince: "Nov 2023",
    lastActive: "1d ago",
    mutualFriends: 7,
  },
  {
    id: "6",
    name: "RareSkinHunter",
    username: "rareskins",
    wallet: "0x2d8a...6f7c",
    avatar: null,
    status: "online",
    trustScore: 97,
    tradesCompleted: 312,
    memberSince: "Oct 2023",
    lastActive: "Now",
    mutualFriends: 15,
  },
]

function FriendsContent() {
  const { isCollapsed } = useSidebar()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all")

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch =
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === "all") return matchesSearch
    if (filter === "online") return matchesSearch && (friend.status === "online" || friend.status === "away")
    if (filter === "offline") return matchesSearch && friend.status === "offline"
    return matchesSearch
  })

  const onlineCount = friends.filter(f => f.status === "online" || f.status === "away").length
  const offlineCount = friends.filter(f => f.status === "offline").length

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Friends</h1>
              <p className="text-muted-foreground">
                Manage your connections and start trading with trusted partners
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Friends</p>
                <p className="text-2xl font-bold text-foreground">{friends.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Online Now</p>
                <p className="text-2xl font-bold text-green-500">{onlineCount}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Mutual Trades</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search friends by name or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex bg-card border border-border rounded-lg p-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    filter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All ({friends.length})
                </button>
                <button
                  onClick={() => setFilter("online")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    filter === "online"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Online ({onlineCount})
                </button>
                <button
                  onClick={() => setFilter("offline")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    filter === "offline"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Offline ({offlineCount})
                </button>
              </div>
            </div>

            {/* Friends List */}
            <div className="space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar with Status */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-foreground">
                        {friend.name.charAt(0)}
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${
                          friend.status === "online"
                            ? "bg-green-500"
                            : friend.status === "away"
                            ? "bg-yellow-500"
                            : "bg-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-foreground truncate">{friend.name}</h3>
                        <span className="text-xs text-muted-foreground">@{friend.username}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          {friend.trustScore}% trust
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          {friend.tradesCompleted} trades
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {friend.mutualFriends} mutual
                        </span>
                      </div>
                    </div>

                    {/* Last Active */}
                    <div className="hidden md:block text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground">Last active</p>
                      <p className={`text-sm font-medium ${
                        friend.lastActive === "Now" ? "text-green-500" : "text-foreground"
                      }`}>
                        {friend.lastActive}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => router.push(`/messages?user=${friend.username}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredFriends.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">No friends found</h3>
                  <p className="text-muted-foreground text-sm">
                    {searchQuery ? "Try a different search term" : "Add some friends to get started"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function FriendsPage() {
  return (
    <SidebarProvider>
      <FriendsContent />
    </SidebarProvider>
  )
}
