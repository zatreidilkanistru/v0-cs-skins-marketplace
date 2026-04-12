"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, Clock, TrendingDown, Shield } from "lucide-react"

interface MakeOfferModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: {
    name: string
    rarity: string
    currentPrice: number
    imageUrl?: string
    float?: number
  }
}

const tokens = [
  { symbol: "USDT", name: "Tether", balance: 1250.00 },
  { symbol: "USDC", name: "USD Coin", balance: 500.00 },
  { symbol: "ETH", name: "Ethereum", balance: 0.85 },
]

const expirationOptions = [
  { label: "1 hour", value: 1 },
  { label: "6 hours", value: 6 },
  { label: "24 hours", value: 24 },
  { label: "3 days", value: 72 },
  { label: "7 days", value: 168 },
]

export function MakeOfferModal({ open, onOpenChange, item }: MakeOfferModalProps) {
  const [offerAmount, setOfferAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState("USDT")
  const [expiration, setExpiration] = useState(24)
  const [message, setMessage] = useState("")

  const currentPrice = item?.currentPrice || 2450.00
  const offerValue = parseFloat(offerAmount) || 0
  const percentageOfAsking = ((offerValue / currentPrice) * 100).toFixed(1)
  const selectedTokenData = tokens.find(t => t.symbol === selectedToken)
  const hasInsufficientBalance = offerValue > (selectedTokenData?.balance || 0)

  const suggestedOffers = [
    { label: "5% below", value: (currentPrice * 0.95).toFixed(2) },
    { label: "10% below", value: (currentPrice * 0.90).toFixed(2) },
    { label: "15% below", value: (currentPrice * 0.85).toFixed(2) },
  ]

  const handleSubmit = () => {
    if (offerValue > 0 && !hasInsufficientBalance) {
      console.log("Submitting offer:", { offerAmount, selectedToken, expiration, message })
      onOpenChange(false)
    }
  }

  const rarityColors: Record<string, string> = {
    "Contraband": "border-t-amber-500",
    "Covert": "border-t-red-500",
    "Classified": "border-t-pink-500",
    "Restricted": "border-t-purple-500",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border p-0 overflow-hidden">
        <div className={`border-t-2 ${rarityColors[item?.rarity || "Covert"]}`}>
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">Make an Offer</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Submit a custom offer for this item. The seller will be notified.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Item Preview */}
            <div className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Item</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item?.name || "M4A4 | Howl"}</p>
                <p className="text-sm text-muted-foreground">
                  Asking price: <span className="text-foreground font-medium">${currentPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            {/* Offer Amount */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Your Offer
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full pl-8 pr-24 py-3 bg-input border border-border rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="bg-secondary border-none rounded px-2 py-1 text-sm font-medium focus:outline-none"
                  >
                    {tokens.map(token => (
                      <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Balance & Percentage */}
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className={`${hasInsufficientBalance ? "text-red-500" : "text-muted-foreground"}`}>
                  Balance: {selectedTokenData?.balance.toFixed(2)} {selectedToken}
                  {hasInsufficientBalance && " (insufficient)"}
                </span>
                {offerValue > 0 && (
                  <span className={`font-medium ${parseFloat(percentageOfAsking) < 90 ? "text-yellow-500" : "text-foreground"}`}>
                    {percentageOfAsking}% of asking
                  </span>
                )}
              </div>

              {/* Quick suggestions */}
              <div className="flex gap-2 mt-3">
                {suggestedOffers.map(offer => (
                  <button
                    key={offer.label}
                    onClick={() => setOfferAmount(offer.value)}
                    className="flex-1 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded text-xs font-medium transition-colors"
                  >
                    <TrendingDown className="h-3 w-3 inline mr-1" />
                    {offer.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Token Selection Grid */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Pay with
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tokens.map(token => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token.symbol)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedToken === token.symbol
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium text-sm">{token.symbol}</p>
                    <p className="text-xs text-muted-foreground">{token.balance.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Offer expires in
              </label>
              <div className="flex gap-2 flex-wrap">
                {expirationOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setExpiration(option.value)}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      expiration === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Message */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Message to seller (optional)
              </label>
              <textarea
                placeholder="Add a note to the seller..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">{message.length}/200</p>
            </div>

            {/* Low offer warning */}
            {offerValue > 0 && parseFloat(percentageOfAsking) < 80 && (
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-500">Low offer</p>
                  <p className="text-xs text-yellow-500/80">
                    Offers below 80% of asking price are less likely to be accepted.
                  </p>
                </div>
              </div>
            )}

            {/* Escrow note */}
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">
                Funds will be held in escrow until the trade is complete
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={offerValue <= 0 || hasInsufficientBalance}
                onClick={handleSubmit}
              >
                Submit Offer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
