"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { Button } from "@/components/ui/button"
import { FloatValueBar, getWearAbbr } from "@/components/item/float-value-bar"
import {
  Bell,
  BellOff,
  Trash2,
  TrendingDown,
  TrendingUp,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Eye,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

// Mock watchlist data
const mockWatchlist = [
  {
    id: "1",
    name: "AK-47 | Fire Serpent",
    rarity: "Covert",
    float: 0.089,
    currentPrice: 1850.00,
    previousPrice: 1920.00,
    lowestPrice: 1780.00,
    alertPrice: 1800.00,
    alertEnabled: true,
    imageUrl: "/ak47.png",
    addedAt: "3 days ago",
    priceChange24h: -3.6,
    listings: 24,
  },
  {
    id: "2",
    name: "M4A4 | Howl",
    rarity: "Contraband",
    float: 0.041,
    currentPrice: 2450.00,
    previousPrice: 2380.00,
    lowestPrice: 2200.00,
    alertPrice: 2300.00,
    alertEnabled: true,
    imageUrl: "/m4a4.png",
    addedAt: "1 week ago",
    priceChange24h: 2.9,
    listings: 8,
  },
  {
    id: "3",
    name: "Karambit | Fade",
    rarity: "Covert",
    float: 0.012,
    currentPrice: 1650.00,
    previousPrice: 1650.00,
    lowestPrice: 1580.00,
    alertPrice: null,
    alertEnabled: false,
    imageUrl: "/karambit.png",
    addedAt: "2 weeks ago",
    priceChange24h: 0,
    listings: 15,
  },
  {
    id: "4",
    name: "AWP | Dragon Lore",
    rarity: "Covert",
    float: 0.068,
    currentPrice: 4200.00,
    previousPrice: 4350.00,
    lowestPrice: 4100.00,
    alertPrice: 4000.00,
    alertEnabled: true,
    imageUrl: "/awp.png",
    addedAt: "5 days ago",
    priceChange24h: -3.4,
    listings: 5,
  },
]

function WatchlistContent() {
  const { isCollapsed } = useSidebar()
  const [items, setItems] = useState(mockWatchlist)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingAlert, setEditingAlert] = useState<string | null>(null)
  const [newAlertPrice, setNewAlertPrice] = useState("")

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalValue = items.reduce((sum, item) => sum + item.currentPrice, 0)
  const itemsWithAlerts = items.filter(item => item.alertEnabled).length
  const priceDrops = items.filter(item => item.priceChange24h < 0).length

  const toggleAlert = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, alertEnabled: !item.alertEnabled } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateAlertPrice = (id: string, price: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, alertPrice: price, alertEnabled: true } : item
    ))
    setEditingAlert(null)
    setNewAlertPrice("")
  }

  const rarityColors: Record<string, string> = {
    "Contraband": "border-l-amber-500",
    "Covert": "border-l-red-500",
    "Classified": "border-l-pink-500",
    "Restricted": "border-l-purple-500",
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Watchlist</h1>
              <p className="text-muted-foreground">
                Track items and get notified when prices drop
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Watching</p>
                <p className="text-2xl font-bold">{items.length} items</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-primary">{itemsWithAlerts}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Price Drops (24h)</p>
                <p className="text-2xl font-bold text-green-500">{priceDrops}</p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search watchlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Watchlist Items */}
            {filteredItems.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No items in watchlist</h3>
                <p className="text-muted-foreground mb-4">
                  Add items to your watchlist to track prices and get alerts
                </p>
                <Button asChild>
                  <Link href="/">Browse Market</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className={`bg-card border border-border rounded-lg overflow-hidden border-l-4 ${rarityColors[item.rarity] || "border-l-red-500"}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Item Image */}
                        <Link href={`/item/${item.id}`} className="shrink-0">
                          <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors">
                            <span className="text-xs text-muted-foreground">Item</span>
                          </div>
                        </Link>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/item/${item.id}`} className="hover:text-primary transition-colors">
                            <h3 className="font-medium truncate">{item.name}</h3>
                          </Link>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span>{getWearAbbr(item.float)} • {item.float.toFixed(4)}</span>
                            <span>{item.listings} listings</span>
                            <span>Added {item.addedAt}</span>
                          </div>
                          <div className="mt-2 max-w-xs">
                            <FloatValueBar float={item.float} showLabel={false} size="sm" />
                          </div>
                        </div>

                        {/* Price Info */}
                        <div className="text-right shrink-0">
                          <p className="text-xl font-bold">${item.currentPrice.toLocaleString()}</p>
                          <div className={`flex items-center justify-end gap-1 text-sm ${
                            item.priceChange24h > 0 ? "text-red-500" : item.priceChange24h < 0 ? "text-green-500" : "text-muted-foreground"
                          }`}>
                            {item.priceChange24h > 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : item.priceChange24h < 0 ? (
                              <TrendingDown className="h-3 w-3" />
                            ) : null}
                            <span>{item.priceChange24h > 0 ? "+" : ""}{item.priceChange24h}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Lowest: ${item.lowestPrice.toLocaleString()}
                          </p>
                        </div>

                        {/* Alert Settings */}
                        <div className="shrink-0 w-40">
                          {editingAlert === item.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                placeholder="Alert price"
                                value={newAlertPrice}
                                onChange={(e) => setNewAlertPrice(e.target.value)}
                                className="w-20 px-2 py-1 bg-input border border-border rounded text-sm"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => updateAlertPrice(item.id, parseFloat(newAlertPrice))}
                              >
                                Set
                              </Button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingAlert(item.id)
                                setNewAlertPrice(item.alertPrice?.toString() || "")
                              }}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                item.alertEnabled
                                  ? "bg-primary/10 text-primary border border-primary/30"
                                  : "bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <Bell className="h-3 w-3" />
                              {item.alertEnabled && item.alertPrice
                                ? `Alert: $${item.alertPrice.toLocaleString()}`
                                : "Set alert"}
                            </button>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <Button size="sm" asChild>
                            <Link href={`/item/${item.id}`}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Buy
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleAlert(item.id)}
                          >
                            {item.alertEnabled ? (
                              <Bell className="h-4 w-4 text-primary" />
                            ) : (
                              <BellOff className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function WatchlistPage() {
  return (
    <SidebarProvider>
      <WatchlistContent />
    </SidebarProvider>
  )
}
