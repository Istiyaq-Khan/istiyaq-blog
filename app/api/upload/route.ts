import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import connectDB from "@/lib/db";
import Media from "@/models/Media";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Sanitize filename: replace spaces with dashes, remove special chars
        const filename = Date.now() + "-" + file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore error if it exists
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const url = `/uploads/${filename}`;

        // Save to DB
        await connectDB();
        const newMedia = await Media.create({
            filename: file.name,
            url,
            alt: file.name,
            mimeType: file.type,
            size: file.size
        });

        return NextResponse.json({ success: true, url, media: newMedia });
    } catch (error: any) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
