import { getMediaLibrary } from "@/lib/actions/blog";
import { UploadButton } from "./upload-button";
import { MediaGridItem } from "@/components/admin/media-grid-item";

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
                        <MediaGridItem key={i} image={img} />
                    ))
                )}
            </div>
        </div>
    );
}
