"use client"

import Image from "next/image"
import { X, MessageSquare, AlertTriangle, CheckCircle, Clock, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TradeDetailProps {
  tradeId: string
  onClose: () => void
}

const tradeData = {
  id: "1",
  item: {
    name: "MP9 | Sand Dashed",
    wear: "Battle-Scarred",
    image: "/placeholder.svg?height=120&width=160",
  },
  price: {
    gross: 12,
    fee: 0.6,
    feeBps: 500,
    net: 11.4,
    currency: "USDT",
  },
  role: "seller" as const,
  escrowStatus: "Locked",
  tradeNumber: "Pending",
  counterparty: "0x8f2a...4c21",
  confirmations: { current: 0, required: 2 },
  steps: [
    { label: "Escrow locked", status: "done" as const },
    { label: "Steam verified", status: "current" as const },
    { label: "Both sides confirmed", status: "pending" as const },
    { label: "Release or refund", status: "pending" as const },
  ],
  nextAction: {
    title: "Send the Steam offer",
    description: "After delivery, record the Steam offer ID so the backend can verify the handoff and unlock the settlement flow.",
  },
}

export function TradeDetail({ tradeId, onClose }: TradeDetailProps) {
  // In real app, fetch trade by ID
  const trade = tradeData

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-14 bg-secondary/50 rounded flex items-center justify-center overflow-hidden">
            <Image
              src={trade.item.image}
              alt={trade.item.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className={`font-medium ${trade.role === "seller" ? "text-primary" : "text-blue-400"}`}>
                {trade.role === "seller" ? "SELLER VIEW" : "BUYER VIEW"}
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span>BASE</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {trade.item.name} ({trade.item.wear})
            </h3>
            <p className="text-sm text-muted-foreground">
              Escrow status: <span className="text-foreground">{trade.escrowStatus}</span>
              {" | "}
              Trade #{trade.tradeNumber}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Trade chat
        </Button>
        <Button variant="outline" size="sm" className="gap-2 text-red-400 hover:text-red-400 hover:bg-red-500/10">
          <AlertTriangle className="h-4 w-4" />
          Escalate
        </Button>
      </div>

      {/* Next Action Banner */}
      <div className="mx-4 mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Your next step: {trade.nextAction.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {trade.nextAction.description}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          {trade.steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className={`p-3 rounded-lg text-center ${
                step.status === "done" 
                  ? "bg-green-500/10 border border-green-500/30" 
                  : step.status === "current"
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-secondary border border-border"
              }`}>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {step.status === "done" ? (
                    <CheckCircle className="h-3 w-3 text-green-400" />
                  ) : step.status === "current" ? (
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                  ) : (
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={`text-[10px] uppercase font-medium ${
                    step.status === "done" 
                      ? "text-green-400" 
                      : step.status === "current"
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}>
                    {step.status === "done" ? "Done" : step.status === "current" ? "Current" : "Pending"}
                  </span>
                </div>
                <p className={`text-xs font-medium ${
                  step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                }`}>
                  {step.label}
                </p>
              </div>
              {index < trade.steps.length - 1 && (
                <div className={`absolute top-1/2 -right-1 w-2 h-0.5 ${
                  step.status === "done" ? "bg-green-500/50" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Financial Info */}
      <div className="grid grid-cols-4 gap-2 px-4 pb-4">
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-[10px] uppercase text-muted-foreground font-medium">Gross</p>
          <p className="text-lg font-semibold text-foreground">{trade.price.gross}</p>
          <p className="text-xs text-muted-foreground">{trade.price.currency}</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-[10px] uppercase text-muted-foreground font-medium">Fee</p>
          <p className="text-lg font-semibold text-foreground">{trade.price.fee}</p>
          <p className="text-xs text-muted-foreground">{trade.price.feeBps} bps</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-[10px] uppercase text-muted-foreground font-medium">You receive</p>
          <p className="text-lg font-semibold text-foreground">{trade.price.net}</p>
          <p className="text-xs text-muted-foreground">Seller proceeds</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-[10px] uppercase text-muted-foreground font-medium">Confirmations</p>
          <p className="text-lg font-semibold text-foreground">
            {trade.confirmations.current}/{trade.confirmations.required}
          </p>
          <p className="text-xs text-muted-foreground">Server-gated</p>
        </div>
      </div>

      {/* Steam Verification */}
      <div className="mx-4 mb-4 p-4 bg-secondary/30 border border-border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs uppercase font-medium text-muted-foreground">
              Steam Delivery Verification
            </p>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
              Trade offer not submitted
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Steam offer ID or link"
            className="flex-1 bg-input border-border"
          />
          <Button className="gap-2">
            <Copy className="h-4 w-4" />
            Save offer ID
          </Button>
        </div>
      </div>

      {/* Counterparty */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Trading with:</span>
            <span className="text-sm font-mono text-foreground">{trade.counterparty}</span>
          </div>
          <button className="p-1.5 hover:bg-secondary rounded transition-colors">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
