"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SkinsGrid } from "@/components/skins-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Explore Skins</h2>
          <p className="mt-2 text-muted-foreground">
            Browse the latest listings from verified traders
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-4">
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Skins Grid */}
          <SkinsGrid 
            showFiltersOnMobile={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
