"use client"

import Image from "next/image"
import { CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"

interface TradesListProps {
  activeTab: "active" | "history"
  selectedTradeId: string | null
  onSelectTrade: (id: string | null) => void
}

type TradeStatus = "escrow_locked" | "steam_verified" | "pending_confirmation" | "completed" | "refunded" | "disputed"

interface Trade {
  id: string
  item: {
    name: string
    wear: string
    image: string
  }
  price: number
  currency: string
  role: "buyer" | "seller"
  status: TradeStatus
  currentStep: number
  totalSteps: number
  counterparty: string
  createdAt: string
  nextAction?: string
}

const activeTrades: Trade[] = [
  {
    id: "1",
    item: { name: "MP9 | Sand Dashed", wear: "Battle-Scarred", image: "/placeholder.svg?height=60&width=80" },
    price: 12,
    currency: "USDT",
    role: "seller",
    status: "steam_verified",
    currentStep: 2,
    totalSteps: 4,
    counterparty: "0x8f2a...4c21",
    createdAt: "2 hours ago",
    nextAction: "Send Steam offer",
  },
  {
    id: "2",
    item: { name: "M4A4 | Mainframe", wear: "Minimal Wear", image: "/placeholder.svg?height=60&width=80" },
    price: 12,
    currency: "USDT",
    role: "seller",
    status: "escrow_locked",
    currentStep: 1,
    totalSteps: 4,
    counterparty: "0x3b7c...9e12",
    createdAt: "5 hours ago",
    nextAction: "Awaiting buyer",
  },
  {
    id: "3",
    item: { name: "5 Year Veteran Coin", wear: "", image: "/placeholder.svg?height=60&width=80" },
    price: 1.4,
    currency: "USDT",
    role: "buyer",
    status: "pending_confirmation",
    currentStep: 3,
    totalSteps: 4,
    counterparty: "0x1d4e...7f33",
    createdAt: "1 day ago",
    nextAction: "Confirm receipt",
  },
  {
    id: "4",
    item: { name: "Revolution Case", wear: "", image: "/placeholder.svg?height=60&width=80" },
    price: 2,
    currency: "USDT",
    role: "seller",
    status: "escrow_locked",
    currentStep: 1,
    totalSteps: 4,
    counterparty: "0x9a2f...5b88",
    createdAt: "2 days ago",
    nextAction: "Awaiting escrow",
  },
  {
    id: "5",
    item: { name: "AK-47 | Slate", wear: "Factory New", image: "/placeholder.svg?height=60&width=80" },
    price: 8.5,
    currency: "USDT",
    role: "buyer",
    status: "steam_verified",
    currentStep: 2,
    totalSteps: 4,
    counterparty: "0x5c8d...2a77",
    createdAt: "3 days ago",
    nextAction: "Awaiting delivery",
  },
]

const historyTrades: Trade[] = [
  {
    id: "h1",
    item: { name: "AWP | Asiimov", wear: "Field-Tested", image: "/placeholder.svg?height=60&width=80" },
    price: 45,
    currency: "USDT",
    role: "seller",
    status: "completed",
    currentStep: 4,
    totalSteps: 4,
    counterparty: "0x7e1a...3d99",
    createdAt: "1 week ago",
  },
  {
    id: "h2",
    item: { name: "Glock-18 | Fade", wear: "Factory New", image: "/placeholder.svg?height=60&width=80" },
    price: 320,
    currency: "USDT",
    role: "buyer",
    status: "completed",
    currentStep: 4,
    totalSteps: 4,
    counterparty: "0x2c4b...8e55",
    createdAt: "2 weeks ago",
  },
  {
    id: "h3",
    item: { name: "USP-S | Kill Confirmed", wear: "Minimal Wear", image: "/placeholder.svg?height=60&width=80" },
    price: 28,
    currency: "USDT",
    role: "seller",
    status: "refunded",
    currentStep: 4,
    totalSteps: 4,
    counterparty: "0x4f9c...1a22",
    createdAt: "3 weeks ago",
  },
  {
    id: "h4",
    item: { name: "Karambit | Doppler", wear: "Factory New", image: "/placeholder.svg?height=60&width=80" },
    price: 890,
    currency: "USDT",
    role: "buyer",
    status: "completed",
    currentStep: 4,
    totalSteps: 4,
    counterparty: "0x6d3e...7c44",
    createdAt: "1 month ago",
  },
]

const statusConfig: Record<TradeStatus, { label: string; color: string; bgColor: string; icon: typeof CheckCircle }> = {
  escrow_locked: { label: "Escrow Locked", color: "text-blue-400", bgColor: "bg-blue-500/10", icon: Clock },
  steam_verified: { label: "Steam Verified", color: "text-green-400", bgColor: "bg-green-500/10", icon: CheckCircle },
  pending_confirmation: { label: "Pending Confirmation", color: "text-yellow-400", bgColor: "bg-yellow-500/10", icon: Clock },
  completed: { label: "Completed", color: "text-green-400", bgColor: "bg-green-500/10", icon: CheckCircle },
  refunded: { label: "Refunded", color: "text-muted-foreground", bgColor: "bg-muted", icon: AlertCircle },
  disputed: { label: "Disputed", color: "text-red-400", bgColor: "bg-red-500/10", icon: AlertCircle },
}

export function TradesList({ activeTab, selectedTradeId, onSelectTrade }: TradesListProps) {
  const trades = activeTab === "active" ? activeTrades : historyTrades

  return (
    <div className="space-y-2">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-4">Item</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-1"></div>
      </div>

      {/* Trade Rows */}
      <div className="space-y-1">
        {trades.map((trade) => {
          const status = statusConfig[trade.status]
          const StatusIcon = status.icon
          const isSelected = selectedTradeId === trade.id

          return (
            <button
              key={trade.id}
              onClick={() => onSelectTrade(isSelected ? null : trade.id)}
              className={`w-full grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg transition-all text-left ${
                isSelected
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-card border border-border hover:bg-secondary/50 hover:border-primary/20"
              }`}
            >
              {/* Item */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="relative w-14 h-10 bg-secondary/50 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={trade.item.image}
                    alt={trade.item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {trade.item.name}
                  </p>
                  {trade.item.wear && (
                    <p className="text-xs text-muted-foreground truncate">
                      {trade.item.wear}
                    </p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2">
                <p className="text-sm font-semibold text-foreground">
                  {trade.price} {trade.currency}
                </p>
              </div>

              {/* Role */}
              <div className="col-span-2">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                  trade.role === "seller" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-blue-500/10 text-blue-400"
                }`}>
                  {trade.role === "seller" ? "Selling" : "Buying"}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-3.5 w-3.5 ${status.color}`} />
                  <span className={`text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                {trade.nextAction && activeTab === "active" && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    Next: {trade.nextAction}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <div className="col-span-1 flex justify-end">
                <ChevronRight className={`h-4 w-4 transition-transform ${
                  isSelected ? "rotate-90 text-primary" : "text-muted-foreground"
                }`} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
