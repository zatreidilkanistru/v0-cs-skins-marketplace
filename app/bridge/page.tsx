"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"

const tokens = [
  { id: "usdc", name: "USDC", icon: "💵" },
  { id: "usdt", name: "USDT", icon: "💲" },
  { id: "eth", name: "ETH", icon: "⟠" },
  { id: "apt", name: "APT", icon: "◎" },
]

const networks = [
  { id: "ethereum", name: "Ethereum", icon: "⟠" },
  { id: "aptos", name: "Aptos", icon: "◎" },
  { id: "polygon", name: "Polygon", icon: "⬡" },
  { id: "arbitrum", name: "Arbitrum", icon: "🔷" },
  { id: "bsc", name: "BSC", icon: "🟡" },
]

const recentTransactions = [
  { id: 1, from: "Ethereum", to: "Aptos", amount: "500 USDC", status: "completed", time: "2 min ago" },
  { id: 2, from: "Polygon", to: "Ethereum", amount: "1,200 USDT", status: "completed", time: "15 min ago" },
  { id: 3, from: "BSC", to: "Arbitrum", amount: "0.5 ETH", status: "pending", time: "1 hour ago" },
]

function BridgeContent() {
  const { isCollapsed } = useSidebar()
  const [bridgeType, setBridgeType] = useState<"cross" | "intra">("cross")
  const [fromToken, setFromToken] = useState("usdc")
  const [toToken, setToToken] = useState("usdc")
  const [fromNetwork, setFromNetwork] = useState("aptos")
  const [toNetwork, setToNetwork] = useState("ethereum")
  const [amount, setAmount] = useState("")
  const [feeType, setFeeType] = useState<"native" | "stable">("native")
  const [speed, setSpeed] = useState<"v2fast" | "v2norm" | "v1">("v1")
  const [privacyMode, setPrivacyMode] = useState(false)

  const walletConnected = true
  const walletAddress = "0x31b79...195bd"
  const fromBalance = "1,250.00"
  const toBalance = "0.000000"

  const fees = {
    v2fast: { cost: "1.233700", bps: "0", duration: "15 seconds" },
    v2norm: { cost: "1.233700", bps: "0", duration: "15 minutes" },
    v1: { cost: "1.233700", bps: "0", duration: "8 seconds" },
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Bridge</h1>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">BETA</span>
              </div>
              <p className="text-muted-foreground">Transfer tokens across different blockchain networks securely</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Bridge Card */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {/* Tabs */}
                  <div className="flex border-b border-border">
                    <button
                      onClick={() => setBridgeType("cross")}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        bridgeType === "cross" 
                          ? "text-foreground border-b-2 border-primary bg-primary/5" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Cross Chain
                    </button>
                    <button
                      onClick={() => setBridgeType("intra")}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        bridgeType === "intra" 
                          ? "text-foreground border-b-2 border-primary bg-primary/5" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Intra Chain
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Top Controls */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => setPrivacyMode(!privacyMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                          privacyMode ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Privacy
                        <div className={`w-8 h-4 rounded-full transition-colors ${privacyMode ? "bg-primary-foreground/30" : "bg-muted"}`}>
                          <div className={`w-3 h-3 rounded-full bg-foreground transition-transform mt-0.5 ${privacyMode ? "ml-4" : "ml-0.5"}`} />
                        </div>
                      </button>
                      
                      {walletConnected ? (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-foreground font-medium">{walletAddress}</span>
                        </div>
                      ) : (
                        <button className="px-4 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                          Connect
                        </button>
                      )}
                    </div>

                    {/* FROM Section */}
                    <div className="bg-secondary/50 rounded-lg p-4 mb-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider">Token</label>
                            <select
                              value={fromToken}
                              onChange={(e) => setFromToken(e.target.value)}
                              className="block mt-1 bg-card border border-border rounded-lg px-3 py-2 text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              {tokens.map(t => (
                                <option key={t.id} value={t.id}>{t.icon} {t.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider">Network</label>
                            <select
                              value={fromNetwork}
                              onChange={(e) => setFromNetwork(e.target.value)}
                              className="block mt-1 bg-card border border-border rounded-lg px-3 py-2 text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              {networks.map(n => (
                                <option key={n.id} value={n.id}>{n.icon} {n.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Balance</span>
                          <p className="text-foreground font-medium">{fromBalance}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors">
                          MAX
                        </button>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="flex-1 bg-transparent text-2xl font-bold text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-3 relative z-10">
                      <button 
                        onClick={() => {
                          const tempNetwork = fromNetwork
                          setFromNetwork(toNetwork)
                          setToNetwork(tempNetwork)
                        }}
                        className="p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
                      >
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </div>

                    {/* TO Section */}
                    <div className="bg-secondary/50 rounded-lg p-4 mt-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider">Token</label>
                            <select
                              value={toToken}
                              onChange={(e) => setToToken(e.target.value)}
                              className="block mt-1 bg-card border border-border rounded-lg px-3 py-2 text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              {tokens.map(t => (
                                <option key={t.id} value={t.id}>{t.icon} {t.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-wider">Network</label>
                            <select
                              value={toNetwork}
                              onChange={(e) => setToNetwork(e.target.value)}
                              className="block mt-1 bg-card border border-border rounded-lg px-3 py-2 text-foreground font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              {networks.map(n => (
                                <option key={n.id} value={n.id}>{n.icon} {n.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Balance</span>
                          <p className="text-foreground font-medium">{toBalance}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">
                        {amount || "0"}
                      </div>
                    </div>

                    {/* Relayer Fee */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">Relayer fee in:</span>
                        <div className="flex bg-secondary rounded-lg p-1">
                          <button
                            onClick={() => setFeeType("native")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                              feeType === "native" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                          >
                            Native
                          </button>
                          <button
                            onClick={() => setFeeType("stable")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                              feeType === "stable" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                          >
                            Stable
                          </button>
                        </div>
                      </div>

                      {/* Speed Options */}
                      <div className="grid grid-cols-3 gap-3">
                        {(["v2fast", "v2norm", "v1"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => setSpeed(s)}
                            className={`p-3 rounded-lg border text-left transition-colors ${
                              speed === s 
                                ? "border-primary bg-primary/10" 
                                : "border-border bg-card hover:border-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">
                                {s === "v2fast" ? "V2 Fast" : s === "v2norm" ? "V2 Norm" : "V1"}
                              </span>
                              {speed === s && (
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <p className="text-lg font-bold text-foreground">{fees[s].cost}</p>
                            <p className="text-xs text-muted-foreground">APT</p>
                            <p className="text-xs text-primary mt-1">Est. {fees[s].duration}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bridge Button */}
                    <button className="w-full mt-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                      {walletConnected ? "Bridge Tokens" : "Connect Wallet"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Transaction Details */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        Gas on destination
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-sm text-muted-foreground">Not available</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        Fees
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-sm text-primary font-medium">0.000048 + 1.233700 APT</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        Minimum Received
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-sm text-foreground font-medium">0 USDC</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        Points to Earn
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-sm text-primary font-medium">0 points</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        Mint Allowance
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-sm text-foreground font-medium">99,302,049.33 USDC</span>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${tx.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`} />
                          <div>
                            <p className="text-sm text-foreground">{tx.from} → {tx.to}</p>
                            <p className="text-xs text-muted-foreground">{tx.time}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    View All Transactions
                  </button>
                </div>

                {/* Connect Wallet */}
                <button className="w-full py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors border border-border">
                  Connect Another Wallet
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function BridgePage() {
  return (
    <SidebarProvider>
      <BridgeContent />
    </SidebarProvider>
  )
}
