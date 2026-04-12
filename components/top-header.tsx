"use client"

import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchDropdown } from "@/components/ui/search-dropdown"
import { NotificationDropdown } from "@/components/ui/notification-dropdown"
import { ProfileDropdown } from "@/components/ui/profile-dropdown"
import { WalletDropdown } from "@/components/ui/wallet-dropdown"

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Search */}
      <SearchDropdown />

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Globe className="h-4 w-4" />
              <span>EN</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
            <DropdownMenuItem>Espanol</DropdownMenuItem>
            <DropdownMenuItem>Francais</DropdownMenuItem>
            <DropdownMenuItem>Русский</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Wallet Balance */}
        <WalletDropdown />

        {/* Notifications */}
        <NotificationDropdown />

        {/* Profile */}
        <ProfileDropdown />
      </div>
    </header>
  )
}
