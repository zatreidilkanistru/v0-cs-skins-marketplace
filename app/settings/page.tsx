"use client"

import { useState } from "react"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Globe,
  Lock,
  User,
  Wallet,
  Shield,
  Key,
  Smartphone,
  Mail,
  Monitor,
  Moon,
  Sun,
  Trash2,
  ExternalLink,
  Check,
  AlertTriangle,
  LogOut,
  Link2,
} from "lucide-react"

const settingsTabs = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "wallets", label: "Wallets", icon: Wallet },
  { id: "preferences", label: "Preferences", icon: Globe },
  { id: "connected", label: "Connected Apps", icon: Link2 },
]

function SettingsContent() {
  const { isCollapsed } = useSidebar()
  const [activeTab, setActiveTab] = useState("account")
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailTrade: true,
    emailSecurity: true,
    emailMarketing: false,
    pushTrade: true,
    pushPrice: true,
    pushMessages: true,
    inAppAll: true,
  })

  // Trade preferences
  const [tradePrefs, setTradePrefs] = useState({
    autoAcceptOffers: false,
    showOnline: true,
    allowMessages: true,
    hideInventory: false,
  })

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: true,
    emailVerified: true,
    phoneVerified: false,
    loginAlerts: true,
  })

  const connectedApps = [
    {
      name: "Steam",
      icon: "/steam.png",
      connected: true,
      username: "trader_pro",
      connectedAt: "Connected Jan 15, 2026",
    },
    {
      name: "Discord",
      icon: "/discord.png", 
      connected: true,
      username: "trader#1234",
      connectedAt: "Connected Feb 20, 2026",
    },
    {
      name: "Twitter",
      icon: "/twitter.png",
      connected: false,
    },
  ]

  const sessions = [
    {
      device: "Chrome on Windows",
      location: "New York, USA",
      current: true,
      lastActive: "Now",
    },
    {
      device: "Safari on iPhone",
      location: "New York, USA",
      current: false,
      lastActive: "2 hours ago",
    },
    {
      device: "Firefox on Mac",
      location: "Los Angeles, USA",
      current: false,
      lastActive: "3 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="flex gap-6">
              {/* Settings Tabs */}
              <div className="w-56 shrink-0">
                <nav className="space-y-1">
                  {settingsTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="flex-1 space-y-6">
                {/* Account Tab */}
                {activeTab === "account" && (
                  <>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                          <input
                            type="text"
                            defaultValue="trader_pro"
                            className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <input
                            type="email"
                            defaultValue="trader@example.com"
                            className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Bio</label>
                          <textarea
                            defaultValue="Professional CS2 skin trader. 1000+ successful trades."
                            className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <Button>Save Changes</Button>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4 text-red-500">Danger Zone</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-red-500/30 rounded-lg">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-xs text-muted-foreground">trader@example.com</p>
                            </div>
                          </div>
                          {security.emailVerified ? (
                            <span className="flex items-center gap-1 text-green-500 text-sm">
                              <Check className="h-4 w-4" /> Verified
                            </span>
                          ) : (
                            <Button size="sm">Verify</Button>
                          )}
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Phone</p>
                              <p className="text-xs text-muted-foreground">Not set</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Add Phone</Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <Shield className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Authenticator App</p>
                            <p className="text-sm text-muted-foreground">
                              Use an authenticator app for additional security
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={security.twoFactor}
                          onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                        />
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Active Sessions</h2>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out all
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {sessions.map((session, i) => (
                          <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Monitor className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium flex items-center gap-2">
                                  {session.device}
                                  {session.current && (
                                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">
                                      Current
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {session.location} • {session.lastActive}
                                </p>
                              </div>
                            </div>
                            {!session.current && (
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Revoke
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Email Notifications</h2>
                      <div className="space-y-4">
                        {[
                          { key: "emailTrade", label: "Trade Updates", desc: "Get notified about trade offers and completions" },
                          { key: "emailSecurity", label: "Security Alerts", desc: "Important security notifications" },
                          { key: "emailMarketing", label: "Marketing", desc: "News, updates, and promotional content" },
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch
                              checked={notifications[item.key as keyof typeof notifications]}
                              onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Push Notifications</h2>
                      <div className="space-y-4">
                        {[
                          { key: "pushTrade", label: "Trade Activity", desc: "Real-time trade notifications" },
                          { key: "pushPrice", label: "Price Alerts", desc: "Watchlist price drop notifications" },
                          { key: "pushMessages", label: "Messages", desc: "New message notifications" },
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch
                              checked={notifications[item.key as keyof typeof notifications]}
                              onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Wallets Tab */}
                {activeTab === "wallets" && (
                  <>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Connected Wallets</h2>
                        <Button>
                          <Wallet className="h-4 w-4 mr-2" />
                          Add Wallet
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {[
                          { address: "0x31b7...95bd", network: "Ethereum", primary: true, balance: "1,250.00 USDT" },
                          { address: "0x7a2c...3e9f", network: "Base", primary: false, balance: "500.00 USDC" },
                        ].map((wallet, i) => (
                          <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                                <Wallet className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium flex items-center gap-2">
                                  {wallet.address}
                                  {wallet.primary && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                      Primary
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {wallet.network} • {wallet.balance}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Appearance</h2>
                      <div className="flex gap-3">
                        {[
                          { value: "light", icon: Sun, label: "Light" },
                          { value: "dark", icon: Moon, label: "Dark" },
                          { value: "system", icon: Monitor, label: "System" },
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setTheme(option.value as typeof theme)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                              theme === option.value
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <option.icon className="h-5 w-5" />
                            <span className="text-sm font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Trade Preferences</h2>
                      <div className="space-y-4">
                        {[
                          { key: "autoAcceptOffers", label: "Auto-accept matching offers", desc: "Automatically accept offers that match your asking price" },
                          { key: "showOnline", label: "Show online status", desc: "Let others see when you're online" },
                          { key: "allowMessages", label: "Allow messages from anyone", desc: "Receive messages from non-friends" },
                          { key: "hideInventory", label: "Hide inventory from public", desc: "Only friends can see your inventory" },
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch
                              checked={tradePrefs[item.key as keyof typeof tradePrefs]}
                              onCheckedChange={(checked) => setTradePrefs({ ...tradePrefs, [item.key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-lg font-semibold mb-4">Language & Currency</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Language</label>
                          <select className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>English</option>
                            <option>Russian</option>
                            <option>Chinese</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Currency</label>
                          <select className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>CNY (¥)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Connected Apps Tab */}
                {activeTab === "connected" && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
                    <div className="space-y-4">
                      {connectedApps.map((app, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                              <span className="font-bold">{app.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium">{app.name}</p>
                              {app.connected ? (
                                <p className="text-xs text-muted-foreground">
                                  {app.username} • {app.connectedAt}
                                </p>
                              ) : (
                                <p className="text-xs text-muted-foreground">Not connected</p>
                              )}
                            </div>
                          </div>
                          {app.connected ? (
                            <Button variant="outline" size="sm" className="text-red-500">
                              Disconnect
                            </Button>
                          ) : (
                            <Button size="sm">Connect</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <SettingsContent />
    </SidebarProvider>
  )
}
