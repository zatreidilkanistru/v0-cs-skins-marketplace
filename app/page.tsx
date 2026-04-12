import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { HeroSection } from "@/components/hero-section"
import { CategoryCards } from "@/components/category-cards"
import { MarketplaceGrid } from "@/components/marketplace-grid"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <TopHeader />

        <main className="space-y-12 p-6 lg:p-8">
          {/* Hero Section */}
          <HeroSection />

          {/* Category Cards */}
          <CategoryCards />

          {/* Marketplace Listings */}
          <MarketplaceGrid />
        </main>
      </div>
    </div>
  )
}
