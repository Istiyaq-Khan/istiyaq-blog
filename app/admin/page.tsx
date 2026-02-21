import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/actions/blog";
import { getAnalyticsData, getTopPostsAnalytics } from "@/lib/actions/analytics";
import { FileText, Edit3, TrendingUp, Users } from "lucide-react";
import { AnalyticsChart } from "@/components/admin/analytics-chart";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();
    const analytics = await getAnalyticsData(7);
    const topPosts = await getTopPostsAnalytics(5);

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="font-heading text-4xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground text-lg">Welcome back. Here's what's happening today.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-card to-muted/50 border-border/50 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
                        <FileText className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">{stats.totalPosts}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-emerald-500 font-medium">Published & Drafts</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-card to-muted/50 border-border/50 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
                        <Edit3 className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">{stats.totalDrafts}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-orange-500 font-medium">Needs finishing</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-card to-muted/50 border-border/50 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Views (7d)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">{analytics.summary.totalViews}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-500 font-medium">Across all pages</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-card to-muted/50 border-border/50 shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors (7d)</CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">{analytics.summary.totalUnique}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-purple-500 font-medium">Active users</p>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Chart & Top Posts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <Card className="col-span-1 lg:col-span-2 border-border/50 shadow-sm bg-gradient-to-br from-card to-muted/20">
                    <CardHeader>
                        <CardTitle className="font-heading">Traffic Overview (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[430px] pt-0">
                        <AnalyticsChart data={analytics.chartData} />
                    </CardContent>
                </Card>

                <Card className="col-span-1 border-border/50 shadow-sm bg-gradient-to-br from-card to-muted/20">
                    <CardHeader>
                        <CardTitle className="font-heading">Top Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topPosts.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-8">No data available yet</p>
                            ) : (
                                topPosts.map((post: any, i: number) => {
                                    const slug = post.path.replace('/blog/', '').replace('/', '');
                                    const displayName = slug ? slug.replace(/-/g, ' ') : 'Home';

                                    return (
                                        <div key={post.path} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                                    {i + 1}
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-sm font-medium truncate capitalize">{displayName}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{post.path}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-bold">{post.views}</span>
                                                <span className="text-xs text-muted-foreground">views</span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
