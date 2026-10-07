import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
    validateWebPMagicBytes,
    sanitizeSlug,
    generateSafeThumbnailFilename,
    MAX_THUMBNAIL_SIZE_BYTES,
} from "../lib/thumbnail-security.ts";
import {
    wrapAndClampText,
    THUMBNAIL_PRESETS,
    AI_BACKGROUND_OPTIONS,
} from "../lib/thumbnail-canvas.ts";

describe("Thumbnail Security & Upload Validation Suite", () => {
    describe("1. Binary Magic Bytes Verification (Anti-MIME Spoofing)", () => {
        test("accepts genuine WebP buffer with RIFF...WEBP signature", () => {
            const validWebPHeader = Buffer.from([
                0x52, 0x49, 0x46, 0x46,
                0x28, 0x00, 0x00, 0x00,
                0x57, 0x45, 0x42, 0x50,
                0x56, 0x50, 0x38, 0x20,
            ]);

            assert.equal(validateWebPMagicBytes(validWebPHeader), true);
        });

        test("rejects spoofed text file renamed to .webp", () => {
            const fakePayload = Buffer.from("<?php echo 'malicious payload'; ?>", "utf-8");
            assert.equal(validateWebPMagicBytes(fakePayload), false);
        });

        test("rejects PNG disguised as WebP", () => {
            const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d]);
            assert.equal(validateWebPMagicBytes(pngHeader), false);
        });

        test("rejects JPEG disguised as WebP", () => {
            const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
            assert.equal(validateWebPMagicBytes(jpegHeader), false);
        });

        test("rejects RIFF container that is not WebP (e.g. WAV or AVI audio/video)", () => {
            const riffWavHeader = Buffer.from([
                0x52, 0x49, 0x46, 0x46,
                0x24, 0x00, 0x00, 0x00,
                0x57, 0x41, 0x56, 0x45,
            ]);
            assert.equal(validateWebPMagicBytes(riffWavHeader), false);
        });

        test("rejects truncated buffer (< 12 bytes)", () => {
            const shortBuffer = Buffer.from([0x52, 0x49, 0x46, 0x46, 0x00]);
            assert.equal(validateWebPMagicBytes(shortBuffer), false);
            assert.equal(validateWebPMagicBytes(Buffer.alloc(0)), false);
        });

        test("validates existing author portrait in public directory has valid WebP magic bytes", () => {
            const avatarPath = path.join(process.cwd(), "public", "istiyaq-khan-razin-founder-ikk-studio.webp");
            if (fs.existsSync(avatarPath)) {
                const buffer = fs.readFileSync(avatarPath);
                assert.equal(validateWebPMagicBytes(buffer), true, "Author avatar must be a valid WebP");
            }
        });
    });

    describe("2. Path Traversal Defense & Slug Hardening", () => {
        test("sanitizes relative path traversal attacks (../ and ..\\)", () => {
            const maliciousSlug = "../../../etc/passwd";
            const sanitized = sanitizeSlug(maliciousSlug);
            assert.equal(sanitized.includes("/"), false);
            assert.equal(sanitized.includes("\\"), false);
            assert.equal(sanitized.includes(".."), false);
            assert.equal(sanitized, "etc-passwd");
        });

        test("sanitizes Windows backslash traversal (..\\..\\windows\\system32)", () => {
            const maliciousSlug = "..\\..\\windows\\system32\\cmd";
            const sanitized = sanitizeSlug(maliciousSlug);
            assert.equal(sanitized.includes("/"), false);
            assert.equal(sanitized.includes("\\"), false);
            assert.equal(sanitized.includes(".."), false);
            assert.equal(sanitized, "windows-system32-cmd");
        });

        test("strips illicit characters and normalizes multiple dashes", () => {
            const messySlug = "  Hello World! @#$%^&*()_+~` {}[]|:;<>?  ";
            const sanitized = sanitizeSlug(messySlug);
            assert.equal(sanitized, "hello-world");
        });

        test("enforces length limit (max 80 chars)", () => {
            const veryLongSlug = "a".repeat(150);
            const sanitized = sanitizeSlug(veryLongSlug);
            assert.equal(sanitized.length <= 80, true);
        });

        test("throws error when slug has no valid alphanumeric characters", () => {
            assert.throws(() => sanitizeSlug("   ///\\\\...   "), {
                message: /Invalid slug/,
            });
            assert.throws(() => sanitizeSlug(""), {
                message: /Slug must be a non-empty string/,
            });
        });

        test("generateSafeThumbnailFilename guarantees file stays within directory", () => {
            const uploadDir = path.join(process.cwd(), "public", "uploads", "thumbnails");
            const safeFilename = generateSafeThumbnailFilename("../../../malicious-post");

            const resolvedPath = path.resolve(uploadDir, safeFilename);
            const relative = path.relative(uploadDir, resolvedPath);

            assert.equal(relative.startsWith(".."), false, "Path must not escape uploads directory");
            assert.equal(safeFilename.endsWith(".webp"), true);
            assert.equal(safeFilename.includes("/"), false);
            assert.equal(safeFilename.includes("\\"), false);
        });
    });

    describe("3. Strict Payload Limits", () => {
        test("enforces 500KB upload limit constant", () => {
            assert.equal(MAX_THUMBNAIL_SIZE_BYTES, 500 * 1024);
            const overSizedBuffer = Buffer.alloc(501 * 1024);
            assert.equal(overSizedBuffer.length > MAX_THUMBNAIL_SIZE_BYTES, true);
        });
    });
});

describe("Canvas Text Wrapping & Clamping Engine", () => {
    const mockCtx = {
        measureText(text: string) {
            return { width: text.length * 28 } as TextMetrics;
        },
    } as unknown as CanvasRenderingContext2D;

    const MAX_WIDTH = 700;

    test("short title (3 words) fits comfortably on 1 line without ellipses", () => {
        const shortTitle = "AI Agent Architecture";
        const lines = wrapAndClampText(mockCtx, shortTitle, MAX_WIDTH, 3);

        assert.equal(lines.length, 1);
        assert.equal(lines[0], shortTitle);
        assert.equal(lines[0].includes("..."), false);
    });

    test("medium title wraps across 2 lines without truncation", () => {
        const mediumTitle = "Building Production Grade Agentic Systems With Next.js";
        const lines = wrapAndClampText(mockCtx, mediumTitle, MAX_WIDTH, 3);

        assert.equal(lines.length <= 3, true);
        assert.equal(lines.length >= 2, true);
        lines.forEach((line) => {
            assert.equal(mockCtx.measureText(line).width <= MAX_WIDTH, true);
        });
        assert.equal(lines[lines.length - 1].includes("..."), false);
    });

    test("excessively long title (25+ words) clamps strictly to 3 lines with ellipsis", () => {
        const longTitle =
            "Comprehensive Deep Dive Into Client Side High Performance Canvas Thumbnail Generation With Hardened Binary Security Against Path Traversal And MIME Exploits In Nextjs";
        const lines = wrapAndClampText(mockCtx, longTitle, MAX_WIDTH, 3);

        assert.equal(lines.length, 3, "Must clamp to strictly 3 lines");
        assert.equal(lines[2].endsWith("..."), true, "3rd line must end with ellipsis");

        lines.forEach((line, index) => {
            const width = mockCtx.measureText(line).width;
            assert.equal(
                width <= MAX_WIDTH,
                true,
                `Line ${index + 1} (${line}) width ${width} must be <= ${MAX_WIDTH}`
            );
        });
    });

    test("single oversized word force-breaks and clamps within maxWidth", () => {
        const longWord = "SupercalifragilisticexpialidociousUnbelievablyLongMonolithicIdentifier";
        const lines = wrapAndClampText(mockCtx, longWord, MAX_WIDTH, 3);

        assert.equal(lines.length <= 3, true);
        lines.forEach((line) => {
            assert.equal(mockCtx.measureText(line).width <= MAX_WIDTH, true);
        });
    });
});

describe("AI Portrait Backgrounds & Preset Asset Integrity", () => {
    test("every thumbnail preset defines a defaultBgUrl pointing to an existing file in public/", () => {
        for (const [presetId, preset] of Object.entries(THUMBNAIL_PRESETS)) {
            assert.ok(preset.defaultBgUrl, `Preset ${presetId} must have defaultBgUrl`);
            const assetRelative = preset.defaultBgUrl.replace(/^\//, "");
            const absolutePath = path.join(process.cwd(), "public", assetRelative.replace(/^assets\//, "assets/"));
            assert.equal(
                fs.existsSync(absolutePath),
                true,
                `Asset for preset ${presetId} must exist at ${absolutePath}`
            );
            const stats = fs.statSync(absolutePath);
            assert.ok(stats.size > 10000, `Asset file ${absolutePath} must be non-empty image (> 10KB)`);
        }
    });

    test("AI_BACKGROUND_OPTIONS contains 5 preloaded assets that all exist on disk", () => {
        assert.equal(AI_BACKGROUND_OPTIONS.length, 5, "Must contain exactly 5 preloaded AI backgrounds");
        for (const opt of AI_BACKGROUND_OPTIONS) {
            const assetRelative = opt.url.replace(/^\//, "");
            const absolutePath = path.join(process.cwd(), "public", assetRelative);
            assert.equal(
                fs.existsSync(absolutePath),
                true,
                `AI Background option ${opt.name} (${opt.url}) must exist at ${absolutePath}`
            );
            const stats = fs.statSync(absolutePath);
            assert.ok(stats.size > 10000, `AI Background file ${absolutePath} must be > 10KB`);
        }
    });
});

