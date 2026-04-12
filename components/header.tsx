"use client"

import Link from "next/link"
import { Search, Wallet, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">SV</span>
          </div>
          <span className="text-xl font-bold text-foreground">SkinVault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Explore
          </Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Drops
          </Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Stats
          </Link>
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Create
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden flex-1 max-w-md mx-8 lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search skins, collections, and traders" 
              className="h-10 w-full bg-secondary pl-10 border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="hidden gap-2 sm:flex">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            Sign In
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium text-foreground">
              Explore
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Drops
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Stats
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Create
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button className="w-full gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
