"use client";

import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartDataPoint {
    date: string;
    views: number;
    visitors: number;
}

interface AnalyticsChartProps {
    data: ChartDataPoint[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                No analytics data available yet.
            </div>
        );
    }

    return (
        <div className="h-[400px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2, 220 70% 50%))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-2, 220 70% 50%))" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                        }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                        labelStyle={{ color: "hsl(var(--muted-foreground))", marginBottom: "4px" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="views"
                        name="Page Views"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorViews)"
                    />
                    <Area
                        type="monotone"
                        dataKey="visitors"
                        name="Unique Visitors"
                        stroke="hsl(var(--chart-2, 220 70% 50%))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVisitors)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
