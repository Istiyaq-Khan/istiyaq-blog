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

export function PostSettings() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <LabelText>Status</LabelText>
                        <select className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                    <div>
                        <LabelText>Publish Date</LabelText>
                        <Input type="date" />
                    </div>
                    <Button className="w-full">Save Post</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">SEO & Meta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <LabelText>URL Slug</LabelText>
                        <Input placeholder="my-awesome-post" />
                    </div>
                    <div>
                        <LabelText>Meta Title</LabelText>
                        <Input placeholder="SEO Title (60 chars)" />
                    </div>
                    <div>
                        <LabelText>Meta Description</LabelText>
                        <Textarea placeholder="SEO Description (160 chars)" className="h-24" />
                    </div>
                    <div>
                        <LabelText>Primary Tag</LabelText>
                        <Input placeholder="e.g. automation" />
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
