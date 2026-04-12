"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"

// Icons
const OverviewIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const InboxIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
)

const DisputeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const ActivityIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
)

const tabs = [
  { id: "overview", label: "Overview", icon: OverviewIcon },
  { id: "settings", label: "Fee Settings", icon: SettingsIcon },
  { id: "support", label: "Support Inbox", icon: InboxIcon, badge: 3 },
  { id: "disputes", label: "Disputes", icon: DisputeIcon, badge: 0 },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "activity", label: "Activity Log", icon: ActivityIcon },
]

// Mock data
const supportTickets = [
  {
    id: "1",
    subject: "Trade support: MP9 | Sand Dashed (Battle-Scarred)",
    user: "mocha",
    tradeId: "69CEEB8319965B91BF8BB249",
    priority: "urgent",
    status: "open",
    unread: 1,
    updatedAt: "3 days ago",
    messages: [
      { sender: "mocha", message: "Yooo", time: "3 days ago", isUser: true },
      { sender: "Support System", message: "Support request received. A live operator can reply in this thread as soon as it is picked up.", time: "3 days ago", isUser: false },
    ]
  },
  {
    id: "2",
    subject: "Payment not received after confirmation",
    user: "trader_pro",
    tradeId: "A1B2C3D4E5F6G7H8I9J0",
    priority: "high",
    status: "open",
    unread: 0,
    updatedAt: "1 day ago",
    messages: [
      { sender: "trader_pro", message: "I confirmed the trade but haven't received my payment yet. It's been 2 hours.", time: "1 day ago", isUser: true },
    ]
  },
  {
    id: "3",
    subject: "Question about fees",
    user: "newbie123",
    tradeId: null,
    priority: "normal",
    status: "closed",
    unread: 0,
    updatedAt: "5 days ago",
    messages: [
      { sender: "newbie123", message: "How do the seller fees work?", time: "5 days ago", isUser: true },
      { sender: "Admin", message: "The marketplace charges a 5% fee on seller proceeds. This is deducted automatically when the trade settles.", time: "5 days ago", isUser: false },
    ]
  },
]

const disputes = [
  {
    id: "1",
    tradeId: "XYZ123456789",
    item: "AK-47 | Redline (Field-Tested)",
    buyer: "buyer_one",
    seller: "seller_two",
    amount: "45.00 USDT",
    reason: "Item not delivered",
    status: "pending",
    createdAt: "2 hours ago",
  },
]

const recentUsers = [
  { id: "1", name: "mocha", wallet: "0x31b7...95bd", trades: 156, volume: "$12,450", status: "active", joined: "Nov 2021" },
  { id: "2", name: "trader_pro", wallet: "0x8a2f...3c1d", trades: 89, volume: "$8,230", status: "active", joined: "Jan 2022" },
  { id: "3", name: "newbie123", wallet: "0x5e7c...9f2a", trades: 3, volume: "$120", status: "active", joined: "Apr 2026" },
  { id: "4", name: "skin_master", wallet: "0x1d4b...7e8c", trades: 432, volume: "$45,670", status: "active", joined: "Mar 2020" },
  { id: "5", name: "banned_user", wallet: "0x9c3a...2f1b", trades: 12, volume: "$890", status: "banned", joined: "Feb 2023" },
]

const activityLog = [
  { id: "1", action: "Fee updated", details: "Changed marketplace fee from 3% to 5%", admin: "admin", time: "09.04.2026, 02:24:43" },
  { id: "2", action: "Dispute resolved", details: "Trade #ABC123 - Refunded buyer", admin: "admin", time: "08.04.2026, 15:30:00" },
  { id: "3", action: "User banned", details: "banned_user - Multiple fraud attempts", admin: "admin", time: "07.04.2026, 11:22:15" },
  { id: "4", action: "Support ticket closed", details: "Ticket #45 - Question about fees", admin: "admin", time: "06.04.2026, 09:15:00" },
]

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Volume (24h)</p>
          <p className="text-2xl font-bold text-foreground mt-1">$24,580</p>
          <p className="text-xs text-green-500 mt-1">+12.5% from yesterday</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Trades</p>
          <p className="text-2xl font-bold text-foreground mt-1">47</p>
          <p className="text-xs text-muted-foreground mt-1">12 pending confirmation</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Open Tickets</p>
          <p className="text-2xl font-bold text-primary mt-1">3</p>
          <p className="text-xs text-red-500 mt-1">1 urgent</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Disputes</p>
          <p className="text-2xl font-bold text-foreground mt-1">1</p>
          <p className="text-xs text-yellow-500 mt-1">Requires attention</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Support Tickets */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Support Tickets</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-3">
            {supportTickets.slice(0, 3).map((ticket) => (
              <div key={ticket.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{ticket.subject}</p>
                  <p className="text-xs text-muted-foreground">{ticket.user} - {ticket.updatedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  {ticket.priority === "urgent" && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-red-500/20 text-red-400 rounded">URGENT</span>
                  )}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                    ticket.status === "open" ? "bg-blue-500/20 text-blue-400" : "bg-muted text-muted-foreground"
                  }`}>
                    {ticket.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Disputes */}
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active Disputes</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          {disputes.length > 0 ? (
            <div className="space-y-3">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="p-3 bg-secondary/50 rounded-lg border-l-2 border-yellow-500">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{dispute.item}</p>
                    <span className="text-sm font-medium text-primary">{dispute.amount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {dispute.buyer} vs {dispute.seller} - {dispute.reason}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Trade #{dispute.tradeId}</span>
                    <span className="text-xs text-yellow-500">{dispute.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <DisputeIcon />
              <p className="mt-2">No active disputes right now.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent Admin Activity</h3>
          <span className="text-xs text-primary cursor-pointer hover:underline">View full log</span>
        </div>
        <div className="space-y-2">
          {activityLog.slice(0, 4).map((log) => (
            <div key={log.id} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{log.action}: <span className="text-muted-foreground">{log.details}</span></p>
              </div>
              <p className="text-xs text-muted-foreground flex-shrink-0">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeeSettingsTab() {
  const [feePercent, setFeePercent] = useState("5.00")

  return (
    <div className="max-w-2xl">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <SettingsIcon />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Marketplace Fee</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage the seller-side commission used in pricing previews and trade snapshots.
            </p>
          </div>
        </div>

        {/* Current Fee Display */}
        <div className="bg-secondary/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Fee</span>
            <span className="text-xs text-muted-foreground">Updated 09.04.2026, 02:24:43</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-foreground">5%</span>
            <span className="text-muted-foreground">seller-side commission</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Escrow Runtime</p>
              <p className="font-semibold text-foreground">V1</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">On-Chain Fee</p>
              <p className="font-semibold text-foreground">Not synced yet</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Last changed by: 76561199078797375</p>
        </div>

        {/* Update Fee */}
        <div className="space-y-4">
          <label className="text-xs text-muted-foreground uppercase tracking-wider">New Fee Percent</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            <input
              type="text"
              value={feePercent}
              onChange={(e) => setFeePercent(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Allowed range: 0% to 20%. Values are stored with precision up to 2 decimals.
          </p>
          <button className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Save fee settings
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-400">
            Current escrow contract does not yet split the fee on-chain by itself. This admin setting already drives pricing previews and trade snapshots, but automatic on-chain withholding still requires a contract upgrade.
          </p>
        </div>
      </div>
    </div>
  )
}

function SupportInboxTab() {
  const [selectedTicket, setSelectedTicket] = useState<typeof supportTickets[0] | null>(supportTickets[0])
  const [filter, setFilter] = useState<"open" | "all" | "closed">("open")
  const [replyText, setReplyText] = useState("")

  const filteredTickets = supportTickets.filter(t => 
    filter === "all" ? true : t.status === filter
  )

  return (
    <div className="flex gap-6 h-[calc(100vh-220px)]">
      {/* Ticket List */}
      <div className="w-80 flex-shrink-0 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          {(["open", "all", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedTicket?.id === ticket.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-foreground line-clamp-2 pr-2">{ticket.subject}</p>
                {ticket.unread > 0 && (
                  <span className="px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">
                    {ticket.unread} new
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{ticket.user}</p>
              <div className="flex items-center gap-2">
                {ticket.priority === "urgent" && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-red-500/20 text-red-400 rounded">URGENT</span>
                )}
                {ticket.priority === "high" && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded">HIGH</span>
                )}
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                  ticket.status === "open" ? "bg-blue-500/20 text-blue-400" : "bg-muted text-muted-foreground"
                }`}>
                  {ticket.status.toUpperCase()}
                </span>
              </div>
              {ticket.tradeId && (
                <p className="text-xs text-muted-foreground mt-2 font-mono">TRADE {ticket.tradeId}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">Updated {ticket.updatedAt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Detail */}
      {selectedTicket ? (
        <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedTicket.subject}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedTicket.user}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedTicket.priority === "urgent" && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded">URGENT</span>
                )}
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  selectedTicket.status === "open" ? "bg-blue-500/20 text-blue-400" : "bg-muted text-muted-foreground"
                }`}>
                  {selectedTicket.status.toUpperCase()}
                </span>
              </div>
            </div>
            {selectedTicket.tradeId && (
              <p className="text-xs text-muted-foreground mt-2 font-mono">TRADE {selectedTicket.tradeId}</p>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedTicket.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  msg.isUser 
                    ? "bg-secondary border border-border" 
                    : "bg-primary/10 border border-primary/20"
                }`}>
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-foreground">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          {selectedTicket.status === "open" && (
            <div className="p-4 border-t border-border">
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Reply to Support Thread</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write an operator response, ask for more evidence or confirm the resolution."
                className="w-full h-24 p-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex items-center gap-3 mt-3">
                <button className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send reply
                </button>
                <button className="px-6 py-2.5 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark resolved
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 bg-card border border-border rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Select a ticket to view details</p>
        </div>
      )}
    </div>
  )
}

function DisputesTab() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
            <DisputeIcon />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Disputes</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review active disputed trades and resolve them on-chain.
            </p>
          </div>
        </div>

        {disputes.length > 0 ? (
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="bg-secondary/50 border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                      <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{dispute.item}</p>
                      <p className="text-xs text-muted-foreground font-mono">Trade #{dispute.tradeId}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-primary">{dispute.amount}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Buyer</p>
                    <p className="text-sm text-foreground">{dispute.buyer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Seller</p>
                    <p className="text-sm text-foreground">{dispute.seller}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Reason</p>
                    <p className="text-sm text-foreground">{dispute.reason}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Opened {dispute.createdAt}</span>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg hover:bg-green-500/30 transition-colors">
                      Release to Seller
                    </button>
                    <button className="px-4 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 transition-colors">
                      Refund Buyer
                    </button>
                    <button className="px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
              <DisputeIcon />
            </div>
            <p className="text-muted-foreground">No active disputes right now.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function UsersTab() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = recentUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.wallet.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by username or wallet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">User</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">Wallet</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">Trades</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">Volume</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">Joined</th>
              <th className="text-right text-xs text-muted-foreground uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground font-mono">{user.wallet}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{user.trades}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{user.volume}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                    user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{user.joined}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className={`p-1.5 transition-colors ${
                      user.status === "banned" ? "text-green-500 hover:text-green-400" : "text-red-500 hover:text-red-400"
                    }`}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ActivityLogTab() {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Admin Activity Log</h3>
        <p className="text-sm text-muted-foreground mt-1">Track all administrative actions performed on the platform.</p>
      </div>
      <div className="divide-y divide-border">
        {activityLog.map((log) => (
          <div key={log.id} className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors">
            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{log.action}</span>
                <span className="text-muted-foreground"> - {log.details}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">by {log.admin}</p>
            </div>
            <p className="text-xs text-muted-foreground flex-shrink-0">{log.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminContent() {
  const { isCollapsed } = useSidebar()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <p className="text-muted-foreground">
              Manage marketplace settings, resolve disputes, and handle support requests.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 border-b border-border overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                }`}
              >
                <tab.icon />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "settings" && <FeeSettingsTab />}
          {activeTab === "support" && <SupportInboxTab />}
          {activeTab === "disputes" && <DisputesTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "activity" && <ActivityLogTab />}
        </main>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <SidebarProvider>
      <AdminContent />
    </SidebarProvider>
  )
}
