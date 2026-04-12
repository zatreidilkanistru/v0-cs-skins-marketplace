"use client"

import { useState } from "react"
import { Search, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const favoriteItems = [
  {
    id: 1,
    name: "Karambit | Doppler",
    condition: "Factory New",
    price: "850 USDT",
    rarity: "covert",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5S0mOfhMqrCqWdQ689j3uyP9I6i3gCy-0VqYzvyI4LHcw85Zl_R_FO5yO2-hMC5u52ayiA3sic8pSGK_UPlBA/256fx256f",
  },
  {
    id: 2,
    name: "AK-47 | Wild Lotus",
    condition: "Minimal Wear",
    price: "3,200 USDT",
    rarity: "covert",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV0tO7k4-0m_7zO6_ummpD78Av2ujFotyh2wXi_RU5YG3xcoGdcQdtNV-D8wDrlOvvgpXvvZqbyHBrvCcis3mLyRW1iB4evuNv1PaaFqJUf0I/256fx256f",
  },
  {
    id: 3,
    name: "M4A1-S | Printstream",
    condition: "Factory New",
    price: "180 USDT",
    rarity: "covert",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mr-ZkvPLPu_Qx3hu5Mx2gv2Prd_z0VHl_kBrYGrzddKWJAE6YF6G_Vi3k7u6gJ64v5vMyXFm7j5iuyiShVKpwUYbaeMhm7XAHi-b6WRO/256fx256f",
  },
]

const rarityColors: Record<string, string> = {
  covert: "border-t-red-500",
  classified: "border-t-pink-500",
  restricted: "border-t-purple-500",
  uncommon: "border-t-blue-400",
  common: "border-t-gray-400",
}

export function FavoritesTab() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Favorite Items
          </p>
          <p className="text-3xl font-bold text-foreground">{favoriteItems.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search favorites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      {/* Favorites Grid - Sharp corners */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {favoriteItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group relative bg-card border border-border transition-all hover:border-primary/50 cursor-pointer",
              "border-t-2",
              rarityColors[item.rarity]
            )}
          >
            {/* Favorite Icon */}
            <button className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1.5 opacity-100 transition-opacity">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </button>

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
              <p className="mt-1 text-sm font-semibold text-primary">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
