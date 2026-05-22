"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SearchInput } from "@/components/ui/search-input";
import { ScrollReveal } from "@/components/gsap/scroll-reveal";
import { format } from "date-fns";
import { ArrowUpRight, Tag, Clock, BookOpen } from "lucide-react";

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    seo?: { metaDescription?: string };
    primaryTag?: string;
    secondaryTags?: string[];
    publishedAt?: string;
    createdAt: string;
    readingTime?: number;
}

interface BlogClientProps {
    posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Derive tags from posts
    const allTags = Array.from(
        new Set(posts.flatMap((p) => [p.primaryTag, ...(p.secondaryTags || [])]).filter(Boolean))
    ).sort() as string[];

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        let matches = true;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            matches =
                (post.title?.toLowerCase().includes(q) || false) ||
                (post.excerpt?.toLowerCase().includes(q) || false) ||
                (post.seo?.metaDescription?.toLowerCase().includes(q) || false) ||
                (post.primaryTag?.toLowerCase().includes(q) || false);
        }

        if (activeTag) {
            matches = matches && [post.primaryTag, ...(post.secondaryTags || [])].includes(activeTag);
        }

        return matches;
    });

    return (
        <Section className="min-h-screen pt-32 pb-24">
            <Container className="max-w-5xl">
                <div className="space-y-16">
                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">05</span>
                            <div className="h-px flex-1 bg-[#27272A]" />
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="h-5 w-5 text-[#8B5CF6]" />
                            <span className="text-sm font-mono text-[#8B5CF6] uppercase tracking-widest">
                                The Thinking Lab
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#EDEDED]">
                            Notes &amp; Guides
                        </h1>
                        <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
                            Documenting the journey of building AI systems, automation workflows,
                            and creative infrastructure. Deep dives, not surface level.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="max-w-md">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search by title, tag, or keyword..."
                            className="w-full"
                        />
                        {searchQuery && (
                            <p className="mt-3 text-sm text-[#A1A1AA] font-mono">
                                Found {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                            </p>
                        )}
                    </div>

                    {/* Tags */}
                    {allTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <Tag className="h-4 w-4 text-[#A1A1AA] mr-1" />
                            <button
                                onClick={() => setActiveTag(null)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                    !activeTag
                                        ? "bg-[#8B5CF6] text-[#111111]"
                                        : "bg-[#1A1A1A] text-[#A1A1AA] border border-[#27272A] hover:border-[#3F3F46] hover:text-[#EDEDED]"
                                }`}
                            >
                                All
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                        activeTag === tag
                                            ? "bg-[#8B5CF6] text-[#111111]"
                                            : "bg-[#1A1A1A] text-[#A1A1AA] border border-[#27272A] hover:border-[#3F3F46] hover:text-[#EDEDED]"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Posts */}
                    <div className="space-y-4">
                        {filteredPosts.length === 0 ? (
                            <div className="py-16 text-center border border-dashed border-[#27272A] rounded-2xl">
                                <div className="flex flex-col items-center gap-3">
                                    <BookOpen className="h-8 w-8 text-[#27272A]" />
                                    <p className="text-[#A1A1AA]">
                                        {searchQuery || activeTag
                                            ? `No posts found for &quot;${searchQuery || activeTag}&quot;`
                                            : "No published posts yet."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            filteredPosts.map((post, i) => (
                                <ScrollReveal key={post.slug} delay={i * 0.06}>
                                    <Link href={`/blog/${post.slug}`} className="group block">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl border border-[#27272A] bg-[#1A1A1A]/60 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/80 transition-all duration-300 hover:-translate-y-0.5">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    {post.primaryTag && (
                                                        <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
                                                            {post.primaryTag}
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-[#A1A1AA]/60">
                                                        {post.publishedAt
                                                            ? format(new Date(post.publishedAt), "MMM dd, yyyy")
                                                            : format(new Date(post.createdAt), "MMM dd, yyyy")}
                                                    </span>
                                                    {post.readingTime && post.readingTime > 0 && (
                                                        <span className="flex items-center gap-1 text-xs text-[#A1A1AA]/40">
                                                            <Clock className="h-3 w-3" />
                                                            {post.readingTime} min
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="font-heading text-xl font-semibold text-[#EDEDED] group-hover:text-[#8B5CF6] transition-colors duration-300 mb-1 line-clamp-1">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-[#A1A1AA] line-clamp-2">
                                                    {post.excerpt || post.seo?.metaDescription || "Read this article to explore the thinking behind the systems."}
                                                </p>
                                                {post.secondaryTags && post.secondaryTags.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                                        {post.secondaryTags.slice(0, 3).map((tag: string) => (
                                                            <span
                                                                key={tag}
                                                                className="text-xs text-[#A1A1AA]/50 bg-[#27272A]/50 px-2 py-0.5 rounded"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <ArrowUpRight className="h-5 w-5 text-[#3F3F46] group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
