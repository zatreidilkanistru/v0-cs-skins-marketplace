"use client"

import { Button } from "@/components/ui/button"

const offers = [
  {
    id: 1,
    name: "M4A4 | Mainframe (Minimal Wear)",
    price: "12 USDT",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_kVvamHzcoWVJgQ7ZFzW_ADqw-u5hcC0tZ_Im3swvyFxsSnbnhS_gx9SLrs4b4HYHQ/256fx256f",
    collection: "Uncommon Asset",
  },
  {
    id: 2,
    name: "5 Year Veteran Coin",
    price: "1.4 USDT",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRWTULY-OC-g568VFxkIQxWsrGiLAhv2OXNfDgR6oaz8JGOqOf1MqjczjlVuZQjjrzApY6i2FS1_UZkNmiiLYHBJlI8M1jS8we8xO3n1ZXpot2Xnm_AK1M/256fx256f",
    collection: "Rare Item",
  },
  {
    id: 3,
    name: "MP9 | Sand Dashed (Battle-Scarred)",
    price: "1 USDT",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZu7OHNdQJO5du-gM7SlvPmMLjummJW4NE_2LnEo9Sn21C2-UttZ2n0J9eLdAQ4NVHS-FC-l-ns0MS07pjPyCwwuCcq5H3D30vgFyWE1A/256fx256f",
    collection: "Consumer Grade",
  },
  {
    id: 4,
    name: "Revolution Case",
    price: "2 USDT",
    image: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsRFJ8MARfsrOkJQtf7PLffiVL89m6xITSzqChNuvXx2oJ6sYji7qYo9iiiwe2_BFkMGvtZNjBeFRvMArQ-FnqkOzt1p6-7snLyXBiuyM8pSGKRlThkQ/256fx256f",
    collection: "Container",
  },
]

export function OffersTab() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Offers
          </p>
          <p className="text-3xl font-bold text-foreground">{offers.length}</p>
        </div>
        <Button variant="outline" className="border-border">
          Open trades
        </Button>
      </div>

      {/* Table Header */}
      <div className="hidden border-b border-border pb-3 md:grid md:grid-cols-12 md:gap-4">
        <div className="col-span-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Item
        </div>
        <div className="col-span-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Price
        </div>
        <div className="col-span-5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Actions
        </div>
      </div>

      {/* Offers List - Table Style like OpenSea Activity */}
      <div className="divide-y divide-border">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-12"
          >
            {/* Item Info */}
            <div className="col-span-5 flex items-center gap-4">
              <div className="h-14 w-14 flex-shrink-0 bg-secondary/50 p-1">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {offer.name}
                </p>
                <p className="text-xs text-muted-foreground">{offer.collection}</p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2">
              <p className="text-sm font-medium text-foreground">{offer.price}</p>
            </div>

            {/* Actions */}
            <div className="col-span-5 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-secondary"
              >
                Edit listing
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Delist
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
