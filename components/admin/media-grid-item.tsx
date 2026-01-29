"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
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
    const { toast } = useToast();
    const router = useRouter();

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
                    {image.source === 'Uploaded' && (
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground border-none">
                                    <Pencil className="h-3 w-3" /> Edit
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Image Details</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="alt" className="text-right">
                                            Alt Text
                                        </Label>
                                        <Input
                                            id="alt"
                                            value={altText}
                                            onChange={(e) => setAltText(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSave} disabled={isSaving}>
                                        {isSaving ? "Saving..." : "Save changes"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs text-white truncate">{image.source}</p>
                </div>
            </div>
        </Card>
    );
}
