"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { FloatValueBar, getWearName } from "@/components/item/float-value-bar"
import { PriceHistoryChart } from "@/components/item/price-history-chart"
import { StickerDisplay } from "@/components/item/sticker-display"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Share2,
  ExternalLink,
  Shield,
  Clock,
  Eye,
  ChevronLeft,
  Copy,
  Check,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { ConfirmPurchaseModal } from "@/components/modals/confirm-purchase-modal"
import { MakeOfferModal } from "@/components/modals/make-offer-modal"

// Mock item data
const mockItem = {
  id: "item-12345",
  name: "M4A4 | Howl",
  weapon: "M4A4",
  skin: "Howl",
  rarity: "Contraband",
  float: 0.0412,
  pattern: 547,
  price: 2450.00,
  currency: "USDT",
  imageUrl: "/placeholder-item.png",
  seller: {
    name: "trader_pro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trader",
    trustScore: 98,
    totalTrades: 1247,
    memberSince: "2023",
    verified: true,
  },
  stickers: [
    { name: "Titan (Holo)", position: 0, wear: 0.95, price: 450.00 },
    { name: "iBUYPOWER", position: 1, wear: 0.88, price: 320.00 },
    { name: "Navi (Holo)", position: 2, wear: 0.92, price: 180.00 },
  ],
  listedAt: "2 hours ago",
  views: 342,
  watchers: 28,
  inspectLink: "steam://rungame/730/...",
  acceptedTokens: ["USDT", "USDC", "ETH"],
  acceptedNetworks: ["Ethereum", "Base", "Polygon"],
}

function ItemDetailContent() {
  const { isCollapsed } = useSidebar()
  const params = useParams()
  const [isFavorited, setIsFavorited] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const item = mockItem

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rarityColors: Record<string, string> = {
    "Contraband": "text-amber-500 bg-amber-500/10 border-amber-500/30",
    "Covert": "text-red-500 bg-red-500/10 border-red-500/30",
    "Classified": "text-pink-500 bg-pink-500/10 border-pink-500/30",
    "Restricted": "text-purple-500 bg-purple-500/10 border-purple-500/30",
    "Mil-Spec": "text-blue-500 bg-blue-500/10 border-blue-500/30",
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? "72px" : "256px" }}
      >
        <TopHeader />
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Market
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/?category=rifles" className="text-muted-foreground hover:text-foreground transition-colors">
              Rifles
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{item.name}</span>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Image & Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Item Preview Card */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {/* Rarity bar */}
                  <div className={`h-1 ${item.rarity === "Contraband" ? "bg-amber-500" : "bg-red-500"}`} />
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded border ${rarityColors[item.rarity] || rarityColors["Covert"]}`}>
                            {item.rarity}
                          </span>
                          <span className="text-xs text-muted-foreground">Pattern #{item.pattern}</span>
                        </div>
                        <h1 className="text-2xl font-bold">{item.name}</h1>
                        <p className="text-muted-foreground">{getWearName(item.float)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsFavorited(!isFavorited)}
                          className={isFavorited ? "text-red-500 border-red-500/50" : ""}
                        >
                          <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleCopyLink}>
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Item Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="w-64 h-48 bg-gradient-to-br from-amber-500/20 to-red-500/10 rounded-lg flex items-center justify-center mx-auto">
                          <span className="text-6xl font-bold text-amber-500/50">M4A4</span>
                        </div>
                      </div>
                      
                      {/* Inspect button */}
                      <a
                        href={item.inspectLink}
                        className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border rounded-lg text-sm hover:bg-background transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Inspect in-game
                      </a>
                    </div>

                    {/* Float Value */}
                    <FloatValueBar float={item.float} size="lg" />
                  </div>
                </div>

                {/* Stickers */}
                {item.stickers.length > 0 && (
                  <StickerDisplay stickers={item.stickers} />
                )}

                {/* Price History */}
                <PriceHistoryChart itemName={item.name} />

                {/* Similar Listings */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Similar Listings</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-secondary/30 border border-border rounded-lg p-3 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="aspect-square bg-secondary/50 rounded mb-2 flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">M4A4</span>
                        </div>
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">FT • 0.23</p>
                        <p className="text-sm font-semibold text-primary mt-1">${(item.price * (0.8 + Math.random() * 0.4)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Purchase Card */}
              <div className="space-y-4">
                {/* Price Card */}
                <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {item.views} views
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold">${item.price.toFixed(2)}</span>
                    <span className="text-muted-foreground">{item.currency}</span>
                  </div>

                  {/* Accepted payment */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Accepted tokens</p>
                    <div className="flex gap-2">
                      {item.acceptedTokens.map(token => (
                        <span key={token} className="px-2 py-1 bg-secondary text-xs rounded">
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Accepted networks</p>
                    <div className="flex flex-wrap gap-2">
                      {item.acceptedNetworks.map(network => (
                        <span key={network} className="px-2 py-1 bg-secondary text-xs rounded">
                          {network}
                        </span>
                      ))}
                    </div>
                  </div>

<div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => setShowPurchaseModal(true)}>
                  Buy Now
                </Button>
                    <Button variant="outline" className="w-full" size="lg" onClick={() => setShowOfferModal(true)}>
                      Make Offer
                    </Button>
                  </div>

                  {/* Trade protection */}
                  <div className="flex items-center gap-2 mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500">Protected by escrow</span>
                  </div>
                </div>

                {/* Seller Card */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Seller</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                      <img src={item.seller.avatar} alt={item.seller.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.seller.name}</span>
                        {item.seller.verified && (
                          <Shield className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Member since {item.seller.memberSince}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Trust Score</p>
                      <p className="text-lg font-semibold text-green-500">{item.seller.trustScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Trades</p>
                      <p className="text-lg font-semibold">{item.seller.totalTrades}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/profile/${item.seller.name}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>

                {/* Listing Info */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Listing Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listed</span>
                      <span>{item.listedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Watchers</span>
                      <span>{item.watchers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Item ID</span>
                      <button 
                        className="flex items-center gap-1 text-primary hover:underline"
                        onClick={() => navigator.clipboard.writeText(item.id)}
                      >
                        {item.id.slice(0, 10)}...
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-500">Safety Reminder</p>
                      <p className="text-xs text-yellow-500/80 mt-1">
                        Always verify the Steam trade URL before confirming. Never share your login credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <MakeOfferModal
        open={showOfferModal}
        onOpenChange={setShowOfferModal}
        item={{
          name: item.name,
          image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UY5NjvxcNSUdQc2ZA7TqVa4wuu5gMK0uM7LnXA17iIi5XrZln-JuONZ/360fx360f",
          currentPrice: item.price,
          seller: item.seller.name,
        }}
      />
      <ConfirmPurchaseModal
        open={showPurchaseModal}
        onOpenChange={setShowPurchaseModal}
        item={{
          name: item.name,
          wear: getWearName(item.float),
          price: item.price,
          image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UY5NjvxcNSUdQc2ZA7TqVa4wuu5gMK0uM7LnXA17iIi5XrZln-JuONZ/360fx360f",
          seller: {
            name: item.seller.name,
            trustScore: item.seller.trustScore,
            trades: item.seller.totalTrades,
          },
        }}
      />
    </div>
  )
}

export default function ItemDetailPage() {
  return (
    <SidebarProvider>
      <ItemDetailContent />
    </SidebarProvider>
  )
}
