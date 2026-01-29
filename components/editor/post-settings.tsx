"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming I have simple textarea
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Label import removed

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
                    <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-accent/50 cursor-pointer transition-colors">
                        <span>Upload Image</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
