"use client";

import { IBlock, IBlockContent } from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";
import { ImageIcon } from "lucide-react";

interface BlockProps {
    block: IBlock;
    updateBlock: (id: string, content: IBlockContent) => void;
    removeBlock: (id: string) => void;
    moveBlock: (id: string, direction: 'up' | 'down') => void;
    index: number;
    isFirst: boolean;
    isLast: boolean;
}

export function BlockWrapper({ children, block, removeBlock, moveBlock, isFirst, isLast }: BlockProps & { children: React.ReactNode }) {
    return (
        <div className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:ring-1 hover:ring-ring">
            <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveBlock(block.id, 'up')}
                    disabled={isFirst}
                >
                    <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveBlock(block.id, 'down')}
                    disabled={isLast}
                >
                    <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    onClick={() => removeBlock(block.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            {children}
        </div>
    );
}

export function HeadingBlock({ block, updateBlock, ...props }: BlockProps) {
    return (
        <BlockWrapper block={block} updateBlock={updateBlock} {...props}>
            <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Heading</span>
                <div className="flex gap-2">
                    <select
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={block.content.level || 2}
                        onChange={(e) => updateBlock(block.id, { ...block.content, level: parseInt(e.target.value) })}
                    >
                        <option value={1}>H1</option>
                        <option value={2}>H2</option>
                        <option value={3}>H3</option>
                    </select>
                    <Input
                        placeholder="Heading text..."
                        value={block.content.text || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                        className="font-heading font-bold"
                    />
                </div>
            </div>
        </BlockWrapper>
    );
}

export function ParagraphBlock({ block, updateBlock, ...props }: BlockProps) {
    return (
        <BlockWrapper block={block} updateBlock={updateBlock} {...props}>
            <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Paragraph</span>
                <Textarea
                    placeholder="Write something..."
                    value={block.content.text || ""}
                    onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                    className="min-h-[100px] resize-y"
                />
            </div>
        </BlockWrapper>
    );
}

export function ImageBlock({ block, updateBlock, ...props }: BlockProps) {
    return (
        <BlockWrapper block={block} updateBlock={updateBlock} {...props}>
            <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Image</span>
                <div className="flex gap-2">
                    <Input
                        placeholder="Image URL (https://...)"
                        value={block.content.url || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                        className="flex-1"
                    />
                    <MediaPickerModal
                        onSelect={(media) => updateBlock(block.id, { ...block.content, url: media.url, alt: media.alt })}
                        trigger={
                            <Button variant="outline" size="icon" title="Select from Library">
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                        }
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        placeholder="Alt Text (SEO)"
                        value={block.content.alt || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, alt: e.target.value })}
                    />
                    <Input
                        placeholder="Caption"
                        value={block.content.caption || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, caption: e.target.value })}
                    />
                </div>
                {block.content.url && (
                    <div className="mt-2 aspect-video w-40 overflow-hidden rounded-md bg-muted object-cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={block.content.url} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                )}
            </div>
        </BlockWrapper>
    );
}

export function CodeBlock({ block, updateBlock, ...props }: BlockProps) {
    return (
        <BlockWrapper block={block} updateBlock={updateBlock} {...props}>
            <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Code Block</span>
                <div className="flex gap-2">
                    <Input
                        placeholder="Language (js, ts, css...)"
                        className="w-32"
                        value={block.content.language || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, language: e.target.value })}
                    />
                    <Input
                        placeholder="Filename (optional)"
                        value={block.content.filename || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, filename: e.target.value })}
                    />
                </div>
                <Textarea
                    placeholder="// Code here..."
                    value={block.content.code || ""}
                    onChange={(e) => updateBlock(block.id, { ...block.content, code: e.target.value })}
                    className="font-mono text-xs min-h-[150px] bg-muted/50"
                />
            </div>
        </BlockWrapper>
    );
}

export function QuoteBlock({ block, updateBlock, ...props }: BlockProps) {
    return (
        <BlockWrapper block={block} updateBlock={updateBlock} {...props}>
            <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Quote</span>
                <Textarea
                    placeholder="Quote text..."
                    value={block.content.text || ""}
                    onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                    className="min-h-[100px] border-l-4 border-l-primary/50 text-lg italic bg-muted/30"
                />
                <Input
                    placeholder="Citation (optional)"
                    value={block.content.citation || ""}
                    onChange={(e) => updateBlock(block.id, { ...block.content, citation: e.target.value })}
                    className="text-sm text-muted-foreground"
                />
            </div>
        </BlockWrapper>
    );
}

export function CalloutBlock({ block, updateBlock, ...props }: BlockProps) {
    return (
        <BlockWrapper block={block} updateBlock={updateBlock} {...props}>
            <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">Callout</span>
                <div className="flex gap-2">
                    <select
                        className="h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={block.content.intent || "info"}
                        onChange={(e) => updateBlock(block.id, { ...block.content, intent: e.target.value })}
                    >
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="success">Success</option>
                        <option value="error">Error</option>
                    </select>
                    <Input
                        placeholder="Callout text..."
                        value={block.content.text || ""}
                        onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                        className="flex-1"
                    />
                </div>
            </div>
        </BlockWrapper>
    );
}
