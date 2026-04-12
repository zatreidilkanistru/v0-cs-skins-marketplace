"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Wallet, 
  Send, 
  ArrowLeftRight, 
  Download, 
  Plus,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Check,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

type Token = {
  symbol: string
  name: string
  icon: string
  color: string
  amount: number
  value: number
  change: number
  network?: string
  verified?: boolean
}

const tokens: Token[] = [
  { 
    symbol: "ETH", 
    name: "Ethereum", 
    icon: "◇", 
    color: "#627EEA",
    amount: 0.0089, 
    value: 21.34, 
    change: -3.1,
    network: "6 networks",
    verified: true
  },
  { 
    symbol: "USDT", 
    name: "Tether", 
    icon: "₮", 
    color: "#26A17B",
    amount: 156.42, 
    value: 156.42, 
    change: 0,
    verified: true
  },
  { 
    symbol: "USDC", 
    name: "USD Coin", 
    icon: "$", 
    color: "#2775CA",
    amount: 89.50, 
    value: 89.50, 
    change: 0,
    verified: true
  },
  { 
    symbol: "MATIC", 
    name: "Polygon", 
    icon: "⬡", 
    color: "#8247E5",
    amount: 31.4853, 
    value: 12.60, 
    change: -5.2,
    verified: true
  },
  { 
    symbol: "SOL", 
    name: "Solana", 
    icon: "◎", 
    color: "#14F195",
    amount: 0.234, 
    value: 8.42, 
    change: +12.4,
    verified: true
  },
  { 
    symbol: "AVAX", 
    name: "Avalanche", 
    icon: "▲", 
    color: "#E84142",
    amount: 0.113, 
    value: 1.02, 
    change: -4,
    verified: true
  },
]

export function WalletDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"tokens" | "collections">("tokens")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalBalance = tokens.reduce((sum, token) => sum + token.value, 0)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - Balance Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-full hover:bg-secondary transition-colors"
      >
        <Wallet className="h-4 w-4 text-primary" />
        <span className="font-medium">${totalBalance.toFixed(2)}</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          {/* User Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold">
                M
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">МОЧА</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  1 wallet <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Total Balance */}
            <div className="mt-4">
              <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </div>
                <span className="text-xs">Send</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
                <span className="text-xs">Swap</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Download className="h-4 w-4" />
                </div>
                <span className="text-xs">Deposit</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="h-4 w-4" />
                </div>
                <span className="text-xs">Buy</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("tokens")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "tokens"
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tokens
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "collections"
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Collections
            </button>
          </div>

          {/* Token List */}
          <div className="max-h-80 overflow-y-auto">
            {activeTab === "tokens" ? (
              <div className="divide-y divide-border">
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    {/* Token Icon */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: token.color }}
                    >
                      {token.icon}
                    </div>

                    {/* Token Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{token.name}</span>
                        {token.verified && (
                          <Check className="h-3.5 w-3.5 text-primary" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {token.network || `${token.amount.toLocaleString()} ${token.symbol}`}
                      </div>
                    </div>

                    {/* Value & Change */}
                    <div className="text-right">
                      <div className="font-medium">${token.value.toFixed(2)}</div>
                      <div className={`text-xs flex items-center justify-end gap-0.5 ${
                        token.change > 0 ? "text-green-500" : 
                        token.change < 0 ? "text-red-500" : "text-muted-foreground"
                      }`}>
                        {token.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : token.change < 0 ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : null}
                        {token.change > 0 ? "+" : ""}{token.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-sm">No collections yet</p>
                <p className="text-xs mt-1">Your NFT collections will appear here</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <Link
              href="/history"
              className="flex items-center justify-center gap-2 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View transaction history
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
