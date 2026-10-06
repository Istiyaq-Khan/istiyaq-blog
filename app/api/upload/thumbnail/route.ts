import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Media from "@/models/Media";
import {
    generateSafeThumbnailFilename,
    MAX_THUMBNAIL_SIZE_BYTES,
    sanitizeSlug,
    validateWebPMagicBytes,
} from "@/lib/thumbnail-security";

// Rule 4: Node.js runtime enforcement for local filesystem and MongoDB
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        // 1. Authentication Enforcement (NextAuth v5 session check)
        const session = await auth();
        if (!session?.user || (session.user as any).role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized: Admin privileges required." },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        // Support either 'thumbnail' or 'file' key
        const file = (formData.get("thumbnail") || formData.get("file")) as File | null;
        const rawSlug = formData.get("slug") as string | null;

        if (!file) {
            return NextResponse.json(
                { error: "No thumbnail file received." },
                { status: 400 }
            );
        }

        // 2. Strict Payload Size Limit (500KB)
        const buffer = Buffer.from(await file.arrayBuffer());
        if (buffer.length > MAX_THUMBNAIL_SIZE_BYTES) {
            return NextResponse.json(
                {
                    error: `Payload too large. Maximum allowed size is ${MAX_THUMBNAIL_SIZE_BYTES / 1024}KB, received ${(buffer.length / 1024).toFixed(1)}KB.`,
                },
                { status: 413 }
            );
        }

        // 3. Binary Magic Bytes Validation (No Fake MIMEs)
        if (!validateWebPMagicBytes(buffer)) {
            return NextResponse.json(
                {
                    error: "Invalid file format: File failed binary magic bytes inspection (must be a valid WebP image with RIFF/WEBP header).",
                },
                { status: 400 }
            );
        }

        // 4. Path Traversal Defense & Slug Sanitization
        let cleanSlug = "post";
        try {
            cleanSlug = sanitizeSlug(rawSlug || "post");
        } catch (err: any) {
            return NextResponse.json(
                { error: `Slug validation failed: ${err.message}` },
                { status: 400 }
            );
        }

        const safeFilename = generateSafeThumbnailFilename(cleanSlug);

        // Double check against any lingering path traversal delimiters
        if (safeFilename.includes("/") || safeFilename.includes("\\") || safeFilename.includes("..")) {
            return NextResponse.json(
                { error: "Illegal path delimiters detected in generated filename." },
                { status: 400 }
            );
        }

        // 5. Storage Destination: public/uploads/thumbnails/${safeFilename}
        const uploadDir = path.join(process.cwd(), "public", "uploads", "thumbnails");
        await mkdir(uploadDir, { recursive: true });

        const targetFilepath = path.join(uploadDir, safeFilename);
        await writeFile(targetFilepath, buffer);

        const publicUrl = `/uploads/thumbnails/${safeFilename}`;

        // 6. Record in Media database
        try {
            await connectDB();
            await Media.create({
                filename: safeFilename,
                url: publicUrl,
                alt: `${cleanSlug} Social Card Thumbnail`,
                mimeType: "image/webp",
                size: buffer.length,
            });
        } catch (dbError) {
            // Non-fatal if media indexing fails, file is still securely stored on disk
            console.warn("Could not index thumbnail in Media database:", dbError);
        }

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename: safeFilename,
            size: buffer.length,
        });
    } catch (error: any) {
        console.error("Thumbnail upload failed:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error during thumbnail upload." },
            { status: 500 }
        );
    }
}
