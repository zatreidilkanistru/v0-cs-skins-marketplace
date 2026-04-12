"use client"

import { useState } from "react"
import { Search, ChevronDown, LayoutGrid, List, X, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CryptoFilter } from "./crypto-filter"
import { cn } from "@/lib/utils"

const sampleListings = [
  {
    id: 1,
    name: "M4A4 | Mainframe",
    wear: "Minimal Wear",
    rarity: "Uncommon",
    price: "12 USDT",
    trust: "100.0%",
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UY5NjvxcNSUdQc2ZA7TqVa4wuu5gMK0uM7LnXA17iIi5XrZln-JuONZ/360fx360f",
  },
]

export function MarketplaceGrid() {
  const [layout, setLayout] = useState<"comfortable" | "compact">("comfortable")

  return (
    <section className="space-y-6">
      {/* Filters Bar */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4">
        {/* Search and Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by item name, collection or keyword"
              className="h-10 bg-input pl-10 text-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="gap-2">
                Newest first
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest first</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
            <span className="px-2 text-xs font-medium text-muted-foreground uppercase">Layout</span>
            <button
              onClick={() => setLayout("comfortable")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                layout === "comfortable"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Comfortable
            </button>
            <button
              onClick={() => setLayout("compact")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                layout === "compact"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Compact
            </button>
          </div>

          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
            Reset filters
          </Button>
        </div>

        {/* Crypto Filter Tabs */}
        <CryptoFilter />

        {/* Results Info */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sampleListings.length}</span> live listings
          </p>
          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            Escrow + Steam verification active
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className={cn(
        "grid gap-4",
        layout === "comfortable"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      )}>
        {sampleListings.map((listing) => (
          <div
            key={listing.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50"
          >
            {/* Top colored border */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/10" />

            {/* Header */}
            <div className="flex items-center justify-between p-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {listing.rarity}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                {listing.trust} trust
              </span>
            </div>

            {/* Image */}
            <div className={cn(
              "relative mx-3 overflow-hidden rounded-lg bg-secondary",
              layout === "comfortable" ? "aspect-square" : "aspect-[4/3]"
            )}>
              <img
                src={listing.image}
                alt={listing.name}
                className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground truncate">
                {listing.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {listing.wear}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-lg font-bold text-foreground">
                  {listing.price}
                </p>
                <Button size="sm" className="h-8">
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
