/**
 * High-CTR Canvas 2D Thumbnail Generation Engine
 * Conforms to the 2-focal-point rule (author portrait at left 32%, content card at right 68%).
 * Self-contained, zero-server-compute, font-race-hardened, CORS-safe.
 */

export type ThumbnailPresetId = "cyber-obsidian" | "solar-amber" | "electric-violet" | "matrix-emerald";

export interface ThumbnailPreset {
    id: ThumbnailPresetId;
    name: string;
    background: string;
    surfaceCard: string;
    text: string;
    accentRim: string;
    mutedText: string;
    badgeBg: string;
    badgeBorder: string;
    glowColor: string;
    defaultBgUrl: string;
}

export const THUMBNAIL_PRESETS: Record<ThumbnailPresetId, ThumbnailPreset> = {
    "cyber-obsidian": {
        id: "cyber-obsidian",
        name: "Cyber Obsidian",
        background: "#090d16",
        surfaceCard: "#111726",
        text: "#ffffff",
        accentRim: "#00f0ff",
        mutedText: "#94a3b8",
        badgeBg: "rgba(0, 240, 255, 0.12)",
        badgeBorder: "#00f0ff",
        glowColor: "rgba(0, 240, 255, 0.35)",
        defaultBgUrl: "/assets/01_cyber_obsidian_tech_architect.jpg",
    },
    "solar-amber": {
        id: "solar-amber",
        name: "Solar Amber",
        background: "#120c06",
        surfaceCard: "#1c130a",
        text: "#ffffff",
        accentRim: "#f59e0b",
        mutedText: "#a8a29e",
        badgeBg: "rgba(245, 158, 11, 0.12)",
        badgeBorder: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.35)",
        defaultBgUrl: "/assets/02_solar_amber_authority_builder.jpg",
    },
    "electric-violet": {
        id: "electric-violet",
        name: "Electric Violet",
        background: "#0f0a1c",
        surfaceCard: "#17102b",
        text: "#ffffff",
        accentRim: "#a855f7",
        mutedText: "#94a3b8",
        badgeBg: "rgba(168, 85, 247, 0.15)",
        badgeBorder: "#a855f7",
        glowColor: "rgba(168, 85, 247, 0.35)",
        defaultBgUrl: "/assets/03_electric_violet_ai_studio.jpg",
    },
    "matrix-emerald": {
        id: "matrix-emerald",
        name: "Matrix Emerald",
        background: "#050e09",
        surfaceCard: "#0b1c13",
        text: "#ffffff",
        accentRim: "#10b981",
        mutedText: "#94a3b8",
        badgeBg: "rgba(16, 185, 129, 0.15)",
        badgeBorder: "#10b981",
        glowColor: "rgba(16, 185, 129, 0.35)",
        defaultBgUrl: "/assets/04_matrix_emerald_systems_engineer.jpg",
    },
};

export interface AIBackgroundOption {
    id: string;
    name: string;
    shortLabel: string;
    description: string;
    url: string;
    presetId: ThumbnailPresetId;
}

export const AI_BACKGROUND_OPTIONS: AIBackgroundOption[] = [
    {
        id: "cyber-obsidian",
        name: "Cyber Architect",
        shortLabel: "Cyber",
        description: "Electric Cyan rim light & dark tech void",
        url: "/assets/01_cyber_obsidian_tech_architect.jpg",
        presetId: "cyber-obsidian",
    },
    {
        id: "solar-amber",
        name: "Solar Authority",
        shortLabel: "Solar",
        description: "Solar amber rim light & executive charcoal",
        url: "/assets/02_solar_amber_authority_builder.jpg",
        presetId: "solar-amber",
    },
    {
        id: "electric-violet",
        name: "AI Studio",
        shortLabel: "Violet",
        description: "Electric violet & acid lime creative tech",
        url: "/assets/03_electric_violet_ai_studio.jpg",
        presetId: "electric-violet",
    },
    {
        id: "matrix-emerald",
        name: "Systems Engineer",
        shortLabel: "Matrix",
        description: "Matrix emerald / cyber lime & deep carbon",
        url: "/assets/04_matrix_emerald_systems_engineer.jpg",
        presetId: "matrix-emerald",
    },
    {
        id: "wide-split",
        name: "Wide 16:9 Split",
        shortLabel: "Wide 16:9",
        description: "Cinematic portrait left & negative space right",
        url: "/assets/05_wide_split_composition.jpg",
        presetId: "cyber-obsidian",
    },
];

export interface ThumbnailOptions {
    title: string;
    category?: string;
    presetId?: ThumbnailPresetId;
    authorName?: string;
    siteDomain?: string;
    readingTime?: number;
    avatarSrc?: string;
    customBgUrl?: string;
}

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 630;

/**
 * Assures that essential web fonts are loaded prior to rendering to prevent
 * system font fallback or text measurement shifts on canvas.
 */
export async function ensureFontsLoaded(timeoutMs = 1200): Promise<void> {
    if (typeof document === "undefined" || !document.fonts) return;

    try {
        const fontReadyPromise = document.fonts.ready;
        const fontLoadPromises = [
            document.fonts.load("bold 56px Inter"),
            document.fonts.load("bold 18px JetBrains Mono"),
        ];

        const raceTimeout = new Promise<void>((resolve) => setTimeout(resolve, timeoutMs));
        await Promise.race([
            Promise.all([fontReadyPromise, ...fontLoadPromises]),
            raceTimeout,
        ]);
    } catch {
        // Fallback gracefully to available fonts without halting rendering
    }
}

/**
 * Word-wraps and strictly clamps text to `maxLines`, appending ellipsis (...) on the final line
 * if text overflows. Guaranteed to never overflow `maxWidth` or `maxLines`.
 */
export function wrapAndClampText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines = 3
): string[] {
    const cleanText = text.trim().replace(/\s+/g, " ");
    if (!cleanText) return ["Untitled Post"];

    const words = cleanText.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine ? `${currentLine} ${word}` : word;

        if (ctx.measureText(testLine).width <= maxWidth) {
            currentLine = testLine;
        } else {
            // Need a new line
            if (lines.length < maxLines - 1) {
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = "";
                    i--; // re-evaluate this word on fresh line
                } else {
                    // Current line is empty, so word itself is wider than maxWidth!
                    const { broken, remainder } = breakOversizedWord(ctx, word, maxWidth);
                    lines.push(broken);
                    words[i] = remainder;
                    i--; // process remainder on next line
                }
            } else {
                // We are on the final clamped line
                const remainingWords = words.slice(i).join(" ");
                const candidate = currentLine ? `${currentLine} ${remainingWords}` : remainingWords;
                lines.push(truncateWithEllipsis(ctx, candidate, maxWidth));
                currentLine = "";
                break;
            }
        }
    }

    if (currentLine && lines.length < maxLines) {
        lines.push(truncateWithEllipsis(ctx, currentLine, maxWidth));
    }

    // Safety guarantee: ensure all lines strictly fit within maxWidth
    return lines.map((line) => {
        if (ctx.measureText(line).width > maxWidth) {
            return truncateWithEllipsis(ctx, line, maxWidth);
        }
        return line;
    });
}

function breakOversizedWord(
    ctx: CanvasRenderingContext2D,
    word: string,
    maxWidth: number
): { broken: string; remainder: string } {
    let fitted = "";
    for (let j = 0; j < word.length; j++) {
        const test = fitted + word[j];
        if (ctx.measureText(test).width <= maxWidth) {
            fitted = test;
        } else {
            return { broken: fitted, remainder: word.slice(j) };
        }
    }
    return { broken: word, remainder: "" };
}

function truncateWithEllipsis(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
): string {
    const ellipsis = "...";
    if (ctx.measureText(text).width <= maxWidth) {
        return text;
    }

    let low = 0;
    let high = text.length;
    let best = ellipsis;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const candidate = text.slice(0, mid).trimEnd() + ellipsis;
        if (ctx.measureText(candidate).width <= maxWidth) {
            best = candidate;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return best;
}

/**
 * Loads an image safely with anonymous CORS and timeout to prevent tainted canvas.
 */
function loadImageSafe(src: string, timeoutMs = 2500): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        const timer = setTimeout(() => {
            img.onload = null;
            img.onerror = null;
            reject(new Error("Image load timed out"));
        }, timeoutMs);

        img.onload = () => {
            clearTimeout(timer);
            resolve(img);
        };

        img.onerror = (err) => {
            clearTimeout(timer);
            reject(err);
        };

        img.src = src;
    });
}

/**
 * Draws an image with object-fit: cover scaling onto a target rectangle.
 * Prevents stretching or squishing when source image aspect ratio differs from 1200x630.
 */
function drawImageCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
): void {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = w / h;
    let sWidth = img.naturalWidth;
    let sHeight = img.naturalHeight;
    let sx = 0;
    let sy = 0;

    if (imgRatio > targetRatio) {
        // Source is wider: crop horizontal sides
        sWidth = img.naturalHeight * targetRatio;
        sx = (img.naturalWidth - sWidth) / 2;
    } else {
        // Source is taller: crop vertical top/bottom
        sHeight = img.naturalWidth / targetRatio;
        sy = (img.naturalHeight - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

/**
 * Renders the author portrait silhouette or stylish geometric fallback badge.
 */
async function drawAuthorSilhouette(
    ctx: CanvasRenderingContext2D,
    preset: ThumbnailPreset,
    avatarSrc?: string
): Promise<void> {
    const centerX = 220;
    const eyeLevelY = 210; // Rule-of-Thirds horizontal alignment

    // 1. Ambient Rim-Light / Glow behind silhouette (Focal Point 1)
    const glow = ctx.createRadialGradient(centerX, eyeLevelY + 40, 40, centerX, eyeLevelY + 40, 260);
    glow.addColorStop(0, preset.glowColor);
    glow.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.save();
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(centerX, eyeLevelY + 40, 260, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Attempt to draw image
    let imageLoaded = false;
    const candidateUrls = [
        avatarSrc,
        "/istiyaq-khan-razin-founder-ikk-studio.webp",
        "/assets/author-avatar.webp",
        "/assets/author-avatar.png",
    ].filter(Boolean) as string[];

    for (const url of candidateUrls) {
        try {
            const img = await loadImageSafe(url);
            imageLoaded = true;

            // Target aspect ratio fitting: width approx 440px, anchored at bottom left
            const targetHeight = 580;
            const aspect = img.naturalWidth / img.naturalHeight;
            const targetWidth = targetHeight * aspect;

            const drawX = Math.max(-20, centerX - targetWidth / 2);
            const drawY = CANVAS_HEIGHT - targetHeight;

            ctx.save();
            // Draw image
            ctx.drawImage(img, drawX, drawY, targetWidth, targetHeight);

            // Subtle vertical bottom feather to blend smoothly into the card surface
            const bottomFade = ctx.createLinearGradient(0, CANVAS_HEIGHT - 120, 0, CANVAS_HEIGHT);
            bottomFade.addColorStop(0, "rgba(0, 0, 0, 0)");
            bottomFade.addColorStop(0.7, preset.background + "99");
            bottomFade.addColorStop(1, preset.background);

            ctx.fillStyle = bottomFade;
            ctx.fillRect(0, CANVAS_HEIGHT - 120, 440, 120);

            ctx.restore();
            break;
        } catch {
            // Try next candidate
        }
    }

    // 3. Fallback: Styled Monogram Badge if image fails
    if (!imageLoaded) {
        drawFallbackMonogram(ctx, preset, centerX, eyeLevelY + 40);
    }
}

/**
 * Fallback geometric monogram badge when author image fails to load.
 */
function drawFallbackMonogram(
    ctx: CanvasRenderingContext2D,
    preset: ThumbnailPreset,
    cx: number,
    cy: number
): void {
    ctx.save();
    const radius = 96;

    // Outer glowing rim
    ctx.shadowColor = preset.accentRim;
    ctx.shadowBlur = 24;
    ctx.strokeStyle = preset.accentRim;
    ctx.lineWidth = 3;
    ctx.fillStyle = preset.surfaceCard;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Inner subtle ring
    ctx.strokeStyle = preset.accentRim + "44";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 12, 0, Math.PI * 2);
    ctx.stroke();

    // Monogram initials
    ctx.fillStyle = preset.text;
    ctx.font = "bold 60px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("IK", cx, cy - 8);

    // Monogram brand subtitle
    ctx.fillStyle = preset.accentRim;
    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.letterSpacing = "2px";
    ctx.fillText("IKK STUDIO", cx, cy + 38);

    ctx.restore();
}

/**
 * Main rendering routine: Draws a complete, deterministic, high-contrast 1200x630 social card.
 */
export async function renderThumbnailToCanvas(
    canvas: HTMLCanvasElement,
    options: ThumbnailOptions
): Promise<void> {
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) throw new Error("Could not acquire 2D canvas context");

    const preset = THUMBNAIL_PRESETS[options.presetId || "cyber-obsidian"] || THUMBNAIL_PRESETS["cyber-obsidian"];
    const title = options.title?.trim() || "Untitled Post";
    const category = (options.category?.trim() || "ENGINEERING").toUpperCase();
    const author = options.authorName?.trim() || "Istiyaq Khan Razin";
    const domain = options.siteDomain?.trim() || "blog.istiyaq.com";
    const readingTime = options.readingTime ? `${options.readingTime} MIN READ` : "5 MIN READ";

    // Ensure dimensions
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // 0. Await web fonts
    await ensureFontsLoaded();

    // 1. Render Background: Custom AI Generated BG OR Preset Default AI BG OR Procedural Studio Silhouette
    const effectiveBgUrl =
        options.customBgUrl === "none" || options.customBgUrl === "silhouette"
            ? null
            : (options.customBgUrl || preset.defaultBgUrl);

    let customBgLoaded = false;
    if (effectiveBgUrl) {
        try {
            const bgImg = await loadImageSafe(effectiveBgUrl);
            drawImageCover(ctx, bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            customBgLoaded = true;

            // High-CTR split scrim: Keep subject on left vibrant, dark scrim on right for crisp typography
            const scrim = ctx.createLinearGradient(320, 0, CANVAS_WIDTH, 0);
            scrim.addColorStop(0, "rgba(0, 0, 0, 0)");
            scrim.addColorStop(0.25, "rgba(0, 0, 0, 0.45)");
            scrim.addColorStop(0.65, preset.background + "ee");
            scrim.addColorStop(1, preset.background);

            ctx.fillStyle = scrim;
            ctx.fillRect(320, 0, CANVAS_WIDTH - 320, CANVAS_HEIGHT);
        } catch {
            customBgLoaded = false;
        }
    }

    if (!customBgLoaded) {
        // Default Procedural Background Fill with subtle depth gradient
        const bgGradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        bgGradient.addColorStop(0, preset.background);
        bgGradient.addColorStop(0.6, preset.surfaceCard);
        bgGradient.addColorStop(1, preset.background);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Subtle architectural grid / tech dots (IKK Studio engineering vibe)
        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        const dotSpacing = 36;
        for (let x = 400; x < CANVAS_WIDTH - 40; x += dotSpacing) {
            for (let y = 40; y < CANVAS_HEIGHT - 40; y += dotSpacing) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();

        // Focal Point 1 (Left 32%): Author Portrait Silhouette & Glow
        await drawAuthorSilhouette(ctx, preset, options.avatarSrc);
    }

    // 4. Focal Point 2 (Right 68%): Content & Typography Hierarchy
    const contentLeft = 430;
    const contentMaxWidth = 710;

    // A. Category Pill Badge (Top Right)
    ctx.save();
    ctx.font = "bold 18px 'JetBrains Mono', monospace";
    const badgeText = category;
    const badgeMetrics = ctx.measureText(badgeText);
    const badgePaddingX = 18;
    const badgeHeight = 36;
    const badgeWidth = badgeMetrics.width + badgePaddingX * 2;
    const badgeX = contentLeft;
    const badgeY = 90;
    const pillRadius = 8; // Sharp technical pill per IKK Studio design tokens

    // Pill background
    ctx.fillStyle = preset.badgeBg;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, pillRadius);
    ctx.fill();

    // Pill border & glow
    ctx.strokeStyle = preset.badgeBorder;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = preset.accentRim;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Pill text
    ctx.fillStyle = preset.accentRim;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, badgeX + badgePaddingX, badgeY + badgeHeight / 2 + 1);
    ctx.restore();

    // B. Post Title (Middle Right) - 3 lines clamped with ellipsis
    ctx.save();
    const titleFontSize = 58;
    const lineHeight = 68;
    ctx.font = `bold ${titleFontSize}px Inter, system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = preset.text;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    const titleLines = wrapAndClampText(ctx, title, contentMaxWidth, 3);
    const titleStartY = 210;

    titleLines.forEach((line, index) => {
        const y = titleStartY + index * lineHeight;
        ctx.fillText(line, contentLeft, y);
    });
    ctx.restore();

    // C. Subtle accent rule divider
    ctx.save();
    const dividerY = 490;
    ctx.strokeStyle = preset.accentRim + "33";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(contentLeft, dividerY);
    ctx.lineTo(contentLeft + contentMaxWidth, dividerY);
    ctx.stroke();

    // Glowing notch at divider origin
    ctx.fillStyle = preset.accentRim;
    ctx.shadowColor = preset.accentRim;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(contentLeft, dividerY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // D. Footer (Domain watermark, author signature, and reading time)
    ctx.save();
    ctx.font = "500 20px 'JetBrains Mono', monospace";
    ctx.fillStyle = preset.mutedText;
    ctx.textBaseline = "middle";
    const footerY = 538;

    // Left signature: domain • author
    ctx.textAlign = "left";
    ctx.fillText(`${domain}  •  ${author}`, contentLeft, footerY);

    // Right meta: reading time
    ctx.textAlign = "right";
    ctx.fillStyle = preset.accentRim;
    ctx.fillText(readingTime, contentLeft + contentMaxWidth, footerY);
    ctx.restore();

    // 5. Dark Vignette Overlay across all outer edges for pure-white feed contrast
    ctx.save();
    const vignetteThickness = 32;

    // Top vignette
    const topVig = ctx.createLinearGradient(0, 0, 0, vignetteThickness);
    topVig.addColorStop(0, "rgba(0, 0, 0, 0.85)");
    topVig.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = topVig;
    ctx.fillRect(0, 0, CANVAS_WIDTH, vignetteThickness);

    // Bottom vignette
    const btmVig = ctx.createLinearGradient(0, CANVAS_HEIGHT, 0, CANVAS_HEIGHT - vignetteThickness);
    btmVig.addColorStop(0, "rgba(0, 0, 0, 0.85)");
    btmVig.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = btmVig;
    ctx.fillRect(0, CANVAS_HEIGHT - vignetteThickness, CANVAS_WIDTH, vignetteThickness);

    // Left vignette
    const leftVig = ctx.createLinearGradient(0, 0, vignetteThickness, 0);
    leftVig.addColorStop(0, "rgba(0, 0, 0, 0.85)");
    leftVig.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = leftVig;
    ctx.fillRect(0, 0, vignetteThickness, CANVAS_HEIGHT);

    // Right vignette
    const rightVig = ctx.createLinearGradient(CANVAS_WIDTH, 0, CANVAS_WIDTH - vignetteThickness, 0);
    rightVig.addColorStop(0, "rgba(0, 0, 0, 0.85)");
    rightVig.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = rightVig;
    ctx.fillRect(CANVAS_WIDTH - vignetteThickness, 0, vignetteThickness, CANVAS_HEIGHT);

    // 1px crisp outer card stroke
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, CANVAS_WIDTH - 1, CANVAS_HEIGHT - 1);
    ctx.restore();
}

/**
 * Exports canvas buffer to an optimized WebP Blob (< 80KB target).
 */
export async function exportCanvasToWebPBlob(
    canvas: HTMLCanvasElement,
    quality = 0.85
): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Canvas failed to export WebP blob"));
                    return;
                }
                resolve(blob);
            },
            "image/webp",
            quality
        );
    });
}
