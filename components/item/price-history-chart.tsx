"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface PriceHistoryChartProps {
  itemName?: string
}

// Generate mock price data
function generatePriceData(days: number, basePrice: number) {
  const data = []
  let price = basePrice
  const now = new Date()
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Add some random variance
    const variance = (Math.random() - 0.5) * basePrice * 0.1
    price = Math.max(basePrice * 0.7, Math.min(basePrice * 1.3, price + variance))
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 50) + 10,
    })
  }
  
  return data
}

const timeRanges = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
  { label: "1Y", days: 365 },
  { label: "ALL", days: 730 },
]

export function PriceHistoryChart({ itemName }: PriceHistoryChartProps) {
  const [selectedRange, setSelectedRange] = useState("30D")
  const basePrice = 245.50
  
  const days = timeRanges.find(r => r.label === selectedRange)?.days || 30
  const data = generatePriceData(days, basePrice)
  
  const minPrice = Math.min(...data.map(d => d.price))
  const maxPrice = Math.max(...data.map(d => d.price))
  const currentPrice = data[data.length - 1].price
  const startPrice = data[0].price
  const priceChange = currentPrice - startPrice
  const priceChangePercent = ((priceChange / startPrice) * 100).toFixed(2)
  const isPositive = priceChange >= 0

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Price History</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
            <span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{priceChange.toFixed(2)} ({isPositive ? "+" : ""}{priceChangePercent}%)
            </span>
          </div>
        </div>
        
        {/* Time range selector */}
        <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
          {timeRanges.map(range => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range.label)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedRange === range.label
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#666" }}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[minPrice * 0.95, maxPrice * 1.05]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#666" }}
              tickFormatter={(value) => `$${value}`}
              width={50}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border border-border rounded-lg p-2 shadow-lg">
                      <p className="text-xs text-muted-foreground">{payload[0].payload.date}</p>
                      <p className="text-sm font-semibold">${payload[0].value}</p>
                      <p className="text-xs text-muted-foreground">{payload[0].payload.volume} sales</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Low</p>
          <p className="text-sm font-medium">${minPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">High</p>
          <p className="text-sm font-medium">${maxPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg</p>
          <p className="text-sm font-medium">${((minPrice + maxPrice) / 2).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Volume</p>
          <p className="text-sm font-medium">{data.reduce((a, b) => a + b.volume, 0)}</p>
        </div>
      </div>
    </div>
  )
}
