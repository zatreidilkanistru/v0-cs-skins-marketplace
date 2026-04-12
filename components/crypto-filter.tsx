"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const cryptoOptions = [
  { id: "usdt", label: "USDT" },
  { id: "eth", label: "ETH" },
  { id: "usdc", label: "USDC" },
  { id: "base", label: "Base" },
  { id: "ethereum", label: "Ethereum" },
  { id: "solana", label: "Solana" },
  { id: "polygon", label: "Polygon" },
  { id: "tron", label: "Tron" },
]

export function CryptoFilter() {
  const [selected, setSelected] = useState("eth")

  return (
    <div className="flex flex-wrap items-center gap-2">
      {cryptoOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelected(option.id)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            selected === option.id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
