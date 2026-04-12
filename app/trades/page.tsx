"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { TradesHeader } from "@/components/trades/trades-header"
import { TradesList } from "@/components/trades/trades-list"
import { TradeDetail } from "@/components/trades/trade-detail"

export default function TradesPage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active")
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <main className="flex-1 p-6 overflow-auto">
          <TradesHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex gap-6 mt-6">
            <div className={`${selectedTradeId ? "w-1/2" : "w-full"} transition-all duration-300`}>
              <TradesList 
                activeTab={activeTab} 
                selectedTradeId={selectedTradeId}
                onSelectTrade={setSelectedTradeId}
              />
            </div>
            
            {selectedTradeId && (
              <div className="w-1/2 transition-all duration-300">
                <TradeDetail 
                  tradeId={selectedTradeId} 
                  onClose={() => setSelectedTradeId(null)}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
