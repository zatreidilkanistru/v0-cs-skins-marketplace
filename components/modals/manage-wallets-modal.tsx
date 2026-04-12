"use client"

import { useState } from "react"
import { X, Wallet, Plus, Check, Copy, ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ManageWalletsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ConnectedWallet {
  id: string
  address: string
  network: string
  networkIcon: string
  isPrimary: boolean
  balance: string
}

export function ManageWalletsModal({ open, onOpenChange }: ManageWalletsModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const connectedWallets: ConnectedWallet[] = [
    {
      id: "1",
      address: "0x31b7c2a89f456d1e2b3c4d5e6f7890ab12cd95bd",
      network: "Ethereum",
      networkIcon: "ETH",
      isPrimary: true,
      balance: "2.45 ETH",
    },
    {
      id: "2",
      address: "0x8f4a7b3c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
      network: "Polygon",
      networkIcon: "MATIC",
      isPrimary: false,
      balance: "156.32 MATIC",
    },
    {
      id: "3",
      address: "TRx7a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7",
      network: "Tron",
      networkIcon: "TRX",
      isPrimary: false,
      balance: "1,234 TRX",
    },
  ]

  const copyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getNetworkColor = (network: string) => {
    switch (network) {
      case "Ethereum": return "bg-blue-500/20 text-blue-400"
      case "Polygon": return "bg-purple-500/20 text-purple-400"
      case "Tron": return "bg-red-500/20 text-red-400"
      case "Solana": return "bg-green-500/20 text-green-400"
      case "Base": return "bg-blue-600/20 text-blue-300"
      default: return "bg-secondary text-muted-foreground"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Manage Wallets</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Connect multiple wallets for trading across different networks.
          </p>
        </DialogHeader>

        <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          {connectedWallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`p-4 rounded-lg border transition-all ${
                wallet.isPrimary
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${getNetworkColor(wallet.network)}`}>
                    {wallet.networkIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{wallet.network}</span>
                      {wallet.isPrimary && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-mono text-muted-foreground">
                        {shortenAddress(wallet.address)}
                      </span>
                      <button
                        onClick={() => copyAddress(wallet.id, wallet.address)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedId === wallet.id ? (
                          <Check className="h-3 w-3 text-green-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                      <a
                        href={`https://etherscan.io/address/${wallet.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{wallet.balance}</p>
                  {!wallet.isPrimary && (
                    <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mt-1 ml-auto">
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
              {!wallet.isPrimary && (
                <div className="mt-3 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    Set as Primary
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Wallet */}
        <div className="p-4 border-t border-border">
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Connect Another Wallet
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Supports Ethereum, Polygon, Solana, Tron, Base and more
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
