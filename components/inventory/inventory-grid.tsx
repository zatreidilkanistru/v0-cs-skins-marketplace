"use client"

import { CheckCircle } from "lucide-react"

interface InventoryGridProps {
  selectedTier: string
  searchQuery: string
}

const tierColors: Record<string, { border: string; text: string; bg: string }> = {
  ancient: { border: "border-t-red-500", text: "text-red-500", bg: "bg-red-500/10" },
  mythical: { border: "border-t-purple-500", text: "text-purple-500", bg: "bg-purple-500/10" },
  rare: { border: "border-t-pink-500", text: "text-pink-500", bg: "bg-pink-500/10" },
  uncommon: { border: "border-t-blue-400", text: "text-blue-400", bg: "bg-blue-400/10" },
  common: { border: "border-t-gray-400", text: "text-gray-400", bg: "bg-gray-400/10" },
}

const inventoryItems = [
  {
    id: "33665194385",
    name: "Music Kit | Valve, CS:GO",
    tier: "ancient",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQznaKcJGgStYjgxdnewfGmZb6DxW8AupV12-rE94qh0Vfs80c4YW6hddSLdA46MwzS-wC5wOe60J7u75SfwCBi7yIrs3jejQv33095aLpqg_CeV1yYOatFRbE/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823097",
    name: "M4A4 | Etch Lord (Well-Worn)",
    tier: "mythical",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL_UhFRd4cJ5nqeR9t2tiQew-UU_Yjz2d4XDdFI8ZFvT_ADryLi8h5TvuZTKnXphvCQl-z-DyHWmw0QL/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "33263962312",
    name: "2023 Service Medal",
    tier: "rare",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQznaKkImVGtYjlxNSJwaHxY-OGzzoCuZ0n0uvFpN713QGx_UBrYjryI9XDJlBvNA2FqAO7lebohJC-6ZmczXNivyIl4HjbyhC2hxpNPOU/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823098",
    name: "AK-47 | Slate (Field-Tested)",
    tier: "uncommon",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEm1Rd6dd2j6fA9Iqg2VXm-BI4YW37d4-UIVY2NAnR_wDrwu-6gZ-7u5TBzHVrsnUj4yzfzgv330-a1P5b/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823099",
    name: "P250 | Sand Dune (Field-Tested)",
    tier: "common",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMu4702QHi-UM-YmH1JoPGdgRrMFnS_FPvx-bphZO5tcmcm3Bi7HMntCqLzUGpikg6brdxxavJ7v9XFA/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823100",
    name: "USP-S | Forest Leaves (Field-Tested)",
    tier: "common",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLP7LWnn8f6pIg3L3CpdygiwPnr0Y9am-lINSSJlM_YFvT-VS7wu28jMS_6Zqbm3s26CQg-z-DyKnBBW8E/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823101",
    name: "Glock-18 | Candy Apple (Minimal Wear)",
    tier: "rare",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJnY6PnvD7DLbUkmJE5Yt3j7jF8NWj2wft8kBuZzv1JdDAcwM2YQrV_FS4wO7t1p-5upTOzXRr6HYntSrfmBe1n1gSOagLJ7nL/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823102",
    name: "Nova | Predator (Factory New)",
    tier: "uncommon",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhzw8zPdC9F7uOmntb2lPbmJq_ummJW4NE_yLzFoIr03VXjrkVpMW3xctOXdQY3N1iGqVK3w-_o0Z-4uMnLzCYwvyMqsyvfmxK0n1gSOX7gN-HI/360fx360f",
    status: "ready",
    isActive: true,
  },
  {
    id: "40538823103",
    name: "MAC-10 | Candy Apple (Minimal Wear)",
    tier: "common",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v33fzxB7c6Jl4-MmsjwPKvBmm5u5cB1g_zMu4702QHi-UM-YmH1JoPGdgRrMFnS_FPvx-bphZO5tcmcm3Bi7HMntCqLzUGpikg6brdxxavJKZLZpQ/360fx360f",
    status: "ready",
    isActive: true,
  },
]

export function InventoryGrid({ selectedTier, searchQuery }: InventoryGridProps) {
  const filteredItems = inventoryItems.filter((item) => {
    const matchesTier = selectedTier === "all" || item.tier === selectedTier
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTier && matchesSearch
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-6">
      {filteredItems.map((item) => {
        const colors = tierColors[item.tier] || tierColors.common
        
        return (
          <div
            key={item.id}
            className={`bg-card border border-border rounded-lg overflow-hidden border-t-4 ${colors.border}`}
          >
            {/* Tier Label */}
            <div className="p-4 pb-0">
              <span className={`text-xs font-semibold tracking-wider uppercase ${colors.text}`}>
                {item.tier}
              </span>
            </div>

            {/* Item Content */}
            <div className="p-4 flex gap-4">
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 bg-secondary/50 rounded flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {item.id}
                </p>
              </div>
            </div>

            {/* Status Row */}
            <div className="px-4 py-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Ready to list</span>
              </div>
              {item.isActive && (
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              )}
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                List item
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
