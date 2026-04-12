"use client"

interface InventoryFiltersProps {
  selectedTier: string
  onTierChange: (tier: string) => void
}

const tiers = [
  { id: "all", label: "All Tiers", count: 100 },
  { id: "ancient", label: "Ancient", count: 1 },
  { id: "mythical", label: "Mythical", count: 1 },
  { id: "rare", label: "Rare", count: 8 },
  { id: "uncommon", label: "Uncommon", count: 8 },
  { id: "common", label: "Common", count: 82 },
]

export function InventoryFilters({ selectedTier, onTierChange }: InventoryFiltersProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {tiers.map((tier) => (
        <button
          key={tier.id}
          onClick={() => onTierChange(tier.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            selectedTier === tier.id
              ? "bg-card border border-border text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <span className="uppercase tracking-wider">{tier.label}</span>
          <span className={`${selectedTier === tier.id ? "text-foreground" : "text-muted-foreground"}`}>
            {tier.count}
          </span>
        </button>
      ))}
    </div>
  )
}
