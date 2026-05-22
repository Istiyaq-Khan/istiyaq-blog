"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface BlogPostPreview {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    primaryTag?: string;
    publishedAt?: string;
    createdAt: string;
    author?: { name: string };
}

interface RelatedPostsProps {
    posts: BlogPostPreview[];
    currentSlug: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const related = posts
        .filter((p) => p.slug !== currentSlug)
        .slice(0, 3);

    if (!related.length) return null;

    return (
        <div ref={containerRef} className="mt-16 pt-16 border-t border-[#27272A]/50">
            <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-8">
                Related Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block p-6 rounded-xl border border-[#27272A] bg-[#1A1A1A]/40 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/60 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        {post.primaryTag && (
                            <span className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-3 block">
                                {post.primaryTag}
                            </span>
                        )}
                        <h4 className="font-heading text-base font-semibold text-[#EDEDED] group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                            {post.title}
                        </h4>
                        <p className="text-sm text-[#A1A1AA] line-clamp-2">
                            {post.excerpt || "Continue reading for more insights."}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
