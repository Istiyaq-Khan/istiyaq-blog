import { Fragment } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getPosts } from "@/lib/actions/blog";
import { HomeClient } from "./home-client";

interface Post {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    primaryTag?: string;
    publishedAt?: string;
    createdAt: string;
}

export default async function HomePage() {
    const { posts } = await getPosts(1, 3, { status: "published" });
    
    // Pass only serializable data to the client component
    const recentPosts: Post[] = (posts || []).map((p: any) => ({
        _id: p._id.toString(),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        primaryTag: p.primaryTag,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
    }));

    return (
        <Fragment>
            <HomeClient recentPosts={recentPosts} />
            <Analytics />
        </Fragment>
    );
}
