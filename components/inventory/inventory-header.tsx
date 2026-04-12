"use client"

import { useState } from "react"

const stats = [
  { label: "Total Items", value: "100", highlighted: false },
  { label: "Ready to List", value: "100", highlighted: true },
  { label: "Top Tier", value: "2", highlighted: false },
]

export function InventoryHeader() {
  return (
    <div className="mb-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">Inventory</h1>
      <p className="text-muted-foreground mb-6">
        Scan synced Steam assets, filter quickly and list in one click.
      </p>

      {/* Stats Cards */}
      <div className="flex gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex-1 p-4 rounded-lg bg-card ${
              stat.highlighted 
                ? "border-2 border-primary" 
                : "border border-border"
            }`}
          >
            <div className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">
              {stat.label}
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
