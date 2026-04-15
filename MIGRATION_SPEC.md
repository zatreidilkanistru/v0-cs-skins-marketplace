# CS2 OTC Marketplace - Complete UI Migration Specification

## SECTION 1 - REPOSITORY COMPLETENESS CHECK

### 1.1 Full File Tree

```
/app
  /admin/page.tsx
  /bridge/page.tsx
  /friends/page.tsx
  /history/page.tsx
  /inventory/page.tsx
  /item/[id]/page.tsx
  /market/[category]/page.tsx
  /messages/page.tsx
  /profile/layout.tsx
  /profile/page.tsx
  /settings/page.tsx
  /support/page.tsx
  /trades/page.tsx
  /watchlist/page.tsx
  globals.css
  layout.tsx
  page.tsx

/components
  /inventory
    inventory-filters.tsx
    inventory-grid.tsx
    inventory-header.tsx
  /item
    float-value-bar.tsx
    price-history-chart.tsx
    sticker-display.tsx
  /modals
    confirm-purchase-modal.tsx
    create-listing-modal.tsx
    edit-profile-modal.tsx
    make-offer-modal.tsx
    manage-wallets-modal.tsx
    security-settings-modal.tsx
  /profile
    activity-tab.tsx
    favorites-tab.tsx
    inventory-tab.tsx
    offers-tab.tsx
    profile-header.tsx
    profile-tabs.tsx
  /trades
    trade-detail.tsx
    trades-header.tsx
    trades-list.tsx
  /ui
    accordion.tsx
    alert-dialog.tsx
    alert.tsx
    aspect-ratio.tsx
    avatar.tsx
    badge.tsx
    breadcrumb.tsx
    button-group.tsx
    button.tsx
    calendar.tsx
    card.tsx
    carousel.tsx
    chart.tsx
    checkbox.tsx
    collapsible.tsx
    command.tsx
    context-menu.tsx
    dialog.tsx
    drawer.tsx
    dropdown-menu.tsx
    empty-states.tsx
    empty.tsx
    field.tsx
    form.tsx
    hover-card.tsx
    input-group.tsx
    input-otp.tsx
    input.tsx
    item.tsx
    kbd.tsx
    label.tsx
    menubar.tsx
    navigation-menu.tsx
    notification-dropdown.tsx
    pagination.tsx
    popover.tsx
    profile-dropdown.tsx
    progress.tsx
    radio-group.tsx
    resizable.tsx
    scroll-area.tsx
    search-dropdown.tsx
    select.tsx
    separator.tsx
    sheet.tsx
    sidebar.tsx
    skeleton.tsx
    skeletons.tsx
    slider.tsx
    sonner.tsx
    spinner.tsx
    switch.tsx
    table.tsx
    tabs.tsx
    textarea.tsx
    toast.tsx
    toaster.tsx
    toggle-group.tsx
    toggle.tsx
    tooltip.tsx
    use-mobile.tsx
    use-toast.ts
    wallet-dropdown.tsx
  category-cards.tsx
  crypto-filter.tsx
  hero-section.tsx
  marketplace-grid.tsx
  recently-viewed.tsx
  sidebar-context.tsx
  sidebar-nav.tsx
  theme-provider.tsx
  top-header.tsx

/hooks
  use-mobile.ts
  use-toast.ts

/lib
  utils.ts

/styles
  globals.css (duplicate, use /app/globals.css)

components.json
next-env.d.ts
package.json
tsconfig.json
```

### 1.2 Missing Files
- None identified

### 1.3 Missing Dependencies
- None - all dependencies in package.json

### 1.4 Placeholder/Stub Files
- `/styles/globals.css` - duplicate, ignore (use `/app/globals.css`)

### 1.5 Source of Truth Files
All files in `/app` and `/components` directories are production source.

---

## SECTION 2 - SOURCE OF TRUTH MAP

### 2.1 Global Layout
| File | Purpose |
|------|---------|
| `/app/layout.tsx` | Root HTML structure, font loading, metadata |
| `/app/globals.css` | All CSS variables, theme tokens, base styles |

### 2.2 Typography
| Source | Value |
|--------|-------|
| Font Family | `Geist` (sans), `Geist Mono` (mono) |
| Import | `next/font/google` in `/app/layout.tsx` |
| CSS Variable | `--font-sans: 'Geist', 'Geist Fallback'` |

### 2.3 Colors (Source: `/app/globals.css`)
All colors use OKLCH format for consistent dark theme.

### 2.4 Sidebar Behavior
| File | Purpose |
|------|---------|
| `/components/sidebar-context.tsx` | State management (collapsed/expanded) |
| `/components/sidebar-nav.tsx` | Navigation UI component |

### 2.5 Top Header Behavior
| File | Purpose |
|------|---------|
| `/components/top-header.tsx` | Header container |
| `/components/ui/search-dropdown.tsx` | Global search |
| `/components/ui/notification-dropdown.tsx` | Notifications |
| `/components/ui/profile-dropdown.tsx` | User menu |
| `/components/ui/wallet-dropdown.tsx` | Wallet balance |

### 2.6 Shared Utilities
| File | Purpose | Exports |
|------|---------|---------|
| `/lib/utils.ts` | Class merging | `cn()` |

---

## SECTION 3 - FULL FILE-TO-FILE MAPPING

### Pages

| Route | File | Reusable | Parent | Children | State |
|-------|------|----------|--------|----------|-------|
| `/` | `/app/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, HeroSection, RecentlyViewed, CategoryCards, MarketplaceGrid | SidebarProvider |
| `/market/[category]` | `/app/market/[category]/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, CollectionFilters, ItemGrid | SidebarProvider, local filters |
| `/item/[id]` | `/app/item/[id]/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, FloatValueBar, PriceHistoryChart, StickerDisplay, MakeOfferModal, ConfirmPurchaseModal | SidebarProvider, modals |
| `/trades` | `/app/trades/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, TradesHeader, TradesList, TradeDetail | SidebarProvider, selectedTrade |
| `/inventory` | `/app/inventory/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, InventoryHeader, InventoryFilters, InventoryGrid | SidebarProvider, filters |
| `/watchlist` | `/app/watchlist/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, WatchlistItems | SidebarProvider |
| `/history` | `/app/history/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, TransactionTable | SidebarProvider, filters |
| `/messages` | `/app/messages/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, ConversationList, ChatWindow | SidebarProvider, selectedChat |
| `/friends` | `/app/friends/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, FriendsList | SidebarProvider, filters |
| `/profile` | `/app/profile/page.tsx` | No | profile/layout.tsx | ProfileHeader, ProfileTabs | Tab state |
| `/settings` | `/app/settings/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, SettingsTabs | SidebarProvider, tab state |
| `/support` | `/app/support/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, FAQ, SupportForm | SidebarProvider |
| `/bridge` | `/app/bridge/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, BridgeForm | SidebarProvider |
| `/admin` | `/app/admin/page.tsx` | No | layout.tsx | SidebarNav, TopHeader, AdminTabs | SidebarProvider, tab state |

### Core Components

| Component | File | Reusable | Props | Consumers |
|-----------|------|----------|-------|-----------|
| SidebarNav | `/components/sidebar-nav.tsx` | Yes | none | All pages |
| TopHeader | `/components/top-header.tsx` | Yes | none | All pages |
| SidebarProvider | `/components/sidebar-context.tsx` | Yes | children | All pages |
| HeroSection | `/components/hero-section.tsx` | No | none | Home page |
| CategoryCards | `/components/category-cards.tsx` | Yes | none | Home, Market |
| MarketplaceGrid | `/components/marketplace-grid.tsx` | Yes | none | Home, Market |
| CryptoFilter | `/components/crypto-filter.tsx` | Yes | none | MarketplaceGrid |
| RecentlyViewed | `/components/recently-viewed.tsx` | Yes | none | Home page |

---

## SECTION 4 - EXACT DESIGN TOKENS

### 4.1 Colors (OKLCH Values)

```css
/* Primary */
--primary: oklch(0.7 0.18 45);           /* Orange accent */
--primary-foreground: oklch(0.1 0 0);    /* Near black text on orange */

/* Backgrounds */
--background: oklch(0.08 0.005 250);     /* Main bg - near black with blue tint */
--card: oklch(0.11 0.008 250);           /* Elevated surfaces */
--secondary: oklch(0.15 0.005 250);      /* Secondary surfaces */
--muted: oklch(0.18 0.005 250);          /* Muted backgrounds */
--input: oklch(0.12 0.008 250);          /* Input backgrounds */
--popover: oklch(0.11 0.008 250);        /* Dropdowns, modals */

/* Sidebar */
--sidebar: oklch(0.09 0.005 250);        /* Sidebar bg */
--sidebar-accent: oklch(0.14 0.008 250); /* Sidebar hover/active */
--sidebar-border: oklch(0.2 0.01 250);   /* Sidebar borders */

/* Text */
--foreground: oklch(0.95 0 0);           /* Primary text - near white */
--muted-foreground: oklch(0.55 0 0);     /* Secondary text - 55% gray */
--card-foreground: oklch(0.95 0 0);      /* Text on cards */

/* Borders */
--border: oklch(0.2 0.01 250);           /* Default borders */

/* Semantic */
--success: oklch(0.7 0.17 145);          /* Green - verified/success */
--destructive: oklch(0.55 0.22 25);      /* Red - errors/destructive */
--ring: oklch(0.7 0.18 45);              /* Focus rings - orange */
--accent: oklch(0.7 0.18 45);            /* Same as primary */
```

### 4.2 Rarity Colors (Hardcoded HEX)

```css
/* CS2 Rarity Tier Colors */
Covert/Ancient:     #eb4b4b  /* Red */
Classified/Mythical: #d32ce6  /* Purple */
Restricted/Rare:    #8847ff  /* Violet */
Mil-Spec/Uncommon:  #4b69ff  /* Blue */
Industrial/Common:  #5e98d9  /* Light blue */
```

### 4.3 Typography

```css
/* Font Families */
--font-sans: 'Geist', 'Geist Fallback', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Geist Mono Fallback', monospace;

/* Font Sizes (Tailwind) */
text-xs:   12px / 16px line-height  /* Badges, labels, timestamps */
text-sm:   14px / 20px line-height  /* Body, buttons, inputs */
text-base: 16px / 24px line-height  /* Default body */
text-lg:   18px / 28px line-height  /* Subheadings */
text-xl:   20px / 28px line-height  /* Section headers */
text-2xl:  24px / 32px line-height  /* Page titles */
text-3xl:  30px / 36px line-height  /* Hero headings */
text-4xl:  36px / 40px line-height  /* Large hero */

/* Font Weights */
font-normal:   400  /* Body text */
font-medium:   500  /* Labels, emphasis */
font-semibold: 600  /* Buttons, headings */
font-bold:     700  /* Strong emphasis */

/* Text Transforms */
uppercase tracking-wider  /* Category labels, badges */
```

### 4.4 Spacing Scale

```css
/* Tailwind Spacing Used */
gap-1 / p-1:   4px
gap-2 / p-2:   8px
gap-3 / p-3:   12px
gap-4 / p-4:   16px
gap-5 / p-5:   20px
gap-6 / p-6:   24px
gap-8 / p-8:   32px
gap-12:        48px

/* Common Patterns */
Page padding:        p-6 (24px) or p-8 (32px)
Card padding:        p-4 (16px) or p-5 (20px) or p-6 (24px)
Section gap:         space-y-6 (24px) or space-y-12 (48px)
Grid gap:            gap-4 (16px)
Button padding:      px-4 py-2 (16px/8px) or px-3 py-1.5 (12px/6px)
Input padding:       px-3 py-1 (12px/4px)
Badge padding:       px-2 py-0.5 (8px/2px) or px-3 py-1 (12px/4px)
```

### 4.5 Border Radius

```css
/* CSS Variables */
--radius: 0.625rem;  /* 10px base */
--radius-sm: calc(var(--radius) - 4px);  /* 6px */
--radius-md: calc(var(--radius) - 2px);  /* 8px */
--radius-lg: var(--radius);              /* 10px */
--radius-xl: calc(var(--radius) + 4px);  /* 14px */

/* Tailwind Classes Used */
rounded-sm:   6px   /* Small elements */
rounded-md:   8px   /* Buttons, inputs */
rounded-lg:   10px  /* Cards, modals */
rounded-xl:   14px  /* Large cards */
rounded-full: 50%   /* Avatars, circular badges */
```

### 4.6 Shadows

```css
/* Minimal shadows - dark theme */
shadow-sm:  0 1px 2px rgba(0,0,0,0.05)
shadow-xs:  0 1px 2px rgba(0,0,0,0.04)

/* Used primarily on inputs/buttons, cards have border instead */
```

### 4.7 Transitions

```css
/* Default Transitions */
transition-colors:   150ms ease
transition-all:      150ms ease
duration-300:        300ms (layout shifts, sidebar)

/* Hover States */
hover:bg-primary/90        /* Primary button hover */
hover:bg-secondary/80      /* Secondary button hover */
hover:bg-sidebar-accent/50 /* Sidebar item hover */
hover:border-primary/50    /* Card hover border */
hover:text-foreground      /* Muted text hover */

/* Focus States */
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]

/* Active States */
bg-sidebar-accent          /* Active nav item */
bg-primary                 /* Active tab/toggle */
```

### 4.8 Scrollbar Styles

```css
/* Firefox */
scrollbar-width: thin;
scrollbar-color: rgba(255, 255, 255, 0.1) transparent;

/* Webkit */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

---

## SECTION 5 - PAGE-BY-PAGE STRUCTURAL BREAKDOWN

### 5.1 Homepage (`/`)

**File:** `/app/page.tsx`

**Structure:**
```
<SidebarProvider>
  <div class="min-h-screen bg-background">
    <SidebarNav />                          /* Fixed left, 256px expanded / 72px collapsed */
    <div style="marginLeft: 256px/72px">    /* Dynamic based on sidebar state */
      <TopHeader />                         /* Sticky, h-16 (64px), border-b */
      <main class="flex-1 space-y-12 p-6 lg:p-8">
        <HeroSection />                     /* flex-col lg:flex-row gap-8 */
        <RecentlyViewed />                  /* Horizontal scroll, optional */
        <CategoryCards />                   /* 4-column grid */
        <MarketplaceGrid />                 /* Dynamic grid based on layout toggle */
      </main>
    </div>
  </div>
</SidebarProvider>
```

**Responsive Behavior:**
- Sidebar: Hidden on mobile (not implemented), full on desktop
- Hero: Stack on mobile, side-by-side on lg
- Category grid: 1 col mobile, 2 col sm, 4 col lg
- Marketplace grid: 1-4 cols based on breakpoint and layout mode

---

### 5.2 Collection Page (`/market/[category]`)

**File:** `/app/market/[category]/page.tsx`

**Structure:**
```
<SidebarProvider>
  <div class="min-h-screen bg-background">
    <SidebarNav />
    <div style="marginLeft: dynamic">
      <TopHeader />
      <main class="flex-1 p-6 lg:p-8">
        /* Back Link */
        <Link class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft class="h-4 w-4" />
          Back to market
        </Link>

        /* Collection Header */
        <div class="mb-8">
          <h1 class="text-3xl font-bold">{categoryName}</h1>
          <p class="text-muted-foreground mt-1">Description text</p>
        </div>

        /* Stats Cards - 3 columns */
        <div class="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="FLOOR" value="X USDT" icon={Tag} />
          <StatCard label="TOP OFFER" value="X USDT" icon={TrendingUp} />
          <StatCard label="LISTED" value="X" icon={ShoppingCart} />
        </div>

        /* Two Column Layout */
        <div class="flex gap-6">
          /* Left Sidebar Filters - 280px fixed */
          <aside class="w-[280px] shrink-0 space-y-6">
            <CollectionFilters />      /* Category chips */
            <PaymentTokenFilter />     /* USDT/ETH/USDC chips */
            <NetworkFilter />          /* Base/Ethereum/etc chips */
            <TradeSafetyCard />        /* Info card */
          </aside>

          /* Main Content - flex-1 */
          <div class="flex-1 space-y-4">
            /* Filters Bar */
            <div class="rounded-xl border bg-card p-4 space-y-4">
              <SearchSortControls />
              <CryptoFilter />
              <ResultsInfo />
            </div>

            /* Tabs */
            <Tabs defaultValue="items">
              <TabsList>Items, Activity, Analytics</TabsList>
              <TabsContent value="items">
                <ItemsGrid />
              </TabsContent>
              <TabsContent value="activity">
                <ActivityTable />
              </TabsContent>
              <TabsContent value="analytics">
                <AnalyticsCharts />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  </div>
</SidebarProvider>
```

---

### 5.3 Item Detail Page (`/item/[id]`)

**File:** `/app/item/[id]/page.tsx`

**Structure:**
```
<SidebarProvider>
  <div class="min-h-screen bg-background">
    <SidebarNav />
    <div style="marginLeft: dynamic">
      <TopHeader />
      <main class="flex-1 p-6 lg:p-8">
        /* Breadcrumbs */
        <Breadcrumb class="mb-6">Market > Category > Item</Breadcrumb>

        /* Two Column Layout */
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          /* Left Column - Item Display */
          <div class="space-y-6">
            /* Image Container */
            <div class="aspect-square rounded-xl border bg-card overflow-hidden relative">
              <img class="object-contain p-8" />
              /* Sticker badges overlay */
              <StickerDisplay />
              /* Favorite button */
              <Button class="absolute top-4 right-4" />
            </div>

            /* Float Value Bar */
            <FloatValueBar float={0.123} />

            /* Price History Chart */
            <PriceHistoryChart />

            /* Similar Listings */
            <SimilarListings />
          </div>

          /* Right Column - Item Info */
          <div class="space-y-6">
            /* Header */
            <div>
              <Badge>Rarity</Badge>
              <h1 class="text-2xl font-bold mt-2">{itemName}</h1>
              <p class="text-muted-foreground">{wear}</p>
            </div>

            /* Price Card */
            <div class="rounded-xl border bg-card p-6">
              <div class="text-3xl font-bold">{price} USDT</div>
              <div class="grid grid-cols-2 gap-3 mt-4">
                <Button size="lg">Buy Now</Button>
                <Button size="lg" variant="secondary">Make Offer</Button>
              </div>
            </div>

            /* Seller Info */
            <SellerCard />

            /* Item Details Accordion */
            <Accordion>
              <AccordionItem>Specifications</AccordionItem>
              <AccordionItem>Trade History</AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  </div>

  /* Modals */
  <MakeOfferModal />
  <ConfirmPurchaseModal />
</SidebarProvider>
```

---

## SECTION 6 - COMPONENT BLUEPRINTS

### 6.1 SidebarNav

**File:** `/components/sidebar-nav.tsx`

**Props:** None (uses `useSidebar()` context)

**DOM Structure:**
```tsx
<aside class={cn(
  "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
  isCollapsed ? "w-[72px]" : "w-64"
)}>
  /* Logo Section - h-16 */
  <div class="flex h-16 items-center justify-between px-3">
    <div class={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
      <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
        C
      </div>
      {!isCollapsed && <span class="text-lg font-semibold text-foreground">CS2 OTC</span>}
    </div>
  </div>

  /* Collapse Toggle - Floating button */
  <button class="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary">
    <ChevronLeft/Right class="h-3.5 w-3.5" />
  </button>

  /* Navigation - flex-1 overflow-y-auto */
  <nav class="flex-1 px-3 py-4 overflow-y-auto">
    <ul class="space-y-1">
      {mainNavItems.map(item => (
        <li>
          <Link class={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isCollapsed && "justify-center px-2",
            isActive 
              ? "bg-sidebar-accent text-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
          )}>
            <Icon class="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && label}
          </Link>
        </li>
      ))}
    </ul>

    <div class="my-4 border-t border-border" />

    /* Secondary nav items */
    /* Bottom nav items */
  </nav>

  /* User Profile - border-t p-3 */
  <div class="border-t border-border p-3">
    <div class={cn(
      "flex items-center gap-3 rounded-lg bg-sidebar-accent p-3",
      isCollapsed && "justify-center p-2"
    )}>
      <Avatar class={cn(isCollapsed ? "h-8 w-8" : "h-10 w-10")} />
      {!isCollapsed && (
        <div class="flex-1 overflow-hidden">
          <p class="truncate text-sm font-medium text-foreground">username</p>
          <p class="truncate text-xs text-muted-foreground">0x31b7...95bd</p>
        </div>
      )}
    </div>
  </div>
</aside>
```

**Key Measurements:**
- Expanded width: 256px (w-64)
- Collapsed width: 72px
- Logo height: 64px (h-16)
- Nav item height: ~40px (py-2.5)
- Nav item icon: 20px (h-5 w-5)
- Toggle button: 24px diameter, positioned at top-20 (80px from top)
- User avatar expanded: 40px, collapsed: 32px

---

### 6.2 TopHeader

**File:** `/components/top-header.tsx`

**DOM Structure:**
```tsx
<header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  /* Search - Left side */
  <SearchDropdown />

  /* Actions - Right side */
  <div class="flex items-center gap-2">
    <LanguageDropdown />
    <WalletDropdown />
    <NotificationDropdown />
    <ProfileDropdown />
  </div>
</header>
```

**Key Measurements:**
- Height: 64px (h-16)
- Horizontal padding: 24px (px-6)
- Gap between actions: 8px (gap-2)

---

### 6.3 Item Card (Marketplace Grid)

**DOM Structure:**
```tsx
<div class="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50">
  /* Top rarity border */
  <div class="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-{rarity-color}/30 to-{rarity-color}/10" />

  /* Header */
  <div class="flex items-center justify-between p-3">
    <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {rarity}
    </span>
    <span class="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
      {trustScore}% trust
    </span>
  </div>

  /* Image */
  <div class={cn(
    "relative mx-3 overflow-hidden rounded-lg bg-secondary",
    layout === "comfortable" ? "aspect-square" : "aspect-[4/3]"
  )}>
    <img class="h-full w-full object-contain p-4 transition-transform group-hover:scale-105" />
  </div>

  /* Info */
  <div class="p-4">
    <h3 class="font-semibold text-foreground truncate">{name}</h3>
    <p class="text-sm text-muted-foreground">{wear}</p>
    <div class="mt-3 flex items-center justify-between">
      <p class="text-lg font-bold text-foreground">{price}</p>
      <Button size="sm" class="h-8">Buy now</Button>
    </div>
  </div>
</div>
```

**Key Measurements:**
- Border radius: 12px (rounded-xl)
- Top border: 4px height (h-1)
- Header padding: 12px (p-3)
- Image margin: 12px horizontal (mx-3)
- Image border radius: 8px (rounded-lg)
- Info padding: 16px (p-4)
- Buy button height: 32px (h-8)

---

### 6.4 Category Card

**DOM Structure:**
```tsx
<Link class="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-card/80">
  /* Top gradient border */
  <div class="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/50 to-primary/20" />

  /* Header */
  <div class="flex items-start justify-between">
    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
      <ImageIcon class="h-6 w-6" />
    </div>
    <ChevronRight class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
  </div>

  /* Content */
  <div class="mt-6">
    <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      Collection
    </p>
    <h3 class="mt-1 text-xl font-semibold text-foreground">{name}</h3>
  </div>

  /* Footer Stats */
  <div class="mt-4 flex items-center justify-between border-t border-border pt-4">
    <div>
      <p class="text-xs text-muted-foreground">Listings</p>
      <p class="font-semibold text-foreground">{count}</p>
    </div>
    <div class="text-right">
      <p class="text-xs text-muted-foreground">Floor</p>
      <p class="font-semibold text-foreground">{floor || "No data"}</p>
    </div>
  </div>
</Link>
```

**Key Measurements:**
- Padding: 20px (p-5)
- Icon container: 48px (h-12 w-12)
- Icon size: 24px (h-6 w-6)
- Title margin-top: 24px (mt-6)
- Footer margin-top: 16px (mt-4), padding-top: 16px (pt-4)

---

### 6.5 Button Component

**File:** `/components/ui/button.tsx`

**Variants:**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",      /* 36px height */
        sm: "h-8 rounded-md px-3",      /* 32px height */
        lg: "h-10 rounded-md px-6",     /* 40px height */
        icon: "size-9",                 /* 36px square */
        "icon-sm": "size-8",            /* 32px square */
        "icon-lg": "size-10",           /* 40px square */
      },
    },
  }
)
```

---

## SECTION 7 - OLD REPO TO NEW UI MIGRATION MAP

| Old Area | New Source | Migration Method | Risk Notes |
|----------|------------|------------------|------------|
| Global styles | `/app/globals.css` | Full replace | Verify all OKLCH colors supported |
| Layout | `/app/layout.tsx` | Full replace | Update metadata, keep business routes |
| Sidebar | `/components/sidebar-nav.tsx` + `/components/sidebar-context.tsx` | Full replace | Preserve route paths |
| Header | `/components/top-header.tsx` + dropdowns | Full replace | Integrate auth state |
| Home page | `/app/page.tsx` + sections | Full replace | Wire up real data |
| UI primitives | `/components/ui/*` | Copy all | May conflict with existing shadcn |
| Modals | `/components/modals/*` | Copy all | Connect to real actions |
| Item components | `/components/item/*` | Copy all | Wire up real data |
| Profile components | `/components/profile/*` | Copy all | Wire up auth/user data |

---

## SECTION 8 - SAFE MIGRATION ORDER

### Step 1: Dependencies
```bash
# Verify these exist in package.json:
next: 16.x
react: 19.x
tailwindcss: 4.x
@radix-ui/*: latest
lucide-react: latest
recharts: 2.x
class-variance-authority: latest
clsx: latest
tailwind-merge: latest
```

### Step 2: Global Styles
1. Copy `/app/globals.css` to target
2. Verify TailwindCSS 4 @import syntax
3. Verify all OKLCH values render correctly

### Step 3: Utilities
1. Copy `/lib/utils.ts`
2. Verify `cn()` function works

### Step 4: UI Primitives
1. Copy entire `/components/ui/` directory
2. Copy `components.json`
3. Test Button, Input, Dialog render

### Step 5: Layout Components
1. Copy `/components/sidebar-context.tsx`
2. Copy `/components/sidebar-nav.tsx`
3. Copy `/components/top-header.tsx`
4. Copy dropdown components

### Step 6: Root Layout
1. Update `/app/layout.tsx` with fonts
2. Verify body classes

### Step 7: Homepage
1. Copy `/app/page.tsx`
2. Copy `/components/hero-section.tsx`
3. Copy `/components/category-cards.tsx`
4. Copy `/components/marketplace-grid.tsx`
5. Copy `/components/crypto-filter.tsx`
6. Copy `/components/recently-viewed.tsx`

### Step 8: Other Pages
1. Copy each page file
2. Copy associated components
3. Test routes work

### Step 9: Modals
1. Copy `/components/modals/*`
2. Verify Dialog component works
3. Test open/close

### Step 10: Verification
- All routes load
- Sidebar collapses
- Modals open
- Colors correct
- Typography correct

---

## SECTION 9 - PIXEL-PARITY CHECKLIST

### Colors
- [ ] Background is `oklch(0.08 0.005 250)` - near black with slight blue
- [ ] Primary orange is `oklch(0.7 0.18 45)`
- [ ] Muted text is `oklch(0.55 0 0)` - not too light, not too dark
- [ ] Borders are `oklch(0.2 0.01 250)` - subtle, not invisible
- [ ] Success green is `oklch(0.7 0.17 145)`
- [ ] Cards are `oklch(0.11 0.008 250)` - slightly elevated from bg

### Typography
- [ ] Font family is Geist, not system fonts
- [ ] Body text is `text-sm` (14px)
- [ ] Labels use `text-xs uppercase tracking-wider text-muted-foreground`
- [ ] Headings use `font-semibold` or `font-bold`
- [ ] Prices use `font-bold`

### Spacing
- [ ] Page padding is `p-6` (24px) or `p-8` (32px)
- [ ] Card padding is `p-4` (16px) or `p-5` (20px)
- [ ] Section gaps are `space-y-6` (24px) or `space-y-12` (48px)
- [ ] Nav items have `py-2.5` (10px vertical)

### Sizes
- [ ] Sidebar expanded: 256px
- [ ] Sidebar collapsed: 72px
- [ ] Header height: 64px
- [ ] Button default height: 36px
- [ ] Button sm height: 32px
- [ ] Avatar sizes: 32/40/96/128px as used
- [ ] Nav icons: 20px
- [ ] Card icons: 24px

### Borders
- [ ] Border radius base: 10px (rounded-lg)
- [ ] Cards use `rounded-xl` (14px)
- [ ] Buttons use `rounded-md` (8px)
- [ ] Top rarity stripe is 4px height

### States
- [ ] Hover on cards: `hover:border-primary/50`
- [ ] Active nav: `bg-sidebar-accent`
- [ ] Button hover: `hover:bg-primary/90`
- [ ] Ghost button hover: `hover:bg-accent`

### Layout
- [ ] Main content shifts with sidebar (marginLeft)
- [ ] Header is sticky top
- [ ] Modals center with backdrop blur
- [ ] Grids use gap-4

---

## SECTION 10 - MACHINE-READABLE OUTPUT

### A. FILE TREE
```json
{
  "app": [
    "globals.css",
    "layout.tsx",
    "page.tsx",
    "admin/page.tsx",
    "bridge/page.tsx",
    "friends/page.tsx",
    "history/page.tsx",
    "inventory/page.tsx",
    "item/[id]/page.tsx",
    "market/[category]/page.tsx",
    "messages/page.tsx",
    "profile/layout.tsx",
    "profile/page.tsx",
    "settings/page.tsx",
    "support/page.tsx",
    "trades/page.tsx",
    "watchlist/page.tsx"
  ],
  "components": {
    "root": [
      "category-cards.tsx",
      "crypto-filter.tsx",
      "hero-section.tsx",
      "marketplace-grid.tsx",
      "recently-viewed.tsx",
      "sidebar-context.tsx",
      "sidebar-nav.tsx",
      "theme-provider.tsx",
      "top-header.tsx"
    ],
    "inventory": ["inventory-filters.tsx", "inventory-grid.tsx", "inventory-header.tsx"],
    "item": ["float-value-bar.tsx", "price-history-chart.tsx", "sticker-display.tsx"],
    "modals": ["confirm-purchase-modal.tsx", "create-listing-modal.tsx", "edit-profile-modal.tsx", "make-offer-modal.tsx", "manage-wallets-modal.tsx", "security-settings-modal.tsx"],
    "profile": ["activity-tab.tsx", "favorites-tab.tsx", "inventory-tab.tsx", "offers-tab.tsx", "profile-header.tsx", "profile-tabs.tsx"],
    "trades": ["trade-detail.tsx", "trades-header.tsx", "trades-list.tsx"],
    "ui": ["50+ shadcn components"]
  },
  "lib": ["utils.ts"],
  "hooks": ["use-mobile.ts", "use-toast.ts"]
}
```

### B. DESIGN TOKENS JSON
```json
{
  "colors": {
    "primary": "oklch(0.7 0.18 45)",
    "primary-foreground": "oklch(0.1 0 0)",
    "background": "oklch(0.08 0.005 250)",
    "foreground": "oklch(0.95 0 0)",
    "card": "oklch(0.11 0.008 250)",
    "secondary": "oklch(0.15 0.005 250)",
    "muted": "oklch(0.18 0.005 250)",
    "muted-foreground": "oklch(0.55 0 0)",
    "border": "oklch(0.2 0.01 250)",
    "input": "oklch(0.12 0.008 250)",
    "success": "oklch(0.7 0.17 145)",
    "destructive": "oklch(0.55 0.22 25)",
    "sidebar": "oklch(0.09 0.005 250)",
    "sidebar-accent": "oklch(0.14 0.008 250)"
  },
  "rarity": {
    "covert": "#eb4b4b",
    "classified": "#d32ce6",
    "restricted": "#8847ff",
    "milspec": "#4b69ff",
    "industrial": "#5e98d9"
  },
  "typography": {
    "fontSans": "'Geist', 'Geist Fallback'",
    "fontMono": "'Geist Mono', 'Geist Mono Fallback'"
  },
  "spacing": {
    "page": "24px",
    "pageLg": "32px",
    "card": "16px",
    "cardLg": "20px",
    "section": "24px",
    "grid": "16px"
  },
  "radius": {
    "sm": "6px",
    "md": "8px",
    "lg": "10px",
    "xl": "14px"
  },
  "sizes": {
    "sidebarExpanded": "256px",
    "sidebarCollapsed": "72px",
    "headerHeight": "64px",
    "buttonDefault": "36px",
    "buttonSm": "32px",
    "buttonLg": "40px"
  }
}
```

### C. MIGRATION PLAN JSON
```json
{
  "phases": [
    {
      "phase": 1,
      "name": "Foundation",
      "steps": [
        {"action": "copy", "source": "package.json", "verify": "dependencies match"},
        {"action": "copy", "source": "app/globals.css", "verify": "colors render"},
        {"action": "copy", "source": "lib/utils.ts", "verify": "cn() works"},
        {"action": "copy", "source": "components.json", "verify": "shadcn config"}
      ]
    },
    {
      "phase": 2,
      "name": "UI Primitives",
      "steps": [
        {"action": "copy", "source": "components/ui/*", "count": 50, "verify": "Button renders"}
      ]
    },
    {
      "phase": 3,
      "name": "Layout Shell",
      "steps": [
        {"action": "copy", "source": "components/sidebar-context.tsx"},
        {"action": "copy", "source": "components/sidebar-nav.tsx"},
        {"action": "copy", "source": "components/top-header.tsx"},
        {"action": "copy", "source": "app/layout.tsx", "verify": "shell renders"}
      ]
    },
    {
      "phase": 4,
      "name": "Pages",
      "steps": [
        {"action": "copy", "source": "app/page.tsx", "deps": ["hero-section", "category-cards", "marketplace-grid"]},
        {"action": "copy", "source": "app/market/[category]/page.tsx"},
        {"action": "copy", "source": "app/item/[id]/page.tsx"},
        {"action": "copy", "source": "remaining pages"}
      ]
    },
    {
      "phase": 5,
      "name": "Features",
      "steps": [
        {"action": "copy", "source": "components/modals/*"},
        {"action": "copy", "source": "components/item/*"},
        {"action": "copy", "source": "components/profile/*"},
        {"action": "copy", "source": "components/trades/*"},
        {"action": "copy", "source": "components/inventory/*"}
      ]
    },
    {
      "phase": 6,
      "name": "Verification",
      "steps": [
        {"action": "test", "check": "all routes load"},
        {"action": "test", "check": "sidebar toggles"},
        {"action": "test", "check": "modals open"},
        {"action": "test", "check": "colors match"},
        {"action": "test", "check": "spacing correct"}
      ]
    }
  ]
}
```

---

*End of Migration Specification*
