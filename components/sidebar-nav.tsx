"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShoppingCart,
  RefreshCw,
  Package,
  Users,
  User,
  ArrowLeftRight,
  HelpCircle,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/components/sidebar-context"

const mainNavItems = [
  { icon: ShoppingCart, label: "Market", href: "/" },
  { icon: RefreshCw, label: "My trades", href: "/trades" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "Friends", href: "/friends" },
  { icon: User, label: "Profile", href: "/profile" },
]

const secondaryNavItems = [
  { icon: ArrowLeftRight, label: "Bridge", href: "/bridge", badge: "BETA" },
]

const bottomNavItems = [
  { icon: HelpCircle, label: "Support & FAQ", href: "/support" },
  { icon: Shield, label: "Admin", href: "/admin", highlight: true },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="flex h-16 items-center justify-between px-3">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground flex-shrink-0">
            C
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-foreground">CS2 OTC</span>
          )}
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isCollapsed && "justify-center px-2",
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="my-4 border-t border-border" />

        <ul className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isCollapsed && "justify-center px-2",
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      {item.label}
                      {item.badge && (
                        <span className="ml-auto rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="my-4 border-t border-border" />

        <ul className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isCollapsed && "justify-center px-2",
                    item.highlight
                      ? "text-primary hover:bg-sidebar-accent/50"
                      : isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-3">
        <div className={cn(
          "flex items-center gap-3 rounded-lg bg-sidebar-accent p-3",
          isCollapsed && "justify-center p-2"
        )}>
          <Avatar className={cn("flex-shrink-0", isCollapsed ? "h-8 w-8" : "h-10 w-10")}>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=trader" alt="User avatar" />
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">trader_pro</p>
              <p className="truncate text-xs text-muted-foreground">0x31b7...95bd</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
