"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download,
  Filter,
  Calendar,
  ChevronDown,
  ExternalLink,
  FileText,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Transaction = {
  id: string
  type: "purchase" | "sale" | "deposit" | "withdrawal" | "offer_received" | "offer_sent"
  item?: {
    name: string
    image: string
    wear?: string
  }
  amount: number
  token: string
  fee?: number
  status: "completed" | "pending" | "failed" | "cancelled"
  counterparty?: string
  txHash?: string
  date: string
}

const transactions: Transaction[] = [
  {
    id: "tx-001",
    type: "purchase",
    item: { name: "AK-47 | Redline", image: "/placeholder.svg", wear: "Field-Tested" },
    amount: 45.50,
    token: "USDT",
    fee: 0,
    status: "completed",
    counterparty: "SkinMaster",
    txHash: "0x1234...5678",
    date: "2026-04-12T14:30:00Z"
  },
  {
    id: "tx-002",
    type: "sale",
    item: { name: "M4A4 | Howl", image: "/placeholder.svg", wear: "Minimal Wear" },
    amount: 2850.00,
    token: "ETH",
    fee: 142.50,
    status: "completed",
    counterparty: "CryptoTrader",
    txHash: "0x5678...9abc",
    date: "2026-04-11T10:15:00Z"
  },
  {
    id: "tx-003",
    type: "deposit",
    amount: 500.00,
    token: "USDC",
    status: "completed",
    txHash: "0x9abc...def0",
    date: "2026-04-10T08:45:00Z"
  },
  {
    id: "tx-004",
    type: "withdrawal",
    amount: 1200.00,
    token: "USDT",
    fee: 2.50,
    status: "pending",
    txHash: "0xdef0...1234",
    date: "2026-04-09T16:20:00Z"
  },
  {
    id: "tx-005",
    type: "offer_received",
    item: { name: "Karambit | Doppler", image: "/placeholder.svg", wear: "Factory New" },
    amount: 1100.00,
    token: "USDT",
    status: "cancelled",
    counterparty: "KnifeCollector",
    date: "2026-04-08T12:00:00Z"
  },
  {
    id: "tx-006",
    type: "purchase",
    item: { name: "AWP | Dragon Lore", image: "/placeholder.svg", wear: "Battle-Scarred" },
    amount: 3200.00,
    token: "ETH",
    fee: 0,
    status: "completed",
    counterparty: "LegendaryTrader",
    txHash: "0x4567...89ab",
    date: "2026-04-07T09:30:00Z"
  },
  {
    id: "tx-007",
    type: "sale",
    item: { name: "Glock-18 | Fade", image: "/placeholder.svg", wear: "Factory New" },
    amount: 890.00,
    token: "USDC",
    fee: 44.50,
    status: "completed",
    counterparty: "PistolPro",
    txHash: "0x89ab...cdef",
    date: "2026-04-06T15:45:00Z"
  },
  {
    id: "tx-008",
    type: "deposit",
    amount: 2000.00,
    token: "ETH",
    status: "completed",
    txHash: "0xcdef...0123",
    date: "2026-04-05T11:00:00Z"
  },
]

function HistoryContent() {
  const { isCollapsed } = useSidebar()
  const [filter, setFilter] = useState<"all" | "purchases" | "sales" | "deposits" | "withdrawals">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("all")

  const filteredTransactions = transactions.filter(tx => {
    if (filter === "purchases") return tx.type === "purchase"
    if (filter === "sales") return tx.type === "sale"
    if (filter === "deposits") return tx.type === "deposit"
    if (filter === "withdrawals") return tx.type === "withdrawal"
    return true
  }).filter(tx => {
    if (!searchQuery) return true
    return tx.item?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tx.counterparty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tx.txHash?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "purchase":
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "sale":
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "offer_received":
        return <ArrowDownLeft className="h-4 w-4 text-primary" />
      case "offer_sent":
        return <ArrowUpRight className="h-4 w-4 text-primary" />
    }
  }

  const getTypeLabel = (type: Transaction["type"]) => {
    switch (type) {
      case "purchase": return "Purchase"
      case "sale": return "Sale"
      case "deposit": return "Deposit"
      case "withdrawal": return "Withdrawal"
      case "offer_received": return "Offer Received"
      case "offer_sent": return "Offer Sent"
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    const styles = {
      completed: "bg-green-500/20 text-green-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      failed: "bg-red-500/20 text-red-400",
      cancelled: "bg-muted text-muted-foreground"
    }
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const totalVolume = transactions
    .filter(tx => tx.status === "completed" && (tx.type === "purchase" || tx.type === "sale"))
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalFees = transactions
    .filter(tx => tx.status === "completed" && tx.fee)
    .reduce((sum, tx) => sum + (tx.fee || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Transaction History</h1>
                <p className="text-muted-foreground text-sm">
                  View all your purchases, sales, deposits and withdrawals
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Invoice
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Transactions</p>
                <p className="text-2xl font-bold mt-1">{transactions.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Trade Volume</p>
                <p className="text-2xl font-bold mt-1">${totalVolume.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Fees Paid</p>
                <p className="text-2xl font-bold mt-1">${totalFees.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-bold mt-1 text-green-500">
                  {transactions.filter(tx => tx.status === "completed").length}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by item, user, or transaction hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-2.5 bg-card border border-border rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">All Time</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="1y">Last Year</option>
                  </select>
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-border pb-4 overflow-x-auto">
              {[
                { key: "all", label: "All" },
                { key: "purchases", label: "Purchases" },
                { key: "sales", label: "Sales" },
                { key: "deposits", label: "Deposits" },
                { key: "withdrawals", label: "Withdrawals" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as typeof filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Transactions Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 bg-secondary/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div>Transaction</div>
                <div className="text-right">Amount</div>
                <div className="text-center">Status</div>
                <div className="text-right">Date</div>
                <div className="w-8"></div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredTransactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-4 items-center hover:bg-secondary/30 transition-colors"
                  >
                    {/* Transaction Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        {tx.item ? (
                          <img 
                            src={tx.item.image} 
                            alt={tx.item.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          getTypeIcon(tx.type)
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(tx.type)}
                          <span className="font-medium truncate">
                            {tx.item ? tx.item.name : getTypeLabel(tx.type)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {tx.item?.wear && <span>{tx.item.wear} • </span>}
                          {tx.counterparty && <span>with {tx.counterparty}</span>}
                          {tx.txHash && !tx.counterparty && <span>{tx.txHash}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className={`font-medium ${
                        tx.type === "purchase" || tx.type === "withdrawal" || tx.type === "offer_sent"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}>
                        {tx.type === "purchase" || tx.type === "withdrawal" || tx.type === "offer_sent" ? "-" : "+"}
                        ${tx.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">{tx.token}</div>
                      {tx.fee !== undefined && tx.fee > 0 && (
                        <div className="text-xs text-muted-foreground">Fee: ${tx.fee}</div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      {getStatusBadge(tx.status)}
                    </div>

                    {/* Date */}
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(tx.date)}
                    </div>

                    {/* Action */}
                    <div>
                      {tx.txHash && (
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransactions.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  No transactions found
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function HistoryPage() {
  return (
    <SidebarProvider>
      <HistoryContent />
    </SidebarProvider>
  )
}
