"use client"

import { Sparkles, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      {/* Left Content */}
      <div className="flex-1 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium tracking-wide uppercase">Verified CS2 OTC Marketplace</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl text-balance">
          Fast, clear and verified CS2 trading.
        </h1>

        {/* Description */}
        <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
          One primary flow: review trust signals, lock in escrow, verify Steam delivery and confirm release with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" className="font-semibold">
            Explore listings
          </Button>
          <Button size="lg" variant="secondary" className="font-semibold">
            Open collection view
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div className="text-sm">
            <span className="font-semibold text-foreground">4 listings</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-foreground">0 active offers</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% avg seller trust
          </div>
        </div>
      </div>

      {/* Featured Listing Card */}
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 lg:w-[420px]">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Featured Listing
        </p>

        {/* Item Image */}
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
          <img
            src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UY5NjvxcNSUdQc2ZA7TqVa4wuu5gMK0uM7LnXA17iIi5XrZln-JuONZ/360fx360f"
            alt="M4A4 | Mainframe"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Item Info */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Uncommon Asset
        </p>
        <h3 className="mb-4 text-xl font-semibold text-foreground">
          M4A4 | Mainframe (Minimal Wear)
        </h3>

        {/* Price Info */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary p-3">
            <p className="mb-0.5 text-xs text-muted-foreground uppercase">Price</p>
            <p className="text-lg font-semibold text-foreground">12 USDT</p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <p className="mb-0.5 text-xs text-muted-foreground uppercase">Top Offer</p>
            <p className="text-lg font-semibold text-muted-foreground">No offers</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="font-semibold">Buy featured</Button>
          <Button variant="secondary" className="font-semibold">Seller profile</Button>
        </div>
      </div>
    </section>
  )
}
