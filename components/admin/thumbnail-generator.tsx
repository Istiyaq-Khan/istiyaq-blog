"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    exportCanvasToWebPBlob,
    renderThumbnailToCanvas,
    THUMBNAIL_PRESETS,
    ThumbnailPresetId,
} from "@/lib/thumbnail-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Download, RefreshCw, Image as ImageIcon, SlidersHorizontal, X } from "lucide-react";

interface ThumbnailGeneratorProps {
    title: string;
    category?: string;
    readingTime?: number;
    authorName?: string;
    siteDomain?: string;
    avatarSrc?: string;
    onBlobReady?: (blob: Blob) => void;
    onApplyAsCover?: (blob: Blob, dataUrl: string) => void;
    className?: string;
}

export function ThumbnailGenerator({
    title,
    category = "ENGINEERING",
    readingTime = 5,
    authorName = "Istiyaq Khan Razin",
    siteDomain = "blog.istiyaq.com",
    avatarSrc,
    onBlobReady,
    onApplyAsCover,
    className = "",
}: ThumbnailGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [activePreset, setActivePreset] = useState<ThumbnailPresetId>("cyber-obsidian");
    const [isRendering, setIsRendering] = useState(false);
    const [blobSizeKb, setBlobSizeKb] = useState<number | null>(null);
    const [customBgUrl, setCustomBgUrl] = useState<string>("");
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    // Stable references to prevent render cascades and infinite loops
    const onBlobReadyRef = useRef(onBlobReady);
    onBlobReadyRef.current = onBlobReady;

    const onApplyAsCoverRef = useRef(onApplyAsCover);
    onApplyAsCoverRef.current = onApplyAsCover;

    const lastBlobRef = useRef<Blob | null>(null);
    const lastRenderKeyRef = useRef<string>("");
    const isRenderingRef = useRef(false);

    const performRender = useCallback(async (force = false) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const currentKey = `${title}|${category}|${activePreset}|${readingTime}|${authorName}|${customBgUrl.trim()}`;
        if (!force && lastRenderKeyRef.current === currentKey) {
            return; // Skip duplicate renders
        }

        if (isRenderingRef.current) return;
        isRenderingRef.current = true;
        setIsRendering(true);

        try {
            await renderThumbnailToCanvas(canvas, {
                title: title || "Untitled Post",
                category: category || "ENGINEERING",
                presetId: activePreset,
                authorName,
                siteDomain,
                readingTime,
                avatarSrc,
                customBgUrl: customBgUrl.trim() || undefined,
            });

            lastRenderKeyRef.current = currentKey;

            // Export WebP blob safely
            const blob = await exportCanvasToWebPBlob(canvas, 0.85);
            lastBlobRef.current = blob;
            setBlobSizeKb(Math.round((blob.size / 1024) * 10) / 10);

            if (onBlobReadyRef.current) {
                onBlobReadyRef.current(blob);
            }
        } catch (error) {
            console.error("Failed to render thumbnail canvas:", error);
        } finally {
            isRenderingRef.current = false;
            setIsRendering(false);
        }
    }, [title, category, activePreset, authorName, siteDomain, readingTime, avatarSrc, customBgUrl]);

    // Debounced render on user input change
    useEffect(() => {
        const timer = setTimeout(() => {
            performRender();
        }, 200);

        return () => clearTimeout(timer);
    }, [performRender]);

    // Cycle / shuffle presets
    const handleShufflePreset = () => {
        const presets: ThumbnailPresetId[] = ["cyber-obsidian", "solar-amber", "electric-violet", "matrix-emerald"];
        const currentIndex = presets.indexOf(activePreset);
        const nextIndex = (currentIndex + 1) % presets.length;
        setActivePreset(presets[nextIndex]);
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.download = `${(title || "post").toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40)}-thumbnail.webp`;
        link.href = canvasRef.current.toDataURL("image/webp", 0.85);
        link.click();
    };

    const handleApplyCover = () => {
        if (lastBlobRef.current && canvasRef.current && onApplyAsCoverRef.current) {
            const dataUrl = canvasRef.current.toDataURL("image/webp", 0.85);
            onApplyAsCoverRef.current(lastBlobRef.current, dataUrl);
        }
    };

    return (
        <div className={`space-y-4 rounded-xl border border-border bg-surface/60 p-4 ${className}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-heading text-sm font-semibold text-foreground">
                        High-CTR Canvas Social Card
                    </span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary border border-primary/20">
                        1200×630 WebP
                    </span>
                </div>

                {blobSizeKb !== null && (
                    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <span className={`inline-block h-2 w-2 rounded-full ${blobSizeKb < 90 ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <span>{blobSizeKb} KB</span>
                    </div>
                )}
            </div>

            {/* Scaled Responsive Canvas Container */}
            <div className="relative aspect-[1200/630] w-full max-w-[640px] mx-auto overflow-hidden rounded-lg border border-border/80 bg-black/40 shadow-xl ring-1 ring-white/5">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="h-full w-full object-contain"
                />

                {isRendering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-opacity">
                        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                    </div>
                )}
            </div>

            {/* Preset Selector & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                    {(Object.keys(THUMBNAIL_PRESETS) as ThumbnailPresetId[]).map((presetKey) => {
                        const preset = THUMBNAIL_PRESETS[presetKey];
                        const isActive = activePreset === presetKey;
                        return (
                            <button
                                key={presetKey}
                                type="button"
                                onClick={() => setActivePreset(presetKey)}
                                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/50"
                                        : "bg-surface-elevated text-muted-foreground hover:bg-surface-border hover:text-foreground"
                                }`}
                            >
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: preset.accentRim }}
                                />
                                {preset.name.split(" ")[0]}
                            </button>
                        );
                    })}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                        onClick={handleShufflePreset}
                        title="Shuffle color harmony preset"
                    >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Shuffle
                    </Button>
                </div>

                <div className="flex items-center gap-1.5">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`h-7 px-2 text-xs ${showAdvanced ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        title="Custom AI background settings"
                    >
                        <SlidersHorizontal className="h-3 w-3 mr-1" />
                        Custom BG
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs border-border/80"
                        onClick={handleDownload}
                        title="Download WebP thumbnail to disk"
                    >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                    </Button>

                    {onApplyAsCover && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 px-2.5 text-xs font-medium bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
                            onClick={handleApplyCover}
                            title="Set as post cover image"
                        >
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Use as Cover
                        </Button>
                    )}
                </div>
            </div>

            {/* Custom AI Background Settings */}
            {showAdvanced && (
                <div className="rounded-lg border border-border/60 bg-surface-elevated/80 p-3 space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                            <ImageIcon className="h-3.5 w-3.5 text-primary" />
                            Custom AI Background (Gemini Imagen 3 / URL)
                        </span>
                        {customBgUrl && (
                            <button
                                type="button"
                                onClick={() => setCustomBgUrl("")}
                                className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                            >
                                <X className="h-3 w-3" />
                                Reset to Silhouette
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. /uploads/my-ai-portrait-bg.webp or https://..."
                            value={customBgUrl}
                            onChange={(e) => setCustomBgUrl(e.target.value)}
                            className="h-8 text-xs bg-background"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs px-3"
                            onClick={() => performRender(true)}
                        >
                            Apply
                        </Button>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                        Tip: Generate your custom portrait background using prompts in the <span className="font-mono text-primary">prompt/</span> folder, then paste the image URL here for a 100% personalized high-CTR social card.
                    </p>
                </div>
            )}
        </div>
    );
}
