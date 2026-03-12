import { BlogClient } from "@/components/blog/blog-client";
import { getPosts } from "@/lib/actions/blog";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    alternates: {
        canonical: "https://blog.istiyaq.com/blog",
    },
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndexPage() {
    const { posts } = await getPosts(1, 100, { status: "published" });

    return <BlogClient posts={posts} />;
}
