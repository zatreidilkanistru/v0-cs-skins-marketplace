"use client"

import Image from "next/image"
import { ArrowRight, TrendingUp, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>Trending: Dragon Lore +15% this week</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              The Premier <span className="text-primary">CS Skins</span> Marketplace
            </h1>
            
            <p className="mb-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Discover, collect, and trade rare CS skins. From knife skins to rare patterns, find your next prized possession in our secure marketplace.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                Explore Skins
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                List Your Skins
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-foreground sm:text-3xl">1.2M+</div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground sm:text-3xl">350K+</div>
                <div className="text-sm text-muted-foreground">Traders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground sm:text-3xl">$50M+</div>
                <div className="text-sm text-muted-foreground">Volume</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Skin */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
              
              {/* Featured Card */}
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
                    Covert
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Featured Skin
                  </span>
                </div>
                
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-secondary/50">
                  <Image
                    src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=400&fit=crop"
                    alt="Featured AWP Dragon Lore"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="mb-2">
                  <div className="text-sm text-muted-foreground">AWP</div>
                  <h3 className="text-xl font-bold text-foreground">Dragon Lore</h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                    <div className="text-2xl font-bold text-primary">$12,450.00</div>
                  </div>
                  <Button>Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="border-t border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 text-primary" />
            <span>Secure Escrow Trading</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-5 w-5 text-primary" />
            <span>Verified Traders Only</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Real-time Price Tracking</span>
          </div>
        </div>
      </div>
    </section>
  )
}
