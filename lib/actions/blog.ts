"use server";

import connectDB from "@/lib/db";
import BlogPost, { IBlogPost } from "@/models/BlogPost";
import { revalidatePath } from "next/cache";

// --- Types ---
export type ActionResponse = {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
};

// --- Actions ---

export async function getDashboardStats() {
    try {
        await connectDB();
        const totalPosts = await BlogPost.countDocuments();
        const totalDrafts = await BlogPost.countDocuments({ status: "draft" });
        return {
            totalPosts,
            totalDrafts,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        return { totalPosts: 0, totalDrafts: 0 };
    }
}

export async function getPosts(page: number = 1, limit: number = 10) {
    try {
        await connectDB();
        const skip = (page - 1) * limit;
        const posts = await BlogPost.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await BlogPost.countDocuments();

        // Serialize specialized types (Date, ObjectId) for client components
        const serializedPosts = JSON.parse(JSON.stringify(posts));

        return {
            posts: serializedPosts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    } catch (error) {
        console.error("Failed to fetch posts", error);
        return { posts: [], totalPages: 1, currentPage: 1 };
    }
}

export async function getPost(id: string) {
    try {
        await connectDB();
        const post = await BlogPost.findById(id).lean();
        if (!post) return null;
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error("Failed to fetch post", error);
        return null;
    }
}

export async function createPost(data: Partial<IBlogPost>): Promise<ActionResponse> {
    try {
        await connectDB();
        const newPost = await BlogPost.create(data);
        revalidatePath("/admin/posts");
        revalidatePath("/blog");
        return { success: true, message: "Post created successfully", data: JSON.parse(JSON.stringify(newPost)) };
    } catch (error: any) {
        console.error("Failed to create post", error);
        return { success: false, message: error.message || "Failed to create post", error };
    }
}

export async function updatePost(id: string, data: Partial<IBlogPost>): Promise<ActionResponse> {
    try {
        await connectDB();
        const updatedPost = await BlogPost.findByIdAndUpdate(id, data, { new: true });
        revalidatePath("/admin/posts");
        revalidatePath("/blog");
        revalidatePath(`/blog/${updatedPost?.slug}`);
        return { success: true, message: "Post updated successfully", data: JSON.parse(JSON.stringify(updatedPost)) };
    } catch (error: any) {
        console.error("Failed to update post", error);
        return { success: false, message: error.message || "Failed to update post", error };
    }
}

export async function deletePost(id: string): Promise<ActionResponse> {
    try {
        await connectDB();
        await BlogPost.findByIdAndDelete(id);
        revalidatePath("/admin/posts");
        revalidatePath("/blog");
        return { success: true, message: "Post deleted successfully" };
    } catch (error: any) {
        console.error("Failed to delete post", error);
        return { success: false, message: error.message || "Failed to delete post", error };
    }
}
