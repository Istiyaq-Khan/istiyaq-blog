import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock Data for now - eventually fetch from DB
const posts = [
    {
        slug: "automate-content-repurposing",
        title: "How I Automated My Content Workflow",
        excerpt: "This system reduced my content creation time by 70% using n8n and Notion.",
        date: "Oct 24, 2024",
        category: "Automation"
    },
    {
        slug: "youtube-seo-guide",
        title: "The Ultimate Guide to YouTube SEO",
        excerpt: "Ranking #1 for high-intent keywords without 1M subscribers.",
        date: "Nov 12, 2024",
        category: "Guides"
    }
];

export default function BlogIndexPage() {
    return (
        <Section>
            <Container>
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h1 className="font-heading text-4xl font-bold">Notes & Guides</h1>
                        <p className="max-w-xl text-lg text-muted-foreground">
                            Documenting my journey in building systems, automations, and creative workflows.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Card key={post.slug} className="flex flex-col h-full bg-card/50 hover:bg-card transition-colors">
                                <CardHeader>
                                    <div className="mb-2 text-xs font-medium text-primary uppercase tracking-wider">
                                        {post.category}
                                    </div>
                                    <CardTitle className="leading-tight">
                                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-muted-foreground line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="text-sm text-muted-foreground">
                                    {post.date}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
