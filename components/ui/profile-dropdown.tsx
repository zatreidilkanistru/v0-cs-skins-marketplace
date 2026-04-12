"use client"

import { useState } from "react"
import { User, Settings, Wallet, Shield, LogOut, ChevronRight, Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditProfileModal } from "@/components/modals/edit-profile-modal"
import { SecuritySettingsModal } from "@/components/modals/security-settings-modal"
import { ManageWalletsModal } from "@/components/modals/manage-wallets-modal"

export function ProfileDropdown() {
  const [copied, setCopied] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [securityOpen, setSecurityOpen] = useState(false)
  const [walletsOpen, setWalletsOpen] = useState(false)

  const walletAddress = "0x31b7...95bd"
  const fullWalletAddress = "0x31b7c2a89f456d1e2b3c4d5e6f7890ab12cd95bd"

  const copyAddress = () => {
    navigator.clipboard.writeText(fullWalletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">TP</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-0">
          {/* Profile Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">TP</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">trader_pro</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">{walletAddress}</span>
                  <button
                    onClick={copyAddress}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">127</p>
                <p className="text-xs text-muted-foreground">Trades</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-primary">98.5%</p>
                <p className="text-xs text-muted-foreground">Trust</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">$12.4k</p>
                <p className="text-xs text-muted-foreground">Volume</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <DropdownMenuItem asChild>
              <a href="/profile" className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>View Profile</span>
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="flex items-center justify-between cursor-pointer"
              onSelect={(e) => {
                e.preventDefault()
                setEditProfileOpen(true)
              }}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Edit Profile</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="flex items-center justify-between cursor-pointer"
              onSelect={(e) => {
                e.preventDefault()
                setWalletsOpen(true)
              }}
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span>Manage Wallets</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="flex items-center justify-between cursor-pointer"
              onSelect={(e) => {
                e.preventDefault()
                setSecurityOpen(true)
              }}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Security Settings</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          <div className="p-2">
            <DropdownMenuItem className="flex items-center gap-3 text-red-400 hover:text-red-400 cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProfileModal open={editProfileOpen} onOpenChange={setEditProfileOpen} />
      <SecuritySettingsModal open={securityOpen} onOpenChange={setSecurityOpen} />
      <ManageWalletsModal open={walletsOpen} onOpenChange={setWalletsOpen} />
    </>
  )
}
