"use client"

import { useState, useMemo } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart"
import { defaultDailyResponse } from "@/app/defaults/alphaVantage-defaults/defaultDailyDataWithSymbol"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

// Transform and aggregate time-series data
const getChartData = (timeFrame: string, sampleRate: number) => {
    const dailyData = Object.entries(defaultDailyResponse["Time Series (Daily)"])
        .map(([date, values], index) => ({
            date,
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseFloat(values["5. volume"]),
            index,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (timeFrame === "daily") {
        return dailyData.filter((_, index) => index % sampleRate === 0)
    }

    const aggregatedData: { [key: string]: { open: number; high: number; low: number; close: number; volume: number } } = {}
    dailyData.forEach((entry) => {
        const date = new Date(entry.date)
        let periodKey: string

        if (timeFrame === "weekly") {
            const startOfWeek = new Date(date)
            startOfWeek.setDate(date.getDate() - (date.getDay() || 7) + 1)
            periodKey = startOfWeek.toISOString().split("T")[0]
        } else if (timeFrame === "monthly") {
            periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`
        } else if (timeFrame === "yearly") {
            periodKey = `${date.getFullYear()}-01-01`
        } else if (timeFrame === "biannual") {
            periodKey = `${date.getFullYear()}-01-01`
        } else {
            return
        }

        if (!aggregatedData[periodKey]) {
            aggregatedData[periodKey] = {
                open: entry.open,
                high: entry.high,
                low: entry.low,
                close: entry.close,
                volume: entry.volume,
            }
        } else {
            aggregatedData[periodKey].high = Math.max(aggregatedData[periodKey].high, entry.high)
            aggregatedData[periodKey].low = Math.min(aggregatedData[periodKey].low, entry.low)
            aggregatedData[periodKey].close = entry.close
            aggregatedData[periodKey].volume += entry.volume
        }
    })

    return Object.entries(aggregatedData)
        .map(([date, values], index) => ({
            date,
            ...values,
            index,
        }))
        .filter((_, index) => index % sampleRate === 0)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

// Format volume to a readable string (e.g., 5.28M)
const formatVolume = (volume: number) => {
    if (volume >= 1_000_000) {
        return `${(volume / 1_000_000).toFixed(2)}M`
    } else if (volume >= 1_000) {
        return `${(volume / 1_000).toFixed(2)}K`
    }
    return volume.toString()
}

// Define chart configuration with distinct colors
const chartConfig = {
    open: {
        label: "Open",
        color: "#4caf50", // Green
    },
    high: {
        label: "High",
        color: "#2196f3", // Blue
    },
    low: {
        label: "Low",
        color: "#f44336", // Red
    },
    close: {
        label: "Close",
        color: "#ff9800", // Orange
    },
    volume: {
        label: "Volume",
        color: "#9c27b0", // Purple
    },
} satisfies ChartConfig

export function FlexibleChart() {
    // State for visible metrics, sampling rate, and time frame
    const [visibleMetrics, setVisibleMetrics] = useState({
        open: false,
        high: false,
        low: false,
        close: true, // Default to showing close
        volume: false,
    })
    const [sampleRate, setSampleRate] = useState(1) // Default to no sampling
    const [timeFrame, setTimeFrame] = useState("daily") // Default to daily

    // Memoized chart data
    const chartData = useMemo(() => getChartData(timeFrame, sampleRate), [timeFrame, sampleRate])

    // Handle toggle changes
    const handleToggle = (metric: keyof typeof visibleMetrics) => {
        setVisibleMetrics((prev) => ({
            ...prev,
            [metric]: !prev[metric],
        }))
    }

    // Handle sample rate change
    const handleSampleRateChange = (value: string) => {
        setSampleRate(parseInt(value))
    }

    // Handle time frame change
    const handleTimeFrameChange = (value: string) => {
        setTimeFrame(value)
        if (value === "yearly") {
            setSampleRate(1)
        } else if (value ===  "biannual") {
            setSampleRate(2)
        }
    }

    // Calculate trend and summary stats
    const latestData = chartData[chartData.length - 1]
    const previousData = chartData[chartData.length - 2]
    const trendPercentage =
        latestData?.close && previousData?.close
            ? ((latestData.close - previousData.close) / previousData.close) * 100
            : 0
    const periodHigh = chartData.length ? Math.max(...chartData.map((d) => d.high)) : 0
    const periodLow = chartData.length ? Math.min(...chartData.map((d) => d.low)) : 0

    // Dynamic X-axis formatter
    const formatDate = (value: string) => {
        const date = new Date(value)
        if (timeFrame === "daily" || timeFrame === "weekly") {
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        } else if (timeFrame === "monthly") {
            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        } else {
            return date.getFullYear().toString()
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Price Trends - {defaultDailyResponse["Meta Data"]["2. Symbol"]}</CardTitle>
                <CardDescription>
                    {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} OHLCV data as of {defaultDailyResponse["Meta Data"]["3. Last Refreshed"]}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Controls */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex gap-4 flex-wrap">
                        {Object.keys(chartConfig).map((metric) => (
                            <div key={metric} className="flex items-center gap-2">
                                <Checkbox
                                    id={metric}
                                    checked={visibleMetrics[metric as keyof typeof visibleMetrics]}
                                    onCheckedChange={() => handleToggle(metric as keyof typeof visibleMetrics)}
                                />
                                <label htmlFor={metric} className="text-sm">
                                    {chartConfig[metric as keyof typeof chartConfig].label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <label htmlFor="time-frame" className="text-sm">
                                Time Frame:
                            </label>
                            <Select onValueChange={handleTimeFrameChange} defaultValue={timeFrame}>
                                <SelectTrigger id="time-frame" className="w-[120px]">
                                    <SelectValue placeholder="Select time frame" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                    <SelectItem value="biannual">Biannual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="sample-rate" className="text-sm">
                                Sample every:
                            </label>
                            <Select onValueChange={handleSampleRateChange} defaultValue={sampleRate.toString()}>
                                <SelectTrigger id="sample-rate" className="w-[100px]">
                                    <SelectValue placeholder="Select rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Every point</SelectItem>
                                    <SelectItem value="10">10th point</SelectItem>
                                    <SelectItem value="100">100th point</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={formatDate}
                        />
                        <YAxis />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            {Object.keys(chartConfig).map((metric) => (
                                <linearGradient key={metric} id={`fill${metric}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={chartConfig[metric as keyof typeof chartConfig].color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartConfig[metric as keyof typeof chartConfig].color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        {Object.keys(visibleMetrics).map(
                            (metric) =>
                                visibleMetrics[metric as keyof typeof visibleMetrics] && (
                                    <Area
                                        key={metric}
                                        dataKey={metric}
                                        type="natural"
                                        fill={`url(#fill${metric})`}
                                        fillOpacity={0.4}
                                        stroke={chartConfig[metric as keyof typeof chartConfig].color}
                                        stackId={metric === "volume" ? "b" : "a"}
                                    />
                                )
                        )}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="w-full text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <span className="font-medium">Trend</span>
                            <div className="flex items-center gap-2">
                                <span>
                                    {trendPercentage > 0 ? "Up" : "Down"} {Math.abs(trendPercentage).toFixed(2)}%
                                </span>
                                {trendPercentage > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Period Range</span>
                            <span className="text-muted-foreground">
                                {chartData[0]?.date ? formatDate(chartData[0].date) : "N/A"} -{" "}
                                {chartData[chartData.length - 1]?.date ? formatDate(chartData[chartData.length - 1].date) : "N/A"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Period High/Low</span>
                            <span className="text-muted-foreground">
                                ${periodHigh.toFixed(2)} / ${periodLow.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Latest Values</span>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(visibleMetrics).map(
                                    (metric) =>
                                        visibleMetrics[metric as keyof typeof visibleMetrics] && (
                                            <div key={metric} className="flex items-center gap-2">
                                                <span>{chartConfig[metric as keyof typeof chartConfig].label}:</span>
                                                <span className="text-muted-foreground">
                                                    {metric === "volume"
                                                        ? formatVolume(latestData?.[metric] || 0)
                                                        : `$${(latestData?.[metric] || 0).toFixed(2)}`}
                                                </span>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}