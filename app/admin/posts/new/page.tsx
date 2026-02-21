"use client";

import { DualEditor } from "@/components/editor/dual-editor";
import { PostSettings } from "@/components/editor/post-settings";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createPost } from "@/lib/actions/blog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { IBlogPost } from "@/models/BlogPost";

export default function NewPostPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    const [post, setPost] = useState<Partial<IBlogPost>>({
        title: "",
        slug: "",
        status: "draft",
        blocks: [],
        primaryTag: "General",
        seo: {
            metaTitle: "",
            metaDescription: ""
        }
    });

    const handleSave = async () => {
        setIsSaving(true);
        const res = await createPost(post);
        setIsSaving(false);

        if (res.success) {
            toast({
                title: "Success",
                description: "Post created successfully",
            });
            router.push("/admin/posts");
        } else {
            toast({
                title: "Error",
                description: "Failed to save post: " + res.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Input
                    className="text-4xl font-heading font-bold border-none px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    placeholder="Post Title..."
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <DualEditor
                        contentFormat={post.contentFormat || 'blocks'}
                        setContentFormat={(format) => setPost({ ...post, contentFormat: format })}
                        blocks={post.blocks || []}
                        setBlocks={(blocks) => setPost({ ...post, blocks })}
                        markdownContent={post.markdownContent || ''}
                        setMarkdownContent={(content) => setPost({ ...post, markdownContent: content })}
                    />
                </div>
                <div className="lg:col-span-1">
                    <PostSettings
                        data={post}
                        onChange={setPost}
                        onSave={handleSave}
                        isSaving={isSaving}
                    />
                </div>
            </div>
        </div>
    );
}
