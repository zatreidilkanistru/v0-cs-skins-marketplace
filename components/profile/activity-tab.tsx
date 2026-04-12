"use client"

import { useState } from "react"
import { ShoppingCart, RefreshCw, Send, Tag, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const eventTypes = [
  { id: "all", label: "All" },
  { id: "sale", label: "Sale" },
  { id: "purchase", label: "Purchase" },
  { id: "transfer", label: "Transfer" },
  { id: "listing", label: "Listing" },
]

const activities = [
  {
    id: 1,
    event: "sale",
    eventIcon: ShoppingCart,
    item: {
      name: "AK-47 | Redline",
      collection: "Classified",
      image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UZkNmj2cY6RclNrMl_V-Fm4wuvuhZS6uMzKySBku3Z04Q/256fx256f",
    },
    price: "$114.74",
    qty: 1,
    rarity: "#3,835",
    from: "You",
    to: "gfbpa",
    time: "2mo ago",
  },
  {
    id: 2,
    event: "purchase",
    eventIcon: RefreshCw,
    item: {
      name: "M4A4 | Mainframe",
      collection: "Uncommon",
      image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_kVvamHzcoWVJgQ7ZFzW_ADqw-u5hcC0tZ_Im3swvyFxsSnbnhS_gx9SLrs4b4HYHQ/256fx256f",
    },
    price: "-",
    qty: 1,
    rarity: "#1,160",
    from: "NullAddress",
    to: "You",
    time: "2mo ago",
  },
  {
    id: 3,
    event: "purchase",
    eventIcon: RefreshCw,
    item: {
      name: "AWP | Asiimov",
      collection: "Covert",
      image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-KmsjwPKvBmm5u5cB1g_zMu4702QGwqkRkMm7ydY_BdwY5aA6C-QO3xO3n1ZfpuZ_Kmmc27yR0-z-DyPKKJBDv/256fx256f",
    },
    price: "-",
    qty: 1,
    rarity: "#975",
    from: "NullAddress",
    to: "You",
    time: "2mo ago",
  },
  {
    id: 4,
    event: "transfer",
    eventIcon: Send,
    item: {
      name: "Desert Eagle | Blaze",
      collection: "Restricted",
      image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7du6kb-FlvD1DLfYkWNFpsRz3-rHpdjt0FXm_xFtazr2I4KQIQ9vZl6B_1m3wu7t1pC9tZSfnXNgvCkh4XqLnBKp1hxJcKUx0ohqEBaL/256fx256f",
    },
    price: "-",
    qty: 1,
    rarity: "#871",
    from: "NullAddress",
    to: "You",
    time: "2mo ago",
  },
  {
    id: 5,
    event: "listing",
    eventIcon: Tag,
    item: {
      name: "USP-S | Kill Confirmed",
      collection: "Covert",
      image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09ulq5WYh8j_OrfdqWhe5sN4mOTE8NWmjgPmqUU4Nj3zcoTEelJtZFHVrAS2yee500-puoOJlyXo3xQxZXE/256fx256f",
    },
    price: "-",
    qty: 1,
    rarity: "#3,835",
    from: "NullAddress",
    to: "You",
    time: "2mo ago",
  },
  {
    id: 6,
    event: "purchase",
    eventIcon: RefreshCw,
    item: {
      name: "Glock-18 | Fade",
      collection: "Restricted",
      image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJnY6PnvD7DLbUkmJE5Yt0j7jC8d73jFGxqkFrYjumJI-VJgJoZVmE-QLrl-bugJPvuZ_Xm3NlviR0-z-DyPKKJBDv/256fx256f",
    },
    price: "-",
    qty: 1,
    rarity: "-",
    from: "NullAddress",
    to: "You",
    time: "3mo ago",
  },
]

const eventColors: Record<string, string> = {
  sale: "text-green-400",
  purchase: "text-blue-400",
  transfer: "text-purple-400",
  listing: "text-orange-400",
}

export function ActivityTab() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredActivities = activeFilter === "all" 
    ? activities 
    : activities.filter(a => a.event === activeFilter)

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {eventTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveFilter(type.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium transition-colors",
              activeFilter === type.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="hidden border-b border-border pb-3 md:grid md:grid-cols-12 md:gap-4">
          <div className="col-span-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Event
          </div>
          <div className="col-span-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Item
          </div>
          <div className="col-span-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Price
          </div>
          <div className="col-span-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Qty
          </div>
          <div className="col-span-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Rarity
          </div>
          <div className="col-span-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            From
          </div>
          <div className="col-span-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            To
          </div>
          <div className="col-span-1 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Time
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="grid grid-cols-2 items-center gap-4 py-4 md:grid-cols-12"
            >
              {/* Event */}
              <div className="col-span-1 flex items-center gap-2">
                <activity.eventIcon className={cn("h-4 w-4", eventColors[activity.event])} />
                <span className="hidden text-sm font-medium capitalize text-foreground md:inline">
                  {activity.event}
                </span>
              </div>

              {/* Item */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 bg-secondary/50 p-1">
                  <img
                    src={activity.item.image}
                    alt={activity.item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {activity.item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.item.collection}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-1">
                <span className="text-sm font-medium text-foreground">
                  {activity.price}
                </span>
              </div>

              {/* Qty */}
              <div className="col-span-1">
                <span className="text-sm text-muted-foreground">{activity.qty}</span>
              </div>

              {/* Rarity */}
              <div className="col-span-1">
                <span className={cn(
                  "text-sm",
                  activity.rarity !== "-" ? "text-primary" : "text-muted-foreground"
                )}>
                  {activity.rarity}
                </span>
              </div>

              {/* From */}
              <div className="col-span-2">
                <span className={cn(
                  "text-sm",
                  activity.from === "You" ? "text-foreground" : "text-muted-foreground"
                )}>
                  {activity.from}
                </span>
              </div>

              {/* To */}
              <div className="col-span-2">
                <span className={cn(
                  "text-sm",
                  activity.to === "You" ? "text-foreground" : "text-muted-foreground"
                )}>
                  {activity.to}
                </span>
              </div>

              {/* Time */}
              <div className="col-span-1 flex items-center justify-end gap-1">
                <span className="text-sm text-muted-foreground">{activity.time}</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
