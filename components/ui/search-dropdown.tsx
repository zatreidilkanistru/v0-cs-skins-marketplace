"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Tag, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchResult {
  type: "category" | "item" | "recent"
  name: string
  subtitle?: string
  tier?: string
}

const categories: SearchResult[] = [
  { type: "category", name: "Knives", subtitle: "Category" },
  { type: "category", name: "Gloves", subtitle: "Category" },
  { type: "category", name: "Pistol", subtitle: "Category" },
  { type: "category", name: "Rifle", subtitle: "Category" },
  { type: "category", name: "SMG", subtitle: "Category" },
  { type: "category", name: "Sniper Rifle", subtitle: "Category" },
  { type: "category", name: "Shotgun", subtitle: "Category" },
]

const recentSearches: SearchResult[] = [
  { type: "recent", name: "AWP | Dragon Lore" },
  { type: "recent", name: "Karambit | Fade" },
  { type: "recent", name: "M4A4 | Howl" },
]

const trendingItems: SearchResult[] = [
  { type: "item", name: "AK-47 | Wild Lotus", tier: "Covert" },
  { type: "item", name: "AWP | Gungnir", tier: "Covert" },
  { type: "item", name: "Sport Gloves | Pandora's Box", tier: "Extraordinary" },
]

export function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Covert": return "text-red-400"
      case "Extraordinary": return "text-yellow-400"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div ref={dropdownRef} className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search by model, category or item name"
        className="h-10 w-full bg-input pl-10 text-sm placeholder:text-muted-foreground"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
          {query ? (
            <>
              {/* Search Results */}
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Categories
                </p>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-secondary transition-colors"
                      onClick={() => {
                        setQuery(category.name)
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                          <Tag className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                        CATEGORIES
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-4 text-sm text-muted-foreground text-center">No results found</p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Recent Searches */}
              <div className="p-2 border-b border-border">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </p>
                {recentSearches.map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => {
                      setQuery(item.name)
                      setIsOpen(false)
                    }}
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </button>
                ))}
              </div>

              {/* Trending */}
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Trending Now
                </p>
                {trendingItems.map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => {
                      setQuery(item.name)
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-secondary" />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    {item.tier && (
                      <span className={`text-xs font-medium ${getTierColor(item.tier)}`}>
                        {item.tier.toUpperCase()}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
