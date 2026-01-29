"use client";

import { Editor } from "@/components/editor/editor";
import { PostSettings } from "@/components/editor/post-settings";
import { Input } from "@/components/ui/input";

export default function NewPostPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Input
                    className="text-4xl font-heading font-bold border-none px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    placeholder="Post Title..."
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Editor />
                </div>
                <div className="lg:col-span-1">
                    <PostSettings />
                </div>
            </div>
        </div>
    );
}
