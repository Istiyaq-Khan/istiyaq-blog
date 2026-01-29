import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPosts } from "@/lib/actions/blog";

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndexPage() {
    const { posts } = await getPosts(1, 100, { status: "published" });

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
                        {posts.length === 0 ? (
                            <p className="text-muted-foreground">No published posts found.</p>
                        ) : (
                            posts.map((post: any) => (
                                <Card key={post.slug} className="flex flex-col h-full bg-card/50 hover:bg-card transition-colors">
                                    <CardHeader>
                                        <div className="mb-2 text-xs font-medium text-primary uppercase tracking-wider">
                                            {post.primaryTag || "General"}
                                        </div>
                                        <CardTitle className="leading-tight">
                                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                                                {post.title}
                                            </Link>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground line-clamp-3">
                                            {post.excerpt || (post.seo?.metaDescription) || "No excerpt available."}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="text-sm text-muted-foreground">
                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
