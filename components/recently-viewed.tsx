"use client"

import { Clock } from "lucide-react"
import Link from "next/link"
import { getWearAbbr } from "@/components/item/float-value-bar"

interface RecentItem {
  id: string
  name: string
  rarity: string
  float: number
  price: number
  viewedAt: string
  image: string
}

const mockRecentItems: RecentItem[] = [
  { id: "1", name: "AK-47 | Fire Serpent", rarity: "Covert", float: 0.089, price: 1850, viewedAt: "5 min ago", image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UZkNmj2cY6RclNrMl_V-Fm4wuvuhZS6uMzKySBku3Z04Q/256fx256f" },
  { id: "2", name: "M4A4 | Howl", rarity: "Contraband", float: 0.041, price: 2450, viewedAt: "15 min ago", image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UY5NjvxcNSUdQc2ZA7TqVa4wuu5gMK0uM7LnXA17iIi5XrZln-JuONZ/256fx256f" },
  { id: "3", name: "Karambit | Fade", rarity: "Covert", float: 0.012, price: 1650, viewedAt: "1 hour ago", image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl4G0k_jkI7fUhFRB4MRij7j--YXygED6uxJuNTj1JoOXdgM3NwnR_gK3xunugZPvvMidnXVmu3Un4HuMnxa1hhhJcKUx0qcPf1y-/256fx256f" },
  { id: "4", name: "AWP | Dragon Lore", rarity: "Covert", float: 0.068, price: 4200, viewedAt: "2 hours ago", image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-KmsjwPKvBmm5u5cB1g_zMu4702QGwqkRkMm7ydY_BdwY5aA6C-QO3yOa9g5-_vpXKzHo1vyV0-z-DyPKK/256fx256f" },
  { id: "5", name: "Glock-18 | Fade", rarity: "Restricted", float: 0.023, price: 890, viewedAt: "3 hours ago", image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJnY6PnvD7DLbUkmJE5Yt0j7jC8d73jFGxqkFrYjumJI-VJgJoZVmE-QLrl-jugJPvuZ_Xm3NlviR0-z-DyPKKJBDv/256fx256f" },
]

const rarityColors: Record<string, string> = {
  "Contraband": "border-t-amber-500",
  "Covert": "border-t-red-500",
  "Classified": "border-t-pink-500",
  "Restricted": "border-t-purple-500",
  "Mil-Spec": "border-t-blue-500",
}

export function RecentlyViewed() {
  if (mockRecentItems.length === 0) return null

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Recently Viewed</h2>
        </div>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Clear all
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {mockRecentItems.map(item => (
          <Link
            key={item.id}
            href={`/item/${item.id}`}
            className={`shrink-0 w-44 bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors border-t-2 ${rarityColors[item.rarity] || rarityColors["Covert"]}`}
          >
            <div className="aspect-square bg-secondary/30 flex items-center justify-center p-3">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {getWearAbbr(item.float)} • {item.float.toFixed(3)}
                </span>
              </div>
              <p className="text-sm font-semibold text-primary mt-1">${item.price.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{item.viewedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
