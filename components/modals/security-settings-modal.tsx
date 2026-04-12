"use client"

import { useState } from "react"
import { X, Mail, Phone, Shield, Monitor, Check, ChevronRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SecuritySettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SecurityOption {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  status: "verified" | "pending" | "not_set"
  recommended?: boolean
}

export function SecuritySettingsModal({ open, onOpenChange }: SecuritySettingsModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const securityOptions: SecurityOption[] = [
    {
      id: "email",
      icon: <Mail className="h-5 w-5" />,
      title: "Email Verification",
      description: "Verify your email for account recovery and notifications",
      status: "verified",
    },
    {
      id: "phone",
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Verification",
      description: "Add a phone number for additional security",
      status: "not_set",
    },
    {
      id: "2fa",
      icon: <Shield className="h-5 w-5" />,
      title: "Two-Factor Authentication",
      description: "Secure your account with 2FA using an authenticator app",
      status: "not_set",
      recommended: true,
    },
    {
      id: "sessions",
      icon: <Monitor className="h-5 w-5" />,
      title: "Session Security",
      description: "Manage active sessions and trusted devices",
      status: "verified",
    },
  ]

  const getStatusBadge = (status: SecurityOption["status"]) => {
    switch (status) {
      case "verified":
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-green-400">
            <Check className="h-3 w-3" />
            Verified
          </span>
        )
      case "pending":
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-yellow-400">
            <AlertTriangle className="h-3 w-3" />
            Pending
          </span>
        )
      case "not_set":
        return (
          <span className="text-xs font-medium text-muted-foreground">
            Not configured
          </span>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Security Settings</DialogTitle>
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
            Manage email, phone, 2FA and active sessions from one place.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 space-y-3">
          {securityOptions.map((option) => (
            <button
              key={option.id}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                selectedOption === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50 hover:bg-secondary/50"
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                option.status === "verified" 
                  ? "bg-green-500/10 text-green-400"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{option.title}</h4>
                  {option.recommended && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(option.status)}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        {/* Steam Note */}
        <div className="mx-4 mb-4 p-3 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground">
            Password is managed by Steam sign-in for this account. You can change your Steam password through Steam settings.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <Button 
            variant="default"
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              // Navigate to full security center
              onOpenChange(false)
            }}
          >
            Open Security Center
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
