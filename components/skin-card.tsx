"use client"

import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkinCardProps {
  skin: {
    id: string
    name: string
    weapon: string
    wear: string
    price: number
    image: string
    rarity: "Consumer" | "Industrial" | "Mil-Spec" | "Restricted" | "Classified" | "Covert" | "Contraband"
    float?: number
    stattrak?: boolean
  }
}

const rarityColors = {
  Consumer: "bg-gray-500",
  Industrial: "bg-sky-400",
  "Mil-Spec": "bg-blue-500",
  Restricted: "bg-purple-500",
  Classified: "bg-pink-500",
  Covert: "bg-red-500",
  Contraband: "bg-amber-500",
}

const rarityBorders = {
  Consumer: "border-gray-500/50",
  Industrial: "border-sky-400/50",
  "Mil-Spec": "border-blue-500/50",
  Restricted: "border-purple-500/50",
  Classified: "border-pink-500/50",
  Covert: "border-red-500/50",
  Contraband: "border-amber-500/50",
}

export function SkinCard({ skin }: SkinCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10",
        rarityBorders[skin.rarity]
      )}
    >
      {/* Rarity indicator line */}
      <div className={cn("absolute top-0 left-0 right-0 h-0.5", rarityColors[skin.rarity])} />
      
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <Image
          src={skin.image}
          alt={`${skin.weapon} | ${skin.name}`}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="secondary" className="h-10 w-10">
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="icon" className="h-10 w-10">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>

        {/* StatTrak badge */}
        {skin.stattrak && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
            StatTrak
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="mb-1 text-xs text-muted-foreground">{skin.weapon}</div>
        <h3 className="mb-2 truncate font-semibold text-foreground">{skin.name}</h3>
        
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {skin.wear}
          </Badge>
          {skin.float && (
            <span className="text-xs text-muted-foreground">
              Float: {skin.float.toFixed(4)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-foreground">${skin.price.toFixed(2)}</div>
          </div>
          <Button size="sm" className="gap-1">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}
