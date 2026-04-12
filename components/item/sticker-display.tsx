"use client"

interface Sticker {
  name: string
  position: number
  wear: number
  price: number
  imageUrl?: string
}

interface StickerDisplayProps {
  stickers: Sticker[]
  showPrices?: boolean
}

export function StickerDisplay({ stickers, showPrices = true }: StickerDisplayProps) {
  if (stickers.length === 0) return null

  const totalValue = stickers.reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">Applied Stickers</h3>
        {showPrices && (
          <span className="text-sm font-medium text-primary">
            +${totalValue.toFixed(2)} value
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((position) => {
          const sticker = stickers.find(s => s.position === position)
          
          return (
            <div
              key={position}
              className={`relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center ${
                sticker ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/30"
              }`}
            >
              {sticker ? (
                <div className="text-center p-1">
                  {/* Sticker image placeholder */}
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-1">
                    <span className="text-lg">S{position + 1}</span>
                  </div>
                  <p className="text-[10px] text-foreground font-medium truncate px-1">
                    {sticker.name}
                  </p>
                  {showPrices && (
                    <p className="text-[10px] text-primary font-medium">
                      ${sticker.price.toFixed(2)}
                    </p>
                  )}
                  {sticker.wear < 1 && (
                    <p className="text-[9px] text-muted-foreground">
                      {((1 - sticker.wear) * 100).toFixed(0)}% condition
                    </p>
                  )}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Empty</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
