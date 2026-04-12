"use client"

import { useState } from "react"
import { Bell, Shield, ShoppingCart, AlertTriangle, Check, ChevronRight, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "security" | "trade" | "alert" | "system"
  title: string
  message: string
  time: string
  read: boolean
  action?: {
    label: string
    href: string
  }
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "security",
    title: "Recovery verification issued",
    message: "A recovery email verification code was generated for kakarun69@gmail.com.",
    time: "23h ago",
    read: false,
    action: { label: "Open Profile", href: "/profile" }
  },
  {
    id: "2",
    type: "security",
    title: "Recovery email updated",
    message: "Recovery contact changed to kakarun69@gmail.com.",
    time: "23h ago",
    read: false,
    action: { label: "Open Profile", href: "/profile" }
  },
  {
    id: "3",
    type: "security",
    title: "Login alerts enabled",
    message: "New browser sessions will create security alerts in your profile.",
    time: "1d ago",
    read: true,
  },
  {
    id: "4",
    type: "trade",
    title: "Trade completed",
    message: "Your purchase of AWP | Dragon Lore has been completed successfully.",
    time: "2d ago",
    read: true,
  },
]

export function NotificationDropdown() {
  const [items, setItems] = useState(notifications)
  const unreadCount = items.filter(n => !n.read).length

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, read: true })))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "security": return <Shield className="h-4 w-4" />
      case "trade": return <ShoppingCart className="h-4 w-4" />
      case "alert": return <AlertTriangle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getBadgeColor = (type: Notification["type"]) => {
    switch (type) {
      case "security": return "bg-yellow-500/20 text-yellow-400"
      case "trade": return "bg-green-500/20 text-green-400"
      case "alert": return "bg-red-500/20 text-red-400"
      default: return "bg-primary/20 text-primary"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">Notification Center</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={markAllRead}
            >
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            items.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${
                  !notification.read ? "bg-secondary/30" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getBadgeColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${getBadgeColor(notification.type)}`}>
                        {notification.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{notification.message}</p>
                    {notification.action && (
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">Security review recommended</span>
                        <a 
                          href={notification.action.href}
                          className="text-xs font-medium text-foreground hover:text-primary flex items-center gap-1"
                        >
                          {notification.action.label}
                          <ChevronRight className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
