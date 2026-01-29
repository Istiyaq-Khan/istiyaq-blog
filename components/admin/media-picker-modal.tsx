"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Image as ImageIcon, Upload } from "lucide-react";
import { getMediaLibrary } from "@/lib/actions/blog";
import { UploadButton } from "@/app/admin/media/upload-button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaItem {
    url: string;
    alt: string;
    id?: string;
    source: string;
}

interface MediaPickerModalProps {
    onSelect: (media: { url: string; alt: string }) => void;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function MediaPickerModal({ onSelect, trigger, open: controlledOpen, onOpenChange: setControlledOpen }: MediaPickerModalProps) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled ? setControlledOpen! : setInternalOpen;

    const fetchMedia = async () => {
        setLoading(true);
        const data = await getMediaLibrary();
        setMedia(data as MediaItem[]);
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen]);

    const filteredMedia = media.filter(item =>
        item.alt?.toLowerCase().includes(search.toLowerCase()) ||
        item.url.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (item: MediaItem) => {
        onSelect({ url: item.url, alt: item.alt });
        setOpen(false);
    };

    // Callback to refresh list after upload
    const handleUploadSuccess = async () => {
        await fetchMedia();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-4 py-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search images..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* We need to adapt UploadButton to call our refresh callback. 
                        Since UploadButton calls router.refresh(), it might not be enough for this client state.
                        Ideally, we would refactor UploadButton, but for now let's wrap it or assume the user might need to reload if using the main button. 
                        Actually, let's just put a refresh button or rely on the fact that we re-fetch on open. 
                        Better yet, let's assume the user might upload and we see it next time or we provide a reload button.
                    */}
                    <Button variant="outline" size="icon" onClick={fetchMedia} title="Refresh Library">
                        <span className="sr-only">Refresh</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.7759 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.4898 11.9282 12.4793 11.4845 12.1991 11.2092C11.9189 10.934 11.4752 10.9445 11.2 11.2247C10.2635 12.1774 8.97749 12.8 7.49998 12.8C4.30063 12.8 1.84998 10.3297 1.84998 7.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[500px] p-1">
                    {loading ? (
                        <div className="flex items-center justify-center h-40">Loading...</div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                            <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
                            <p>No images found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMedia.map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative aspect-square cursor-pointer rounded-md border bg-muted overflow-hidden hover:ring-2 hover:ring-primary"
                                    onClick={() => handleSelect(item)}
                                >
                                    <Image
                                        src={item.url}
                                        alt={item.alt || "Media"}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-medium">Select</span>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1 text-[10px] text-white truncate px-2">
                                        {item.alt}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
