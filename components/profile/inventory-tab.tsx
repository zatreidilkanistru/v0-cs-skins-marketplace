"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tierFilters = [
  { id: "all", label: "ALL TIERS", count: 100 },
  { id: "ancient", label: "ANCIENT", count: 1 },
  { id: "mythical", label: "MYTHICAL", count: 1 },
  { id: "rare", label: "RARE", count: 8 },
  { id: "uncommon", label: "UNCOMMON", count: 8 },
  { id: "common", label: "COMMON", count: 82 },
]

const inventoryItems = [
  {
    id: 1,
    name: "AK-47 | Redline",
    condition: "Field-Tested",
    rarity: "classified",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UZkNmj2cY6RclNrMl_V-Fm4wuvuhZS6uMzKySBku3Z04Q/256fx256f",
  },
  {
    id: 2,
    name: "M4A4 | Mainframe",
    condition: "Minimal Wear",
    rarity: "uncommon",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_kVvamHzcoWVJgQ7ZFzW_ADqw-u5hcC0tZ_Im3swvyFxsSnbnhS_gx9SLrs4b4HYHQ/256fx256f",
  },
  {
    id: 3,
    name: "AWP | Asiimov",
    condition: "Battle-Scarred",
    rarity: "covert",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-KmsjwPKvBmm5u5cB1g_zMu4702QGwqkRkMm7ydY_BdwY5aA6C-QO3yOa9g5-_vpXKzHo1vyV24ynfnRSzhxpLbeZrxavI/256fx256f",
  },
  {
    id: 4,
    name: "Desert Eagle | Blaze",
    condition: "Factory New",
    rarity: "restricted",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7du6kb-FlvD1DLfYkWNFpsRz3-rHpdjt0FXm_xFtazr2I4KQIQ9vZl6B_1m3wu7t1pC9tZSfnXNgvCkh4XqLnBKp1hxJcKUx0ohqEBaL/256fx256f",
  },
  {
    id: 5,
    name: "USP-S | Kill Confirmed",
    condition: "Minimal Wear",
    rarity: "covert",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09ulq5WYh8j_OrfdqWhe5sN4mOTE8NWmjgPmqUU4Nj3zcoTEelJtZFHVrAS2yee500-puoOJlyXo3xQxZXE/256fx256f",
  },
  {
    id: 6,
    name: "Glock-18 | Fade",
    condition: "Factory New",
    rarity: "restricted",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJnY6PnvD7DLbUkmJE5Yt0j7jC8d73jFGxqkFrYjumJI-VJgJoZVmE-QLrl-jugJPvuZ_Xm3NlviR0-z-DyPKKJBDv/256fx256f",
  },
]

const rarityColors: Record<string, string> = {
  covert: "border-t-red-500",
  classified: "border-t-pink-500",
  restricted: "border-t-purple-500",
  uncommon: "border-t-blue-400",
  common: "border-t-gray-400",
}

export function InventoryTab() {
  const [activeTier, setActiveTier] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="pt-2">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Inventory Items
          </p>
          <p className="text-3xl font-bold text-foreground mt-1">100</p>
        </div>
        <Button variant="outline" className="border-border">
          Open inventory
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by item name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tierFilters.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors",
                activeTier === tier.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {tier.label}
              <span className={cn(
                "tabular-nums",
                activeTier === tier.id ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {tier.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid - Sharp corners as requested */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {inventoryItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group relative bg-card border border-border transition-all hover:border-primary/50 cursor-pointer",
              "border-t-2",
              rarityColors[item.rarity]
            )}
          >
            {/* Image Container */}
            <div className="aspect-square bg-secondary/30 p-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain transition-transform group-hover:scale-105"
              />
            </div>

            {/* Item Info */}
            <div className="border-t border-border p-3">
              <p className="truncate text-sm font-medium text-foreground">
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground">{item.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
