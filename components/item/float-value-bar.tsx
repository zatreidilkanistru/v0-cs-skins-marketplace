"use client"

interface FloatValueBarProps {
  float: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

const wearRanges = [
  { name: "Factory New", abbr: "FN", min: 0, max: 0.07, color: "bg-emerald-500" },
  { name: "Minimal Wear", abbr: "MW", min: 0.07, max: 0.15, color: "bg-green-500" },
  { name: "Field-Tested", abbr: "FT", min: 0.15, max: 0.38, color: "bg-yellow-500" },
  { name: "Well-Worn", abbr: "WW", min: 0.38, max: 0.45, color: "bg-orange-500" },
  { name: "Battle-Scarred", abbr: "BS", min: 0.45, max: 1, color: "bg-red-500" },
]

export function getWearName(float: number): string {
  const wear = wearRanges.find(w => float >= w.min && float < w.max)
  return wear?.name || "Battle-Scarred"
}

export function getWearAbbr(float: number): string {
  const wear = wearRanges.find(w => float >= w.min && float < w.max)
  return wear?.abbr || "BS"
}

export function FloatValueBar({ float, showLabel = true, size = "md" }: FloatValueBarProps) {
  const percentage = float * 100
  const currentWear = wearRanges.find(w => float >= w.min && float < w.max) || wearRanges[4]
  
  const heights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Float Value</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${currentWear.color} text-white`}>
              {currentWear.abbr}
            </span>
            <span className="text-xs font-mono font-medium text-foreground">
              {float.toFixed(8)}
            </span>
          </div>
        </div>
      )}
      
      {/* Float bar container */}
      <div className="relative">
        {/* Background segments */}
        <div className={`flex w-full ${heights[size]} rounded-full overflow-hidden`}>
          {wearRanges.map((range, i) => (
            <div
              key={range.abbr}
              className={`${range.color} opacity-30`}
              style={{ width: `${(range.max - range.min) * 100}%` }}
            />
          ))}
        </div>
        
        {/* Indicator line */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 bg-white shadow-lg"
          style={{ 
            left: `${percentage}%`,
            height: size === "sm" ? "12px" : size === "md" ? "16px" : "20px"
          }}
        />
        
        {/* Indicator dot */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-2 ${currentWear.color.replace('bg-', 'border-')} shadow-lg`}
          style={{ 
            left: `${percentage}%`,
            width: size === "sm" ? "8px" : size === "md" ? "10px" : "12px",
            height: size === "sm" ? "8px" : size === "md" ? "10px" : "12px"
          }}
        />
      </div>
      
      {/* Range labels */}
      {size === "lg" && (
        <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
          <span>0.00</span>
          <span>0.07</span>
          <span>0.15</span>
          <span>0.38</span>
          <span>0.45</span>
          <span>1.00</span>
        </div>
      )}
    </div>
  )
}
