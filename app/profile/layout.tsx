import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="pl-64">
        <TopHeader />
        <main>{children}</main>
      </div>
    </div>
  )
}
