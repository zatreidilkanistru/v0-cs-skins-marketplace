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
import { 
  X, 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  Wallet,
  Clock,
  ChevronDown,
  Loader2
} from "lucide-react"

interface ConfirmPurchaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: {
    name: string
    image: string
    wear?: string
    float?: number
    seller: string
    sellerTrust: number
  }
  price?: number
  token?: string
}

const safetyChecklist = [
  { id: "verify_item", label: "I have verified this is the correct item" },
  { id: "verify_price", label: "I confirm the price is acceptable" },
  { id: "verify_seller", label: "I understand the seller's trust score" },
  { id: "verify_escrow", label: "I understand funds will be locked in escrow" },
]

export function ConfirmPurchaseModal({ 
  open, 
  onOpenChange,
  item = {
    name: "AK-47 | Redline",
    image: "/placeholder.svg",
    wear: "Field-Tested",
    float: 0.2341,
    seller: "SkinMaster",
    sellerTrust: 98
  },
  price = 45.50,
  token = "USDT"
}: ConfirmPurchaseModalProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [selectedToken, setSelectedToken] = useState(token)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showTokenSelect, setShowTokenSelect] = useState(false)

  const allChecked = checkedItems.length === safetyChecklist.length

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handlePurchase = async () => {
    if (!allChecked) return
    setIsProcessing(true)
    // Simulate purchase
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onOpenChange(false)
  }

  const platformFee = price * 0.05 // 5% fee
  const total = price + platformFee

  const tokens = [
    { symbol: "USDT", name: "Tether", balance: 156.42 },
    { symbol: "USDC", name: "USD Coin", balance: 89.50 },
    { symbol: "ETH", name: "Ethereum", balance: 21.34 },
  ]

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken)
  const hasEnoughBalance = selectedTokenData && selectedTokenData.balance >= total

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <DialogTitle className="text-lg font-semibold">Confirm Purchase</DialogTitle>
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
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Review the details below before completing your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Item Preview */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.wear}</p>
                {item.float && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Float: {item.float.toFixed(4)}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Seller:</span>
                  <span className="text-sm font-medium">{item.seller}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    item.sellerTrust >= 95 ? "bg-green-500/20 text-green-400" :
                    item.sellerTrust >= 80 ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {item.sellerTrust}% Trust
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              Pay with
            </label>
            <div className="relative">
              <button
                onClick={() => setShowTokenSelect(!showTokenSelect)}
                className="w-full flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{selectedToken}</p>
                    <p className="text-xs text-muted-foreground">
                      Balance: ${selectedTokenData?.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showTokenSelect ? "rotate-180" : ""}`} />
              </button>

              {showTokenSelect && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
                  {tokens.map((t) => (
                    <button
                      key={t.symbol}
                      onClick={() => {
                        setSelectedToken(t.symbol)
                        setShowTokenSelect(false)
                      }}
                      className={`w-full flex items-center justify-between p-3 hover:bg-secondary transition-colors ${
                        selectedToken === t.symbol ? "bg-secondary" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{t.symbol}</span>
                        <span className="text-sm text-muted-foreground">{t.name}</span>
                      </div>
                      <span className="text-sm">${t.balance.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!hasEnoughBalance && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Insufficient balance. You need ${(total - (selectedTokenData?.balance || 0)).toFixed(2)} more.
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Item price</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform fee (5%)</span>
              <span>${platformFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)} {selectedToken}</span>
            </div>
          </div>

          {/* Safety Checklist */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Shield className="h-3.5 w-3.5" />
              Safety Checklist
            </label>
            {safetyChecklist.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <div 
                  className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    checkedItems.includes(item.id)
                      ? "bg-primary border-primary"
                      : "border-border group-hover:border-primary/50"
                  }`}
                  onClick={() => toggleCheck(item.id)}
                >
                  {checkedItems.includes(item.id) && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                  )}
                </div>
                <span 
                  className="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                  onClick={() => toggleCheck(item.id)}
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>

          {/* Escrow Info */}
          <div className="flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary">Escrow Protection</p>
              <p className="text-muted-foreground mt-0.5">
                Funds will be held in escrow until the item is delivered via Steam trade and verified.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={!allChecked || !hasEnoughBalance || isProcessing}
            onClick={handlePurchase}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                Confirm Purchase
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
