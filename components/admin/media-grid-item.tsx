"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Copy, Check } from "lucide-react";
import { updateMedia } from "@/lib/actions/blog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface MediaItemProps {
    image: {
        url: string;
        alt: string;
        source: string;
        id?: string;
    };
}

export function MediaGridItem({ image }: MediaItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [altText, setAltText] = useState(image.alt);
    const [isSaving, setIsSaving] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const markdownLink = `![${image.alt || "image"}](${image.url})`;
    const rawUrl = image.url;

    const handleCopy = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(label);
            toast({ title: "Copied!", description: `${label} copied to clipboard` });
            setTimeout(() => setCopied(null), 2000);
        } catch {
            toast({ title: "Error", description: "Failed to copy", variant: "destructive" });
        }
    };

    const handleSave = async () => {
        if (!image.id || image.source !== 'Uploaded') {
            toast({
                title: "Cannot Edit",
                description: "Only directly uploaded images can be edited.",
                variant: "destructive"
            });
            return;
        }

        setIsSaving(true);
        const res = await updateMedia(image.id, { alt: altText });
        setIsSaving(false);

        if (res.success) {
            setIsOpen(false);
            toast({ title: "Success", description: "Image updated." });
            router.refresh();
        } else {
            toast({
                title: "Error",
                description: res.message,
                variant: "destructive"
            });
        }
    };

    return (
        <Card className="overflow-hidden group relative">
            <div className="aspect-square relative bg-muted">
                <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground border-none">
                                <Pencil className="h-3 w-3" /> Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Image Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                                {/* Image Preview */}
                                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted border border-border">
                                    <Image src={image.url} alt={image.alt} fill className="object-contain" />
                                </div>

                                {/* Markdown Link */}
                                <div className="space-y-1.5">
                                    <Label className="text-sm font-medium">Markdown Link</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            readOnly
                                            value={markdownLink}
                                            className="font-mono text-xs bg-muted/50"
                                            onClick={(e) => (e.target as HTMLInputElement).select()}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0 h-10 w-10"
                                            onClick={() => handleCopy(markdownLink, "Markdown")}
                                        >
                                            {copied === "Markdown" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Raw URL */}
                                <div className="space-y-1.5">
                                    <Label className="text-sm font-medium">Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            readOnly
                                            value={rawUrl}
                                            className="font-mono text-xs bg-muted/50"
                                            onClick={(e) => (e.target as HTMLInputElement).select()}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0 h-10 w-10"
                                            onClick={() => handleCopy(rawUrl, "URL")}
                                        >
                                            {copied === "URL" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Alt Text (editable only for uploaded) */}
                                {image.source === 'Uploaded' && (
                                    <div className="space-y-1.5">
                                        <Label className="text-sm font-medium">Alt Text</Label>
                                        <Input
                                            value={altText}
                                            onChange={(e) => setAltText(e.target.value)}
                                            placeholder="Describe this image..."
                                        />
                                    </div>
                                )}

                                {/* Source badge */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-muted-foreground">Source:</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${image.source === 'Uploaded' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        {image.source}
                                    </span>
                                </div>
                            </div>
                            <DialogFooter>
                                {image.source === 'Uploaded' && (
                                    <Button onClick={handleSave} disabled={isSaving}>
                                        {isSaving ? "Saving..." : "Save changes"}
                                    </Button>
                                )}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs text-white truncate">{image.source}</p>
                </div>
            </div>
        </Card>
    );
}
