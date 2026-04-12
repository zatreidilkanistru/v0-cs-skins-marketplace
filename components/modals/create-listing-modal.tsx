"use client"

import { useState } from "react"
import { X, Tag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CreateListingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: {
    name: string
    tier: string
    image?: string
  }
}

const tokens = [
  { id: "usdt", name: "USDT", selected: true },
  { id: "usdc", name: "USDC", selected: false },
  { id: "eth", name: "ETH", selected: false },
]

const networks = [
  { id: "base", name: "Base", selected: true },
  { id: "ethereum", name: "Ethereum", selected: false },
  { id: "polygon", name: "Polygon", selected: false },
  { id: "solana", name: "Solana", selected: false },
  { id: "tron", name: "Tron", selected: false },
]

export function CreateListingModal({ open, onOpenChange, item }: CreateListingModalProps) {
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTokens, setSelectedTokens] = useState(["usdt"])
  const [selectedNetworks, setSelectedNetworks] = useState(["base"])
  const [priceError, setPriceError] = useState(false)

  const toggleToken = (id: string) => {
    setSelectedTokens(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const toggleNetwork = (id: string) => {
    setSelectedNetworks(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id)
        : [...prev, id]
    )
  }

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case "ancient": return "text-red-400 bg-red-500/10"
      case "mythical": return "text-purple-400 bg-purple-500/10"
      case "rare": return "text-pink-400 bg-pink-500/10"
      case "uncommon": return "text-blue-400 bg-blue-500/10"
      case "common": return "text-gray-400 bg-gray-500/10"
      case "covert": return "text-red-400 bg-red-500/10"
      default: return "text-muted-foreground bg-secondary"
    }
  }

  const handlePriceChange = (value: string) => {
    setPrice(value)
    const num = parseFloat(value)
    setPriceError(isNaN(num) || num <= 0)
  }

  const handleCreate = () => {
    if (!priceError && price && selectedTokens.length > 0 && selectedNetworks.length > 0) {
      onOpenChange(false)
    }
  }

  const defaultItem = {
    name: "Music Kit | Valve, CS:GO",
    tier: "Ancient",
    image: ""
  }

  const displayItem = item || defaultItem

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Listing Editor
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-xl font-semibold mt-2">Create Listing</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Confirm price, accepted tokens and networks before publishing this listing.
          </p>
        </DialogHeader>

        <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Item Preview */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
              {displayItem.image ? (
                <img src={displayItem.image} alt={displayItem.name} className="w-full h-full object-contain" />
              ) : (
                <Tag className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${getTierColor(displayItem.tier)}`}>
                {displayItem.tier.toUpperCase()}
              </span>
              <h4 className="font-medium text-foreground mt-1">{displayItem.name}</h4>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              Listing Price <span className="text-red-400">*</span>
            </label>
            <Input
              type="text"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="e.g. 1.50"
              className={`bg-input ${priceError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {priceError && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Enter a valid listing price greater than zero.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add trade notes or listing context..."
              className="bg-input min-h-[80px] resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional context for buyers. Keep it clear and concise.
            </p>
          </div>

          {/* Accepted Tokens */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              Accepted Tokens <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {tokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => toggleToken(token.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    selectedTokens.includes(token.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-foreground border-border hover:border-muted-foreground"
                  }`}
                >
                  {token.name}
                </button>
              ))}
            </div>
          </div>

          {/* Accepted Networks */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              Accepted Networks <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => toggleNetwork(network.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    selectedNetworks.includes(network.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-foreground border-border hover:border-muted-foreground"
                  }`}
                >
                  {network.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleCreate}
            disabled={priceError || !price || selectedTokens.length === 0 || selectedNetworks.length === 0}
          >
            <Tag className="h-4 w-4 mr-2" />
            Create Listing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
