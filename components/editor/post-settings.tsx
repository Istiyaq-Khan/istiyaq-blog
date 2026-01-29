"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";
import { X } from "lucide-react";

// Simple Label component if needed locally or just divs
const LabelText = ({ children }: { children: React.ReactNode }) => (
    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
        {children}
    </div>
);

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
                    <CardTitle className="text-lg">SEO & Meta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <LabelText>URL Slug</LabelText>
                        <Input placeholder="my-awesome-post" value={data.slug} onChange={(e) => handleChange('slug', e.target.value)} />
                    </div>
                    <div>
                        <LabelText>Meta Title</LabelText>
                        <Input placeholder="SEO Title (60 chars)" value={data.seo?.metaTitle || ''} onChange={(e) => handleChange('seo', { ...data.seo, metaTitle: e.target.value })} />
                    </div>
                    <div>
                        <LabelText>Meta Description</LabelText>
                        <Textarea placeholder="SEO Description (160 chars)" className="h-24" value={data.seo?.metaDescription || ''} onChange={(e) => handleChange('seo', { ...data.seo, metaDescription: e.target.value })} />
                    </div>
                    <div>
                        <LabelText>Primary Tag</LabelText>
                        <Input placeholder="e.g. automation" value={data.primaryTag} onChange={(e) => handleChange('primaryTag', e.target.value)} />
                    </div>
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
