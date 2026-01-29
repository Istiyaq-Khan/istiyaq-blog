"use server";

import connectDB from "@/lib/db";
import BlogPost, { IBlogPost } from "@/models/BlogPost";
import Settings, { ISettings } from "@/models/Settings";
import Media from "@/models/Media";
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

export async function getPosts(page: number = 1, limit: number = 10, filter: any = {}) {
    try {
        await connectDB();
        const skip = (page - 1) * limit;
        const posts = await BlogPost.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await BlogPost.countDocuments(filter);

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

export async function getSettings() {
    try {
        await connectDB();
        let settings = await Settings.findOne().lean();
        if (!settings) {
            settings = await Settings.create({});
        }
        return JSON.parse(JSON.stringify(settings));
    } catch (error) {
        console.error("Failed to fetch settings", error);
        return null;
    }
}

export async function updateSettings(data: Partial<ISettings>): Promise<ActionResponse> {
    try {
        await connectDB();
        const settings = await Settings.findOne();
        if (!settings) {
            await Settings.create(data);
        } else {
            Object.assign(settings, data);
            await settings.save();
        }
        revalidatePath("/");
        return { success: true, message: "Settings updated successfully" };
    } catch (error: any) {
        console.error("Failed to update settings", error);
        return { success: false, message: error.message || "Failed to update settings" };
    }
}

export async function getMediaLibrary() {
    try {
        await connectDB();

        // 1. Fetch explicitly uploaded media
        const uploadedMedia = await Media.find().sort({ createdAt: -1 }).lean();

        const images: { url: string; alt: string; source: string; id?: string }[] = uploadedMedia.map((m: any) => ({
            url: m.url,
            alt: m.alt || m.filename,
            source: 'Uploaded',
            id: m._id.toString()
        }));

        // 2. Aggregate all images from blog posts
        const posts = await BlogPost.find({}, 'coverImage blocks title').lean();

        posts.forEach((post: any) => {
            if (post.coverImage?.url) {
                images.push({
                    url: post.coverImage.url,
                    alt: post.coverImage.alt || 'Cover Image',
                    source: `Post: ${post.title || post._id}`
                });
            }
            if (post.blocks) {
                post.blocks.forEach((block: any) => {
                    if (block.type === 'image' && block.content?.url) {
                        images.push({
                            url: block.content.url,
                            alt: block.content.alt || 'Content Image',
                            source: `Post: ${post.title || post._id}`
                        });
                    }
                });
            }
        });

        // Deduplicate based on URL (prefer the 'Uploaded' one if duplicate exists)
        const uniqueMap = new Map();
        images.forEach(img => {
            if (!uniqueMap.has(img.url)) {
                uniqueMap.set(img.url, img);
            } else if (img.source === "Uploaded") {
                // Overwrite if we find an uploaded record for the same URL, as it might have more metadata
                uniqueMap.set(img.url, img);
            }
        });

        return Array.from(uniqueMap.values());
    } catch (error) {
        console.error("Failed to fetch media", error);
        return [];
    }
}
