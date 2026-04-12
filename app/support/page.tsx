"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"

// FAQ Data organized by category
const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    questions: [
      {
        q: "How do I start trading on CS2 OTC?",
        a: "Connect your wallet, link your Steam account, and browse the marketplace. When you find an item you want, click 'Buy now' to initiate a trade. The platform will guide you through the escrow process."
      },
      {
        q: "What cryptocurrencies are supported?",
        a: "We support USDT, ETH, USDC, Base, Ethereum, Solana, Polygon, and Tron. You can filter listings by your preferred payment network."
      },
      {
        q: "How do I list my CS2 skins for sale?",
        a: "Go to your Inventory, select the items you want to sell, click 'List item', set your price in your preferred cryptocurrency, and confirm. Your items will appear on the marketplace immediately."
      }
    ]
  },
  {
    id: "security",
    name: "Security & Escrow",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    questions: [
      {
        q: "How does escrow protect my trade?",
        a: "Escrow locks the buyer's payment before the seller sends the Steam trade offer. Funds are only released after Steam delivery is verified by our backend. This eliminates the trust problem in OTC trades."
      },
      {
        q: "What is Steam verification?",
        a: "After sending a Steam trade offer, paste the offer ID on our platform. Our system verifies the trade was completed successfully before releasing funds to the seller."
      },
      {
        q: "What if the seller doesn't send the item?",
        a: "If the seller fails to deliver within the timeframe, you can escalate to support. We'll review the case and refund your escrowed funds if the seller is at fault."
      },
      {
        q: "Is my wallet information secure?",
        a: "We never store your private keys. All transactions are signed locally on your device. We only store your public wallet address for transaction tracking."
      }
    ]
  },
  {
    id: "fees",
    name: "Fees & Payments",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    questions: [
      {
        q: "What are the marketplace fees?",
        a: "We charge a 3% fee on successful trades, deducted from the seller's proceeds. Buyers pay the listed price with no additional fees. Network gas fees apply separately."
      },
      {
        q: "When do I receive my payment as a seller?",
        a: "Funds are released immediately after Steam delivery is verified. The net amount (listing price minus 3% fee) is sent directly to your connected wallet."
      },
      {
        q: "Can I get a refund?",
        a: "If a trade is cancelled before Steam delivery, escrowed funds are returned to the buyer automatically. For disputes after delivery, escalate to support for review."
      }
    ]
  },
  {
    id: "disputes",
    name: "Disputes & Issues",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    questions: [
      {
        q: "How do I open a dispute?",
        a: "Go to My Trades, select the problematic trade, and click 'Escalate to support'. Provide details about the issue. Our team reviews disputes within 24 hours."
      },
      {
        q: "What evidence should I provide?",
        a: "Include the trade ID, screenshots of Steam trade history, any chat logs with the counterparty, and a clear description of what went wrong."
      },
      {
        q: "How long does dispute resolution take?",
        a: "Most disputes are resolved within 24-48 hours. Complex cases involving Steam API verification may take up to 72 hours."
      }
    ]
  }
]

// Issue types for support form
const issueTypes = [
  { value: "trade-issue", label: "Trade Issue", description: "Problem with an active or completed trade" },
  { value: "payment", label: "Payment Problem", description: "Funds not received, wrong amount, or escrow issue" },
  { value: "account", label: "Account & Verification", description: "Steam linking, wallet connection, or profile issues" },
  { value: "technical", label: "Technical Bug", description: "Platform errors, UI issues, or unexpected behavior" },
  { value: "other", label: "Other", description: "General questions or feedback" }
]

function SupportContent() {
  const { isCollapsed } = useSidebar()
  const [activeCategory, setActiveCategory] = useState("getting-started")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  
  // Form state
  const [issueType, setIssueType] = useState("")
  const [tradeId, setTradeId] = useState("")
  const [priority, setPriority] = useState("normal")
  const [message, setMessage] = useState("")

  // Filter FAQs by search
  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0)

  const totalResults = filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-sm font-medium tracking-wider uppercase">Support Center</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                How can we help you?
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Find answers in our FAQ or contact support for trade disputes, payment issues, and account help.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for answers... (e.g., escrow, fees, dispute)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {searchQuery && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {totalResults} results
                </span>
              )}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
              
              {/* Category Sidebar */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-muted-foreground tracking-wider uppercase px-3 mb-3">
                  Categories
                </h3>
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setSearchQuery("")
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      activeCategory === category.id && !searchQuery
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === category.id && !searchQuery
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {category.questions.length}
                    </span>
                  </button>
                ))}

                {/* Contact Support Button */}
                <div className="pt-4 mt-4 border-t border-border">
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      showForm
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {showForm ? "Hide Form" : "Contact Support"}
                  </button>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="space-y-6">
                {!showForm ? (
                  <>
                    {/* Active Category Title */}
                    {!searchQuery && (
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">
                          {faqCategories.find(c => c.id === activeCategory)?.name}
                        </h2>
                      </div>
                    )}

                    {/* Search Results or Category Questions */}
                    <div className="space-y-3">
                      {(searchQuery ? filteredCategories : faqCategories.filter(c => c.id === activeCategory)).map((category) => (
                        <div key={category.id} className="space-y-3">
                          {searchQuery && (
                            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                              {category.icon}
                              {category.name}
                            </h3>
                          )}
                          {category.questions.map((item, idx) => {
                            const questionId = `${category.id}-${idx}`
                            const isExpanded = expandedQuestion === questionId
                            
                            return (
                              <div
                                key={questionId}
                                className="bg-card border border-border rounded-xl overflow-hidden"
                              >
                                <button
                                  onClick={() => setExpandedQuestion(isExpanded ? null : questionId)}
                                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                                >
                                  <span className="font-medium text-foreground pr-4">{item.q}</span>
                                  <svg
                                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {isExpanded && (
                                  <div className="px-4 pb-4 text-muted-foreground leading-relaxed border-t border-border pt-3">
                                    {item.a}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}

                      {searchQuery && totalResults === 0 && (
                        <div className="text-center py-12">
                          <svg className="h-12 w-12 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
                          <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 text-primary hover:underline"
                          >
                            Contact support instead
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Still need help? */}
                    {!searchQuery && (
                      <div className="bg-card border border-border rounded-xl p-6 mt-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">Still need help?</h3>
                              <p className="text-sm text-muted-foreground">Our support team responds within 24 hours</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowForm(true)}
                            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                          >
                            Open Support Ticket
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Support Form */
                  <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Contact Support</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe your issue and we&apos;ll get back to you within 24 hours
                      </p>
                    </div>

                    {/* Issue Type */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">What do you need help with?</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {issueTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setIssueType(type.value)}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              issueType === type.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50 hover:bg-secondary/50"
                            }`}
                          >
                            <span className={`font-medium ${issueType === type.value ? "text-primary" : "text-foreground"}`}>
                              {type.label}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Trade ID (conditional) */}
                    {(issueType === "trade-issue" || issueType === "payment") && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Trade ID (optional)</label>
                        <input
                          type="text"
                          placeholder="e.g., 69ceeb8319965b91bf8bb249"
                          value={tradeId}
                          onChange={(e) => setTradeId(e.target.value)}
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        />
                        <p className="text-xs text-muted-foreground">Find this in My Trades or the trade URL</p>
                      </div>
                    )}

                    {/* Priority */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Priority</label>
                      <div className="flex gap-2">
                        {[
                          { value: "normal", label: "Normal", color: "text-muted-foreground" },
                          { value: "high", label: "High", color: "text-yellow-500" },
                          { value: "urgent", label: "Urgent", color: "text-red-500" }
                        ].map((p) => (
                          <button
                            key={p.value}
                            onClick={() => setPriority(p.value)}
                            className={`flex-1 py-2.5 rounded-lg font-medium transition-all border ${
                              priority === p.value
                                ? p.value === "urgent"
                                  ? "border-red-500 bg-red-500/10 text-red-500"
                                  : p.value === "high"
                                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                                  : "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-muted-foreground"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                      {priority === "urgent" && (
                        <p className="text-xs text-red-400">Use urgent only for active trades at risk of loss</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Describe your issue</label>
                      <textarea
                        placeholder="Please provide as much detail as possible. Include trade IDs, wallet addresses, screenshots if relevant, and what you've already tried..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Be specific to get faster help</span>
                        <span>{message.length}/2000</span>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">Before submitting, verify that:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <svg className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Steam trade URL points to the correct account
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Item details and token match the listing
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You understand funds lock in escrow before delivery
                        </li>
                      </ul>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setShowForm(false)}
                        className="px-5 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!issueType || !message.trim()}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default function SupportPage() {
  return (
    <SidebarProvider>
      <SupportContent />
    </SidebarProvider>
  )
}
