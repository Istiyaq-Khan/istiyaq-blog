/**
 * Security and binary validation utilities for thumbnail uploads.
 * Protects against path traversal, MIME spoofing, fake headers, and DoS payloads.
 */

export const MAX_THUMBNAIL_SIZE_BYTES = 500 * 1024; // 500 KB limit

/**
 * Validates that raw binary buffer begins with legitimate WebP magic bytes.
 * WebP uses the RIFF container format:
 * - Bytes 0..3: ASCII 'RIFF' (0x52, 0x49, 0x46, 0x46)
 * - Bytes 4..7: File size (little-endian uint32)
 * - Bytes 8..11: ASCII 'WEBP' (0x57, 0x45, 0x42, 0x50)
 */
export function validateWebPMagicBytes(buffer: Uint8Array | Buffer): boolean {
    if (!buffer || buffer.length < 12) {
        return false;
    }

    // Bytes 0-3: 'RIFF'
    const isRiff =
        buffer[0] === 0x52 && // 'R'
        buffer[1] === 0x49 && // 'I'
        buffer[2] === 0x46 && // 'F'
        buffer[3] === 0x46;   // 'F'

    // Bytes 8-11: 'WEBP'
    const isWebp =
        buffer[8] === 0x57 &&  // 'W'
        buffer[9] === 0x45 &&  // 'E'
        buffer[10] === 0x42 && // 'B'
        buffer[11] === 0x50;   // 'P'

    return isRiff && isWebp;
}

/**
 * Hardens and sanitizes incoming post slugs against path traversal (../, ..\, /)
 * and illicit characters. Uses strict lowercase alphanumeric and hyphen whitelist.
 */
export function sanitizeSlug(slug: string | null | undefined): string {
    if (!slug || typeof slug !== "string") {
        throw new Error("Slug must be a non-empty string");
    }

    // Strip any path traversal characters, normalize whitespace, and enforce whitelist
    const sanitized = slug
        .toLowerCase()
        .replace(/(\.\.[\/\\])+/g, "")
        .replace(/[\/\\]/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);

    if (!sanitized) {
        throw new Error("Invalid slug: must contain at least one valid alphanumeric character");
    }

    return sanitized;
}

/**
 * Creates an immutable, collision-resistant, safe filename strictly located within
 * the thumbnail directory.
 */
export function generateSafeThumbnailFilename(slug: string): string {
    const cleanSlug = sanitizeSlug(slug);
    const timestamp = Date.now();
    return `${cleanSlug}-${timestamp}.webp`;
}
