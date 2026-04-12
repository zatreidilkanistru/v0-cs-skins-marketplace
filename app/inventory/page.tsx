"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { InventoryHeader } from "@/components/inventory/inventory-header"
import { InventoryFilters } from "@/components/inventory/inventory-filters"
import { InventoryGrid } from "@/components/inventory/inventory-grid"

export default function InventoryPage() {
  const [selectedTier, setSelectedTier] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("tier")

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex">
        <SidebarNav />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopHeader />
          <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 min-w-0 order-2 lg:order-1">
                  <InventoryHeader />
                  <InventoryFilters 
                    selectedTier={selectedTier}
                    onTierChange={setSelectedTier}
                  />
                  <InventoryGrid 
                    selectedTier={selectedTier}
                    searchQuery={searchQuery}
                  />
                </div>
                
                {/* Right Sidebar */}
                <div className="w-full lg:w-72 flex-shrink-0 space-y-4 order-1 lg:order-2 lg:sticky lg:top-0">
                  {/* Search */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                      Search Inventory
                    </label>
                    <div className="relative">
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
                        placeholder="Search by item name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-2 block">
                      Sort Order
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                      </div>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="tier">Tier first</option>
                        <option value="name">Name A-Z</option>
                        <option value="recent">Recently added</option>
                        <option value="value">Highest value</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Showing count */}
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="text-foreground font-medium">100</span> / 100
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
