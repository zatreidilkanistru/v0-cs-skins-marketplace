"use client"

import { Image as ImageIcon, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Knives", listings: 0, floor: null },
  { name: "Gloves", listings: 0, floor: null },
  { name: "Pistol", listings: 0, floor: null },
  { name: "Rifle", listings: 1, floor: "12 USDT" },
  { name: "SMG", listings: 1, floor: "1 USDT" },
  { name: "Sniper Rifle", listings: 0, floor: null },
  { name: "Shotgun", listings: 0, floor: null },
  { name: "Machine Gun", listings: 0, floor: null },
]

export function CategoryCards() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Collections
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Browse market by category
          </h2>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
          Steam verification + Escrow release
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/market/${category.name.toLowerCase().replace(" ", "-")}`}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-card/80"
          >
            {/* Top colored border */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/50 to-primary/20" />
            
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <ImageIcon className="h-6 w-6" />
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Collection
              </p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">
                {category.name}
              </h3>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Listings</p>
                <p className="font-semibold text-foreground">{category.listings}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Floor</p>
                <p className="font-semibold text-foreground">
                  {category.floor || "No data"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
