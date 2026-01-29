"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/search-input";

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    seo?: {
        metaDescription?: string;
    };
    primaryTag?: string;
    publishedAt?: string;
    createdAt: string;
}

interface BlogClientProps {
    posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter posts based on search query
    const filteredPosts = posts.filter((post) => {
        if (!searchQuery) return true;

        const searchLower = searchQuery.toLowerCase();
        return (
            post.title?.toLowerCase().includes(searchLower) ||
            post.excerpt?.toLowerCase().includes(searchLower) ||
            post.seo?.metaDescription?.toLowerCase().includes(searchLower) ||
            post.primaryTag?.toLowerCase().includes(searchLower)
        );
    });

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

                    {/* Search Bar */}
                    <div className="max-w-md">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search posts by title, tag, or keyword..."
                            className="w-full"
                        />
                        {searchQuery && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">
                                    {searchQuery
                                        ? `No posts found matching "${searchQuery}"`
                                        : "No published posts found."}
                                </p>
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
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
                                            {post.excerpt || post.seo?.metaDescription || "No excerpt available."}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="text-sm text-muted-foreground">
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString()
                                            : new Date(post.createdAt).toLocaleDateString()}
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
