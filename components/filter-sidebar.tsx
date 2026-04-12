"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground hover:text-primary"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="mt-2 space-y-3">{children}</div>}
    </div>
  )
}

const weapons = [
  "AK-47", "M4A4", "M4A1-S", "AWP", "Desert Eagle", "USP-S", "Glock-18", "Knife"
]

const rarities = [
  { name: "Covert", color: "bg-red-500" },
  { name: "Classified", color: "bg-pink-500" },
  { name: "Restricted", color: "bg-purple-500" },
  { name: "Mil-Spec", color: "bg-blue-500" },
  { name: "Industrial", color: "bg-sky-400" },
]

const wears = [
  "Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"
]

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 5000])

  return (
    <aside className="w-full rounded-xl border border-border bg-card p-4 lg:w-64">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Clear all
        </Button>
      </div>

      <div className="space-y-4">
        {/* Status Filter */}
        <FilterSection title="Status">
          <div className="flex flex-wrap gap-2">
            {["Buy Now", "Auction", "New"].map((status) => (
              <Button key={status} variant="outline" size="sm" className="text-xs">
                {status}
              </Button>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="px-1">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              step={10}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>
        </FilterSection>

        {/* Weapon Type */}
        <FilterSection title="Weapon">
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {weapons.map((weapon) => (
              <div key={weapon} className="flex items-center gap-2">
                <Checkbox id={weapon} />
                <Label htmlFor={weapon} className="text-sm text-muted-foreground cursor-pointer">
                  {weapon}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Rarity */}
        <FilterSection title="Rarity">
          <div className="space-y-2">
            {rarities.map((rarity) => (
              <div key={rarity.name} className="flex items-center gap-2">
                <Checkbox id={rarity.name} />
                <div className={cn("h-3 w-3 rounded-full", rarity.color)} />
                <Label htmlFor={rarity.name} className="text-sm text-muted-foreground cursor-pointer">
                  {rarity.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Wear */}
        <FilterSection title="Exterior">
          <div className="space-y-2">
            {wears.map((wear) => (
              <div key={wear} className="flex items-center gap-2">
                <Checkbox id={wear} />
                <Label htmlFor={wear} className="text-sm text-muted-foreground cursor-pointer">
                  {wear}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* StatTrak */}
        <FilterSection title="Features">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="stattrak" />
              <Label htmlFor="stattrak" className="text-sm text-muted-foreground cursor-pointer">
                StatTrak™
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="souvenir" />
              <Label htmlFor="souvenir" className="text-sm text-muted-foreground cursor-pointer">
                Souvenir
              </Label>
            </div>
          </div>
        </FilterSection>
      </div>
    </aside>
  )
}
