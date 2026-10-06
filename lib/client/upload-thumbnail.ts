/**
 * Client helper to upload an in-memory WebP thumbnail blob to the secure backend endpoint.
 */

export interface ThumbnailUploadResult {
    success: boolean;
    url?: string;
    filename?: string;
    size?: number;
    error?: string;
}

export async function uploadThumbnailBlob(
    blob: Blob,
    slug: string
): Promise<ThumbnailUploadResult> {
    try {
        const formData = new FormData();
        const safeSlug = slug || "post";
        formData.append("thumbnail", blob, `${safeSlug}.webp`);
        formData.append("slug", safeSlug);

        const response = await fetch("/api/upload/thumbnail", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || `Upload failed with HTTP status ${response.status}`,
            };
        }

        return {
            success: true,
            url: data.url,
            filename: data.filename,
            size: data.size,
        };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Network error while uploading thumbnail";
        return {
            success: false,
            error: message,
        };
    }
}
