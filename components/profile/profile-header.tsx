"use client"

import { useState } from "react"
import { Globe, Copy, Calendar, Settings, Edit } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EditProfileModal } from "@/components/modals/edit-profile-modal"
import { SecuritySettingsModal } from "@/components/modals/security-settings-modal"

export function ProfileHeader() {
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [securitySettingsOpen, setSecuritySettingsOpen] = useState(false)

  return (
    <>
      <div className="relative">
        {/* Banner Image */}
        <div className="h-48 w-full overflow-hidden md:h-64">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=400&fit=crop"
            alt="Profile banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-6 pb-6 pt-20">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <Avatar className="h-24 w-24 border-4 border-background md:h-32 md:w-32">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=mocha"
                alt="Profile avatar"
              />
              <AvatarFallback className="text-2xl">MO</AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">trader_pro</h1>
              <p className="text-sm text-muted-foreground">trader_pro</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a short bio so buyers can quickly understand who they trade with.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pb-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary"
                onClick={() => setSecuritySettingsOpen(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary"
                onClick={() => setEditProfileOpen(true)}
              >
                <Edit className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5" />
              UA
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
              <Copy className="h-3.5 w-3.5" />
              0x31b7...95bd
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
              <Calendar className="h-3.5 w-3.5" />
              Since 4/2/2026
            </span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal 
        open={editProfileOpen} 
        onOpenChange={setEditProfileOpen} 
      />
      <SecuritySettingsModal 
        open={securitySettingsOpen} 
        onOpenChange={setSecuritySettingsOpen} 
      />
    </>
  )
}
