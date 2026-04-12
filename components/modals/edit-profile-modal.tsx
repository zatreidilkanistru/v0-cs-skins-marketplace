"use client"

import { useState } from "react"
import { X, Camera, Upload, Twitter, Globe, MessageCircle, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EditProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProfileModal({ open, onOpenChange }: EditProfileModalProps) {
  const [nickname, setNickname] = useState("trader_pro")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")
  const [twitter, setTwitter] = useState("")
  const [discord, setDiscord] = useState("")
  const [telegram, setTelegram] = useState("")

  const handleSave = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Edit Profile</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your marketplace presence. Changes are visible to all users.
          </p>
        </DialogHeader>

        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Banner */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              Profile Banner
            </label>
            <div className="relative h-32 bg-secondary rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-600/20" />
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Upload className="h-4 w-4" />
                  <span>Upload Banner</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Recommended: 1400x400px, JPG or PNG</p>
          </div>

          {/* Avatar */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">TP</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-5 w-5 text-foreground" />
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Marketplace Nickname
              </label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="bg-input"
              />
              <p className="text-xs text-muted-foreground mt-1">This is independent from your Steam nickname.</p>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Steam Nickname
              </label>
              <Input
                value="МОЧА"
                disabled
                className="bg-secondary text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Synced from your Steam account.</p>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Bio
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short public bio for buyers. Tell them about your trading experience..."
                className="bg-input min-h-[100px] resize-none"
                maxLength={280}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">{bio.length}/280</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">
              Social Links
            </label>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="bg-input"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@username"
                  className="bg-input"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  placeholder="Discord username#0000"
                  className="bg-input"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@telegram_username"
                  className="bg-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
