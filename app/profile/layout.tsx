"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
    </SidebarProvider>
  )
}
