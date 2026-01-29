"use client";

import { useState } from "react";
import { updateSettings } from "@/lib/actions/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Assuming generic textarea exists or reusing ui/textarea if created
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export default function SettingsForm({ initialData }: { initialData: any }) {
    const [data, setData] = useState(initialData || {});
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleChange = (field: string, value: any) => {
        setData({ ...data, [field]: value });
    };

    const handleSocialChange = (field: string, value: any) => {
        setData({ ...data, socials: { ...data.socials, [field]: value } });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const res = await updateSettings(data);
        setIsSaving(false);

        if (res.success) {
            toast({ title: "Success", description: "Settings updated successfully" });
        } else {
            toast({ title: "Error", description: "Failed to update settings", variant: "destructive" });
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Basic details about your blog.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Site Name</Label>
                        <Input
                            value={data.siteName || ""}
                            onChange={(e) => handleChange("siteName", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.siteDescription || ""}
                            onChange={(e) => handleChange("siteDescription", e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Links displayed in your footer or profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Twitter</Label>
                        <Input
                            placeholder="@username"
                            value={data.socials?.twitter || ""}
                            onChange={(e) => handleSocialChange("twitter", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>GitHub</Label>
                        <Input
                            placeholder="username"
                            value={data.socials?.github || ""}
                            onChange={(e) => handleSocialChange("github", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>LinkedIn</Label>
                        <Input
                            placeholder="username"
                            value={data.socials?.linkedin || ""}
                            onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
