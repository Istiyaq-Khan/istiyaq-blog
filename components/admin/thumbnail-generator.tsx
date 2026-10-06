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
import { Sparkles, Download, RefreshCw, Image as ImageIcon } from "lucide-react";

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
    const [lastBlob, setLastBlob] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const renderCanvas = useCallback(async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

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
            });

            // Export WebP blob for size & downstream usage
            const blob = await exportCanvasToWebPBlob(canvas, 0.85);
            setLastBlob(blob);
            setBlobSizeKb(Math.round((blob.size / 1024) * 10) / 10);

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            const newUrl = URL.createObjectURL(blob);
            setPreviewUrl(newUrl);

            if (onBlobReady) {
                onBlobReady(blob);
            }
        } catch (error) {
            console.error("Failed to render thumbnail canvas:", error);
        } finally {
            setIsRendering(false);
        }
    }, [title, category, activePreset, authorName, siteDomain, readingTime, avatarSrc, onBlobReady, previewUrl]);

    // 150ms debounce on input changes
    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            renderCanvas();
        }, 150);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [title, category, activePreset, readingTime, renderCanvas]);

    // Cycle / shuffle presets
    const handleShufflePreset = () => {
        const presets: ThumbnailPresetId[] = ["cyber-obsidian", "solar-amber", "electric-violet"];
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
        if (lastBlob && canvasRef.current && onApplyAsCover) {
            const dataUrl = canvasRef.current.toDataURL("image/webp", 0.85);
            onApplyAsCover(lastBlob, dataUrl);
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-opacity">
                        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                    </div>
                )}
            </div>

            {/* Preset Selector & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
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
        </div>
    );
}
