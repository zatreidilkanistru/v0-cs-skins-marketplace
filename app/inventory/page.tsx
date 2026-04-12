"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { InventoryHeader } from "@/components/inventory/inventory-header"
import { InventoryFilters } from "@/components/inventory/inventory-filters"
import { InventoryGrid } from "@/components/inventory/inventory-grid"

function InventoryContent() {
  const [selectedTier, setSelectedTier] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("tier")
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Inventory</h1>
            <p className="text-muted-foreground">
              Scan synced Steam assets, filter quickly and list in one click.
            </p>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left Content */}
            <div className="flex-1 min-w-0">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">
                    Total Items
                  </div>
                  <div className="text-3xl font-bold text-foreground">100</div>
                </div>
                <div className="p-4 rounded-lg bg-card border-2 border-primary">
                  <div className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">
                    Ready to List
                  </div>
                  <div className="text-3xl font-bold text-foreground">100</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">
                    Top Tier
                  </div>
                  <div className="text-3xl font-bold text-foreground">2</div>
                </div>
              </div>

              {/* Tier Filters */}
              <InventoryFilters 
                selectedTier={selectedTier}
                onTierChange={setSelectedTier}
              />

              {/* Items Grid */}
              <InventoryGrid 
                selectedTier={selectedTier}
                searchQuery={searchQuery}
              />
            </div>

            {/* Right Sidebar */}
            <div className="w-full xl:w-64 flex-shrink-0 space-y-4">
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
        </main>
      </div>
    </div>
  )
}

export default function InventoryPage() {
  return (
    <SidebarProvider>
      <InventoryContent />
    </SidebarProvider>
  )
}
