"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";
import { X, Plus, Search, Tags, Key } from "lucide-react";

// Simple Label component
const LabelText = ({ children }: { children: React.ReactNode }) => (
    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
        {children}
    </div>
);

// Tag/chip input component for SEO tags and keywords
function TagInput({
    value,
    onChange,
    placeholder,
    icon: Icon,
}: {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder: string;
    icon?: React.ElementType;
}) {
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
        }
        setInputValue("");
    };

    const addTagsFromPaste = (text: string) => {
        const newTags = text
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t && !value.includes(t));
        if (newTags.length > 0) {
            onChange([...value, ...newTags]);
        }
        setInputValue("");
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }
        if (e.key === "Backspace" && !inputValue && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData("text");
        if (text.includes(",")) {
            e.preventDefault();
            addTagsFromPaste(text);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-1.5 flex-wrap min-h-[32px]">
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 animate-in fade-in-0 zoom-in-95"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    {Icon && (
                        <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder={placeholder}
                        className={Icon ? "pl-8 text-sm h-9" : "text-sm h-9"}
                    />
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 px-2.5"
                    onClick={addTag}
                    disabled={!inputValue.trim()}
                >
                    <Plus className="h-3.5 w-3.5" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Press Enter or comma to add. Paste comma-separated values.
            </p>
        </div>
    );
}

interface PostSettingsProps {
    data: any;
    onChange: (data: any) => void;
    onSave: () => void;
    isSaving: boolean;
}

export function PostSettings({ data, onChange, onSave, isSaving }: PostSettingsProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const handleImageSelect = (media: { url: string; alt: string }) => {
        handleChange('coverImage', { url: media.url, alt: media.alt });
    };

    const removeCoverImage = () => {
        handleChange('coverImage', { url: '', alt: '' });
    };

    const metaTitleLen = (data.seo?.metaTitle || '').length;
    const metaDescLen = (data.seo?.metaDescription || '').length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <LabelText>Status</LabelText>
                        <select
                            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={data.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                    <div>
                        <LabelText>Publish Date</LabelText>
                        <Input type="date" value={data.publishedAt ? new Date(data.publishedAt).toISOString().split('T')[0] : ''} onChange={(e) => handleChange('publishedAt', e.target.value)} />
                    </div>
                    <Button className="w-full" onClick={onSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Post"}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Search className="h-4 w-4 text-primary" />
                        SEO & Meta
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <LabelText>URL Slug</LabelText>
                        <Input placeholder="my-awesome-post" value={data.slug} onChange={(e) => handleChange('slug', e.target.value)} />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <LabelText>Meta Title</LabelText>
                            <span className={`text-xs font-mono ${metaTitleLen > 60 ? 'text-red-500' : metaTitleLen > 50 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                                {metaTitleLen}/60
                            </span>
                        </div>
                        <Input placeholder="SEO Title (60 chars)" value={data.seo?.metaTitle || ''} onChange={(e) => handleChange('seo', { ...data.seo, metaTitle: e.target.value })} />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <LabelText>Meta Description</LabelText>
                            <span className={`text-xs font-mono ${metaDescLen > 160 ? 'text-red-500' : metaDescLen > 140 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                                {metaDescLen}/160
                            </span>
                        </div>
                        <Textarea placeholder="SEO Description (160 chars)" className="h-20" value={data.seo?.metaDescription || ''} onChange={(e) => handleChange('seo', { ...data.seo, metaDescription: e.target.value })} />
                    </div>
                    <div>
                        <LabelText>Excerpt</LabelText>
                        <Textarea
                            placeholder="Short summary shown in blog listing and social cards..."
                            className="h-20"
                            value={data.excerpt || ''}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                        />
                    </div>
                    <div>
                        <LabelText>Canonical URL (optional)</LabelText>
                        <Input
                            placeholder="https://example.com/original-post"
                            value={data.seo?.canonicalUrl || ''}
                            onChange={(e) => handleChange('seo', { ...data.seo, canonicalUrl: e.target.value })}
                        />
                    </div>
                    <div>
                        <LabelText>Primary Tag</LabelText>
                        <Input placeholder="e.g. automation" value={data.primaryTag} onChange={(e) => handleChange('primaryTag', e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Tags className="h-4 w-4 text-primary" />
                        SEO Tags
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        Tags for categorization and Open Graph. E.g.: AI, creativity, AI tools
                    </p>
                </CardHeader>
                <CardContent>
                    <TagInput
                        value={data.seo?.seoTags || []}
                        onChange={(tags) => handleChange('seo', { ...data.seo, seoTags: tags })}
                        placeholder="Add a tag..."
                        icon={Tags}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Key className="h-4 w-4 text-primary" />
                        SEO Keywords
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        Target keywords for search ranking. E.g.: can AI replace creativity, AI vs human creativity
                    </p>
                </CardHeader>
                <CardContent>
                    <TagInput
                        value={data.seo?.seoKeywords || []}
                        onChange={(keywords) => handleChange('seo', { ...data.seo, seoKeywords: keywords })}
                        placeholder="Add a keyword..."
                        icon={Key}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        Secondary Tags
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        Displayed at the bottom of blog posts. Visitors can click to filter.
                    </p>
                </CardHeader>
                <CardContent>
                    <TagInput
                        value={data.secondaryTags || []}
                        onChange={(tags) => handleChange('secondaryTags', tags)}
                        placeholder="Add a display tag..."
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.coverImage?.url ? (
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={data.coverImage.url} alt={data.coverImage.alt || 'Cover'} className="h-full w-full object-cover" />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={removeCoverImage}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <MediaPickerModal
                            onSelect={handleImageSelect}
                            trigger={
                                <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-accent/50 cursor-pointer transition-colors h-32">
                                    <span>Select Image</span>
                                </div>
                            }
                        />
                    )}

                    {data.coverImage?.url && (
                        <div className="mt-2">
                            <LabelText>Alt Text</LabelText>
                            <Input
                                placeholder="Image description..."
                                value={data.coverImage.alt || ''}
                                onChange={(e) => handleChange('coverImage', { ...data.coverImage, alt: e.target.value })}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
