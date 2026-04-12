"use client"

import { Shield, CheckCircle, Clock, AlertTriangle, History } from "lucide-react"

interface TradesHeaderProps {
  activeTab: "active" | "history"
  setActiveTab: (tab: "active" | "history") => void
}

const stats = [
  { label: "Active Trades", value: 5, icon: Shield, color: "text-primary" },
  { label: "Verified Delivery", value: 0, icon: CheckCircle, color: "text-green-500" },
  { label: "Pending Confirmations", value: 5, icon: Clock, color: "text-yellow-500" },
  { label: "Disputes", value: 0, icon: AlertTriangle, color: "text-red-500" },
  { label: "History", value: 4, icon: History, color: "text-muted-foreground" },
]

export function TradesHeader({ activeTab, setActiveTab }: TradesHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="flex items-center gap-3 flex-wrap">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg"
          >
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="text-sm font-semibold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "active"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Active (5)
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "history"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          History (4)
        </button>
      </div>
    </div>
  )
}
