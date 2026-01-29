"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";

interface Post {
    _id: string;
    title: string;
    status: string;
    createdAt: string;
}

interface PostsTableClientProps {
    posts: Post[];
    deleteAction: (formData: FormData) => Promise<void>;
}

export function PostsTableClient({ posts, deleteAction }: PostsTableClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter posts based on search query
    const filteredPosts = posts.filter((post) => {
        if (!searchQuery) return true;

        const searchLower = searchQuery.toLowerCase();
        return (
            post.title?.toLowerCase().includes(searchLower) ||
            post.status?.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-3xl font-bold">Posts</h1>
                <Link href="/admin/posts/new">
                    <Button>Create Post</Button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-md">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search posts by title or status..."
                    className="w-full"
                />
                {searchQuery && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                    </p>
                )}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPosts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    {searchQuery
                                        ? `No posts found matching "${searchQuery}"`
                                        : "No posts found."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPosts.map((post) => (
                                <TableRow key={post._id}>
                                    <TableCell className="font-medium">
                                        {post.title}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                            {post.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/posts/${post._id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <form action={deleteAction}>
                                                <input type="hidden" name="id" value={post._id} />
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
