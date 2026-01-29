import { getMediaLibrary } from "@/lib/actions/blog";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import { UploadButton } from "./upload-button";

export default async function MediaPage() {
    const images = await getMediaLibrary();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-3xl font-bold">Media Library</h1>
                <UploadButton />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.length === 0 ? (
                    <div className="col-span-full h-40 flex items-center justify-center border border-dashed rounded-lg text-muted-foreground">
                        No images found in your blog posts.
                    </div>
                ) : (
                    images.map((img, i) => (
                        <Card key={i} className="overflow-hidden group">
                            <div className="aspect-square relative bg-muted">
                                <Image
                                    src={img.url}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-xs text-white truncate">{img.source}</p>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
