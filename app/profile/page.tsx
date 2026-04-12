"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { InventoryTab } from "@/components/profile/inventory-tab"
import { OffersTab } from "@/components/profile/offers-tab"
import { FavoritesTab } from "@/components/profile/favorites-tab"
import { ActivityTab } from "@/components/profile/activity-tab"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="min-h-screen">
      <ProfileHeader />
      <div className="px-6 py-4">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === "inventory" && <InventoryTab />}
          {activeTab === "offers" && <OffersTab />}
          {activeTab === "favorites" && <FavoritesTab />}
          {activeTab === "activity" && <ActivityTab />}
        </div>
      </div>
    </div>
  )
}
