"use client"

import { SkinCard } from "./skin-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react"

// Sample skins data
const skins = [
  {
    id: "1",
    name: "Asiimov",
    weapon: "AWP",
    wear: "Field-Tested",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.2134,
    stattrak: true,
  },
  {
    id: "2",
    name: "Hyper Beast",
    weapon: "M4A1-S",
    wear: "Minimal Wear",
    price: 45.50,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0892,
  },
  {
    id: "3",
    name: "Fire Serpent",
    weapon: "AK-47",
    wear: "Factory New",
    price: 1250.00,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0234,
    stattrak: true,
  },
  {
    id: "4",
    name: "Fade",
    weapon: "Karambit",
    wear: "Factory New",
    price: 2899.99,
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0087,
  },
  {
    id: "5",
    name: "Vulcan",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 78.25,
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f897a?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0756,
  },
  {
    id: "6",
    name: "Kill Confirmed",
    weapon: "USP-S",
    wear: "Field-Tested",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.1823,
    stattrak: true,
  },
  {
    id: "7",
    name: "Neo-Noir",
    weapon: "AWP",
    wear: "Factory New",
    price: 156.75,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b05?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0345,
  },
  {
    id: "8",
    name: "Crimson Web",
    weapon: "M9 Bayonet",
    wear: "Minimal Wear",
    price: 4500.00,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0912,
  },
  {
    id: "9",
    name: "Printstream",
    weapon: "Desert Eagle",
    wear: "Factory New",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=400&fit=crop",
    rarity: "Classified" as const,
    float: 0.0123,
  },
  {
    id: "10",
    name: "Bloodsport",
    weapon: "AK-47",
    wear: "Factory New",
    price: 215.00,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rarity: "Classified" as const,
    float: 0.0289,
    stattrak: true,
  },
  {
    id: "11",
    name: "Neon Rider",
    weapon: "AK-47",
    wear: "Minimal Wear",
    price: 67.50,
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=400&fit=crop",
    rarity: "Classified" as const,
    float: 0.0834,
  },
  {
    id: "12",
    name: "Doppler",
    weapon: "Butterfly Knife",
    wear: "Factory New",
    price: 1850.00,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    rarity: "Covert" as const,
    float: 0.0156,
  },
]

interface SkinsGridProps {
  showFiltersOnMobile: boolean
  onToggleFilters: () => void
}

export function SkinsGrid({ showFiltersOnMobile, onToggleFilters }: SkinsGridProps) {
  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 lg:hidden"
            onClick={onToggleFilters}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <span className="text-sm text-muted-foreground">
            {skins.length.toLocaleString()} items
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="recent">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Listed</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="float-low">Float: Low to High</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-8 w-8">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" size="lg">
          Load More Skins
        </Button>
      </div>
    </div>
  )
}
