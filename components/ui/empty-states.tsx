"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Eye,
  Search,
  RefreshCw,
  Heart,
} from "lucide-react"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
        action.href ? (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      )}
    </div>
  )
}

export function EmptyInventory() {
  return (
    <EmptyState
      icon={<Package className="h-8 w-8 text-muted-foreground" />}
      title="No items in inventory"
      description="Your inventory is empty. Purchase items from the market to get started."
      action={{ label: "Browse Market", href: "/" }}
    />
  )
}

export function EmptyTrades() {
  return (
    <EmptyState
      icon={<RefreshCw className="h-8 w-8 text-muted-foreground" />}
      title="No active trades"
      description="You don't have any active trades. Start by browsing the market or listing an item."
      action={{ label: "Browse Market", href: "/" }}
    />
  )
}

export function EmptyFriends() {
  return (
    <EmptyState
      icon={<Users className="h-8 w-8 text-muted-foreground" />}
      title="No friends yet"
      description="Add friends to see their inventory and trade with them more easily."
      action={{ label: "Find Friends", href: "/" }}
    />
  )
}

export function EmptyMessages() {
  return (
    <EmptyState
      icon={<MessageSquare className="h-8 w-8 text-muted-foreground" />}
      title="No messages"
      description="Start a conversation with another trader or wait for incoming messages."
    />
  )
}

export function EmptyWatchlist() {
  return (
    <EmptyState
      icon={<Eye className="h-8 w-8 text-muted-foreground" />}
      title="Watchlist is empty"
      description="Add items to your watchlist to track prices and get notifications when they drop."
      action={{ label: "Browse Market", href: "/" }}
    />
  )
}

export function EmptySearchResults() {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8 text-muted-foreground" />}
      title="No results found"
      description="Try adjusting your search or filter criteria to find what you're looking for."
    />
  )
}

export function EmptyFavorites() {
  return (
    <EmptyState
      icon={<Heart className="h-8 w-8 text-muted-foreground" />}
      title="No favorites yet"
      description="Items you favorite will appear here for quick access."
      action={{ label: "Browse Market", href: "/" }}
    />
  )
}

export function EmptyCart() {
  return (
    <EmptyState
      icon={<ShoppingCart className="h-8 w-8 text-muted-foreground" />}
      title="Your cart is empty"
      description="Add items to your cart to purchase multiple items at once."
      action={{ label: "Browse Market", href: "/" }}
    />
  )
}
