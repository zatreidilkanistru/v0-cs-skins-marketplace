"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { HeroSection } from "@/components/hero-section"
import { CategoryCards } from "@/components/category-cards"
import { MarketplaceGrid } from "@/components/marketplace-grid"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

function MainContent() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "pl-[72px]" : "pl-64"
        }`}
      >
        <TopHeader />
        <main className="space-y-12 p-6 lg:p-8">
          <HeroSection />
          <CategoryCards />
          <MarketplaceGrid />
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <SidebarProvider>
      <MainContent />
    </SidebarProvider>
  )
}
