"use client";

import { useState } from "react";
import { Editor } from "./editor";
import { IBlock } from "./types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DualEditorProps {
    contentFormat: 'blocks' | 'markdown';
    setContentFormat: (format: 'blocks' | 'markdown') => void;
    blocks: IBlock[];
    setBlocks: (blocks: IBlock[]) => void;
    markdownContent: string;
    setMarkdownContent: (content: string) => void;
}

export function DualEditor({
    contentFormat,
    setContentFormat,
    blocks,
    setBlocks,
    markdownContent,
    setMarkdownContent
}: DualEditorProps) {
    const [previewMode, setPreviewMode] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center">
                <Button
                    variant={contentFormat === 'blocks' ? 'default' : 'outline'}
                    onClick={() => { setContentFormat('blocks'); setPreviewMode(false); }}
                    type="button"
                >
                    Block Editor
                </Button>
                <Button
                    variant={contentFormat === 'markdown' && !previewMode ? 'default' : 'outline'}
                    onClick={() => { setContentFormat('markdown'); setPreviewMode(false); }}
                    type="button"
                >
                    Markdown
                </Button>
                {contentFormat === 'markdown' && (
                    <Button
                        variant={previewMode ? 'default' : 'outline'}
                        onClick={() => setPreviewMode(!previewMode)}
                        type="button"
                        className="ml-auto"
                        size="sm"
                    >
                        {previewMode ? 'Edit' : 'Preview'}
                    </Button>
                )}
            </div>

            {contentFormat === 'blocks' ? (
                <Editor blocks={blocks} onChange={setBlocks} />
            ) : previewMode ? (
                <div className="min-h-[500px] border rounded-md p-6 bg-card/50 overflow-auto prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdownContent || '*No content to preview*'}
                    </ReactMarkdown>
                </div>
            ) : (
                <Textarea
                    className="min-h-[500px] font-mono p-4"
                    placeholder="Write your markdown here..."
                    value={markdownContent}
                    onChange={(e) => setMarkdownContent(e.target.value)}
                />
            )}
        </div>
    );
}
