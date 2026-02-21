"use server";

import connectDB from "@/lib/db";
import Analytics from "@/models/Analytics";
import { subDays, startOfDay, endOfDay, format } from "date-fns";

export async function getAnalyticsData(days = 7) {
    try {
        await connectDB();

        const startDate = startOfDay(subDays(new Date(), days - 1));
        const endDate = endOfDay(new Date());

        // Aggregate views per day
        const dailyData = await Analytics.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate, $lte: endDate },
                    event: 'page_view'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    views: { $sum: 1 },
                    uniqueVisitors: { $addToSet: "$sessionIdentifier" }
                }
            },
            {
                $project: {
                    date: "$_id",
                    views: 1,
                    uniqueVisitors: { $size: "$uniqueVisitors" },
                    _id: 0
                }
            },
            { $sort: { date: 1 } }
        ]);

        // Fill in missing dates
        const result = [];
        let totalViews = 0;
        let totalUnique = 0;

        for (let i = days - 1; i >= 0; i--) {
            const dateObj = subDays(new Date(), i);
            const dateStr = format(dateObj, 'yyyy-MM-dd');
            const displayDate = format(dateObj, 'MMM dd');

            const found = dailyData.find(d => d.date === dateStr);
            if (found) {
                result.push({ date: displayDate, views: found.views, visitors: found.uniqueVisitors });
                totalViews += found.views;
                totalUnique += found.uniqueVisitors;
            } else {
                result.push({ date: displayDate, views: 0, visitors: 0 });
            }
        }

        return {
            chartData: result,
            summary: { totalViews, totalUnique }
        };

    } catch (error) {
        console.error("Failed to fetch analytics data", error);
        return { chartData: [], summary: { totalViews: 0, totalUnique: 0 } };
    }
}

export async function getTopPostsAnalytics(limit = 10) {
    try {
        await connectDB();

        const topPosts = await Analytics.aggregate([
            {
                $match: {
                    event: 'page_view',
                    path: { $regex: '^/blog/' }
                }
            },
            {
                $group: {
                    _id: "$path",
                    views: { $sum: 1 },
                    uniqueVisitors: { $addToSet: "$sessionIdentifier" }
                }
            },
            {
                $project: {
                    path: "$_id",
                    views: 1,
                    uniqueVisitors: { $size: "$uniqueVisitors" },
                    _id: 0
                }
            },
            { $sort: { views: -1 } },
            { $limit: limit }
        ]);

        return topPosts;
    } catch (error) {
        console.error("Failed to fetch top posts", error);
        return [];
    }
}
