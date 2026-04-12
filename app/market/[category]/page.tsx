"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Tag, 
  TrendingUp, 
  ShoppingCart, 
  Search,
  LayoutGrid,
  List,
  Filter,
  Shield,
  ChevronDown,
  Heart,
  ExternalLink
} from "lucide-react"
import { ConfirmPurchaseModal } from "@/components/modals/confirm-purchase-modal"

// Category data with stats
const categoryData: Record<string, { 
  name: string
  description: string
  floor: string | null
  topOffer: string | null
  listed: number
  image?: string
}> = {
  "knives": {
    name: "Knives",
    description: "Premium knife skins including Karambit, Butterfly, and more. Compare floor, best bid and listing availability.",
    floor: "45.00 USDT",
    topOffer: "42.50 USDT",
    listed: 24,
  },
  "gloves": {
    name: "Gloves",
    description: "Compare floor, best bid and listing availability, then open a listing for full buyer or owner actions.",
    floor: "38.00 USDT",
    topOffer: "35.00 USDT",
    listed: 12,
  },
  "pistol": {
    name: "Pistol",
    description: "Desert Eagle, USP-S, Glock-18 and more pistol skins. Find the best deals on pistol collections.",
    floor: "5.50 USDT",
    topOffer: "5.00 USDT",
    listed: 156,
  },
  "rifle": {
    name: "Rifle",
    description: "AK-47, M4A4, M4A1-S and other rifle skins. Browse the most popular weapon category.",
    floor: "12.00 USDT",
    topOffer: "11.50 USDT",
    listed: 234,
  },
  "smg": {
    name: "SMG",
    description: "MP9, MAC-10, UMP-45 and other SMG skins at competitive prices.",
    floor: "1.00 USDT",
    topOffer: "0.85 USDT",
    listed: 89,
  },
  "sniper-rifle": {
    name: "Sniper Rifle",
    description: "AWP, SSG 08 and other sniper rifle skins. Find your perfect scope companion.",
    floor: "8.00 USDT",
    topOffer: "7.50 USDT",
    listed: 67,
  },
  "shotgun": {
    name: "Shotgun",
    description: "Nova, XM1014, MAG-7 and other shotgun skins for close-quarter combat.",
    floor: "0.50 USDT",
    topOffer: "0.40 USDT",
    listed: 43,
  },
  "machine-gun": {
    name: "Machine Gun",
    description: "M249, Negev and other heavy machine gun skins.",
    floor: "0.75 USDT",
    topOffer: "0.60 USDT",
    listed: 28,
  },
}

// Sample listings for the category
const generateListings = (category: string) => [
  {
    id: "1",
    name: `${category === "knives" ? "Karambit | Doppler" : category === "gloves" ? "Sport Gloves | Pandora's Box" : category === "rifle" ? "AK-47 | Asiimov" : "AWP | Dragon Lore"}`,
    wear: "Factory New",
    float: 0.0123,
    price: "125.00",
    token: "USDT",
    seller: "trader_pro",
    trust: 98,
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5u5cB1g_zF9N73igrgrUc9YG_wdYKXJlc7NV2F8gDryevqhpK5vpnPyXNhuCEi5n-JmR2wgx9SLrs4iZpxEfI/360fx360f",
    stickers: 2,
  },
  {
    id: "2",
    name: `${category === "knives" ? "Butterfly Knife | Fade" : category === "gloves" ? "Driver Gloves | King Snake" : category === "rifle" ? "M4A4 | Howl" : "AWP | Gungnir"}`,
    wear: "Minimal Wear",
    float: 0.0834,
    price: "89.50",
    token: "USDT",
    seller: "skin_master",
    trust: 95,
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UY5NjvxcNSUdQc2ZA7TqVa4wuu5gMK0uM7LnXA17iIi5XrZln-JuONZ/360fx360f",
    stickers: 0,
  },
  {
    id: "3",
    name: `${category === "knives" ? "M9 Bayonet | Tiger Tooth" : category === "gloves" ? "Specialist Gloves | Crimson Web" : category === "rifle" ? "AK-47 | Fire Serpent" : "SSG 08 | Dragonfire"}`,
    wear: "Field-Tested",
    float: 0.2156,
    price: "67.25",
    token: "USDT",
    seller: "cs2_dealer",
    trust: 92,
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjVWx_hE_ZWmldo-Xdg46Z1yD8wK2l-jp1pO0vM7MzHRivCAr4ivYzRS1n1gSOQvDVxz0/360fx360f",
    stickers: 4,
  },
  {
    id: "4",
    name: `${category === "knives" ? "Huntsman Knife | Crimson Web" : category === "gloves" ? "Moto Gloves | POW!" : category === "rifle" ? "M4A1-S | Printstream" : "AWP | Fade"}`,
    wear: "Well-Worn",
    float: 0.4012,
    price: "45.00",
    token: "ETH",
    seller: "elite_trader",
    trust: 88,
    image: "https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6/360fx360f",
    stickers: 1,
  },
]

// All categories for the sidebar filter
const allCategories = [
  "Knives", "Gloves", "Pistol", "Rifle", "SMG", "Sniper Rifle", "Shotgun", "Machine Gun", "Case", "Sticker"
]

const paymentTokens = ["USDT", "ETH", "USDC"]
const networks = ["Base", "Ethereum", "Solana", "Polygon", "Tron"]
const cryptoFilters = ["USDT", "USDC", "ETH", "Base", "Ethereum", "Solana", "Polygon", "Tron"]

function CollectionContent() {
  const { isCollapsed } = useSidebar()
  const params = useParams()
  const category = params.category as string
  const data = categoryData[category] || { 
    name: category.charAt(0).toUpperCase() + category.slice(1).replace("-", " "), 
    description: "Browse and trade items in this collection.",
    floor: null,
    topOffer: null,
    listed: 0
  }

  const [layout, setLayout] = useState<"comfortable" | "compact">("comfortable")
  const [activeTab, setActiveTab] = useState<"items" | "activity" | "analytics">("items")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([data.name])
  const [selectedTokens, setSelectedTokens] = useState<string[]>([])
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([])
  const [activeCrypto, setActiveCrypto] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(true)
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false)
  const [selectedListing, setSelectedListing] = useState<any>(null)

  const listings = generateListings(category)

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleToken = (token: string) => {
    setSelectedTokens(prev => 
      prev.includes(token) ? prev.filter(t => t !== token) : [...prev, token]
    )
  }

  const toggleNetwork = (network: string) => {
    setSelectedNetworks(prev => 
      prev.includes(network) ? prev.filter(n => n !== network) : [...prev, network]
    )
  }

  const resetFilters = () => {
    setSelectedCategories([data.name])
    setSelectedTokens([])
    setSelectedNetworks([])
    setActiveCrypto(null)
    setSearchQuery("")
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
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to market
          </Link>

          {/* Collection Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
            <p className="text-muted-foreground max-w-2xl">{data.description}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Floor</span>
                <Tag className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{data.floor || "0 USDT"}</p>
              <p className="text-xs text-muted-foreground mt-1">Best current entry listing.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Top Offer</span>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{data.topOffer || "0 USDT"}</p>
              <p className="text-xs text-muted-foreground mt-1">Highest active buyer bid.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Listed</span>
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{data.listed}</p>
              <p className="text-xs text-muted-foreground mt-1">Assets available right now.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex gap-6">
            {/* Left Sidebar Filters */}
            {showFilters && (
              <aside className="w-64 flex-shrink-0 space-y-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="font-medium">Collection filters</span>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedCategories.includes(cat)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Token Filter */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Payment Token</h4>
                    <div className="flex flex-wrap gap-2">
                      {paymentTokens.map((token) => (
                        <button
                          key={token}
                          onClick={() => toggleToken(token)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedTokens.includes(token)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {token}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Network Filter */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Network</h4>
                    <div className="flex flex-wrap gap-2">
                      {networks.map((network) => (
                        <button
                          key={network}
                          onClick={() => toggleNetwork(network)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedNetworks.includes(network)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {network}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trade Safety Info */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">Trade safety</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Funds lock in escrow first. Steam delivery is verified before release.
                  </p>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search and Filter Bar */}
              <div className="bg-card border border-border rounded-xl p-4 mb-4">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by item name, collection or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 bg-secondary rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="newest">Newest first</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="float-low">Float: Low to High</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* Layout Toggle */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>LAYOUT</span>
                    <div className="flex bg-secondary rounded-lg p-0.5">
                      <button
                        onClick={() => setLayout("comfortable")}
                        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                          layout === "comfortable" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Comfortable
                      </button>
                      <button
                        onClick={() => setLayout("compact")}
                        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                          layout === "compact" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Compact
                      </button>
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset filters
                  </Button>

                  {/* Toggle Filters Button */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {showFilters ? "Hide" : "Show"} filters
                  </Button>
                </div>

                {/* Crypto Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {cryptoFilters.map((crypto) => (
                    <button
                      key={crypto}
                      onClick={() => setActiveCrypto(activeCrypto === crypto ? null : crypto)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        activeCrypto === crypto
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {crypto}
                    </button>
                  ))}
                  <button
                    onClick={() => setActiveCrypto(activeCrypto === data.name ? null : data.name)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      activeCrypto === data.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {data.name}
                  </button>
                </div>

                {/* Listing Count & Verification Badge */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="text-foreground font-medium">{listings.length}</span> live listings in {data.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <Shield className="w-4 h-4" />
                    Escrow + Steam verification active
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-4 border-b border-border">
                {(["items", "activity", "analytics"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "items" && (
                <div className={`grid gap-4 ${
                  layout === "comfortable" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                }`}>
                  {listings.length > 0 ? (
                    listings.map((listing) => (
                      <div 
                        key={listing.id}
                        className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-colors"
                      >
                        <Link href={`/item/${listing.id}`}>
                          <div className="relative aspect-square bg-secondary/50 p-4">
                            <img
                              src={listing.image}
                              alt={listing.name}
                              className="w-full h-full object-contain"
                            />
                            {listing.stickers > 0 && (
                              <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 rounded text-xs font-medium">
                                {listing.stickers} Stickers
                              </div>
                            )}
                            <button 
                              className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault()
                                // Add to favorites logic
                              }}
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                        </Link>
                        <div className="p-3">
                          <Link href={`/item/${listing.id}`}>
                            <h3 className="font-medium text-sm truncate hover:text-primary transition-colors">
                              {listing.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{listing.wear}</span>
                            <span>|</span>
                            <span>Float: {listing.float.toFixed(4)}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              <p className="font-semibold">{listing.price} {listing.token}</p>
                              <p className="text-xs text-muted-foreground">{listing.trust}% trust</p>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedListing(listing)
                                setPurchaseModalOpen(true)
                              }}
                            >
                              Buy
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full bg-card border border-border rounded-xl p-12 text-center">
                      <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No listings matched the current filters</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Reset the filters to see more listings, or check back later.
                      </p>
                      <Button variant="outline" onClick={resetFilters}>Reset filters</Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "activity" && (
                <div className="bg-card border border-border rounded-xl">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">Recent Activity</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      { event: "Sale", item: "Karambit | Doppler", price: "125.00 USDT", from: "trader_pro", to: "buyer123", time: "2 min ago" },
                      { event: "Listing", item: "Butterfly Knife | Fade", price: "89.50 USDT", from: "skin_master", to: "-", time: "15 min ago" },
                      { event: "Offer", item: "M9 Bayonet | Tiger Tooth", price: "65.00 USDT", from: "deal_hunter", to: "cs2_dealer", time: "1 hour ago" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 p-4">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.event === "Sale" ? "bg-green-500/20 text-green-500" :
                          activity.event === "Listing" ? "bg-blue-500/20 text-blue-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {activity.event}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{activity.item}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{activity.price}</p>
                          <p className="text-xs text-muted-foreground">{activity.from} → {activity.to}</p>
                        </div>
                        <p className="text-xs text-muted-foreground w-20 text-right">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Collection Analytics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase">24h Volume</p>
                      <p className="text-xl font-bold mt-1">1,234.56 USDT</p>
                      <p className="text-xs text-green-500">+12.5%</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase">7d Volume</p>
                      <p className="text-xl font-bold mt-1">8,567.89 USDT</p>
                      <p className="text-xs text-green-500">+8.3%</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase">Total Sales</p>
                      <p className="text-xl font-bold mt-1">456</p>
                      <p className="text-xs text-muted-foreground">All time</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase">Unique Owners</p>
                      <p className="text-xl font-bold mt-1">234</p>
                      <p className="text-xs text-muted-foreground">Wallets</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Purchase Modal */}
      {selectedListing && (
        <ConfirmPurchaseModal
          open={purchaseModalOpen}
          onOpenChange={setPurchaseModalOpen}
          item={{
            name: selectedListing.name,
            wear: selectedListing.wear,
            price: parseFloat(selectedListing.price),
            image: selectedListing.image,
            seller: {
              name: selectedListing.seller,
              trustScore: selectedListing.trust,
              trades: 100,
            },
          }}
        />
      )}
    </div>
  )
}

export default function CollectionPage() {
  return (
    <SidebarProvider>
      <CollectionContent />
    </SidebarProvider>
  )
}
