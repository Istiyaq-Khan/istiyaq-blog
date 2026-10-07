"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    exportCanvasToWebPBlob,
    renderThumbnailToCanvas,
    THUMBNAIL_PRESETS,
    ThumbnailPresetId,
    AI_BACKGROUND_OPTIONS,
} from "@/lib/thumbnail-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sparkles,
    Download,
    RefreshCw,
    Image as ImageIcon,
    SlidersHorizontal,
    X,
    Check,
    UserCheck,
    Layers,
} from "lucide-react";

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
    const [selectedBgId, setSelectedBgId] = useState<string>("auto");
    const [customBgInput, setCustomBgInput] = useState<string>("");
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [isRendering, setIsRendering] = useState(false);
    const [blobSizeKb, setBlobSizeKb] = useState<number | null>(null);

    // Resolve the active background URL
    const getResolvedBgUrl = useCallback(() => {
        if (selectedBgId === "auto") {
            return undefined; // Let engine use preset.defaultBgUrl
        }
        if (selectedBgId === "silhouette") {
            return "silhouette";
        }
        if (selectedBgId === "custom") {
            return customBgInput.trim() || undefined;
        }
        const option = AI_BACKGROUND_OPTIONS.find((opt) => opt.id === selectedBgId);
        return option ? option.url : selectedBgId;
    }, [selectedBgId, customBgInput]);

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

        const effectiveBg = getResolvedBgUrl() || "auto";
        const currentKey = `${title}|${category}|${activePreset}|${readingTime}|${authorName}|${effectiveBg}`;
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
                customBgUrl: getResolvedBgUrl(),
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
    }, [title, category, activePreset, authorName, siteDomain, readingTime, avatarSrc, getResolvedBgUrl]);

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

            {/* AI Background Gallery */}
            <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-primary" />
                        AI Portrait Backgrounds (5 Preloaded)
                    </span>
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                        <SlidersHorizontal className="h-3 w-3" />
                        {showAdvanced ? "Hide Custom URL" : "Custom URL"}
                    </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-7 gap-1.5">
                    {/* Auto Match Button */}
                    <button
                        type="button"
                        onClick={() => setSelectedBgId("auto")}
                        className={`group relative flex flex-col items-center justify-center rounded-lg border p-1 text-center transition-all ${
                            selectedBgId === "auto"
                                ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                                : "border-border/60 bg-surface-elevated/70 hover:border-border hover:bg-surface-elevated"
                        }`}
                        title="Auto-synchronize background with selected color preset"
                    >
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-black/40 flex items-center justify-center border border-white/5">
                            <Sparkles className={`h-4 w-4 ${selectedBgId === "auto" ? "text-primary" : "text-muted-foreground"}`} />
                            {selectedBgId === "auto" && (
                                <div className="absolute top-0.5 right-0.5 rounded-full bg-primary p-0.5 text-primary-foreground shadow">
                                    <Check className="h-2 w-2" />
                                </div>
                            )}
                        </div>
                        <span className="mt-1 text-[10px] font-medium leading-tight truncate w-full text-foreground">
                            Auto
                        </span>
                        <span className="text-[9px] text-muted-foreground truncate w-full">
                            Synced
                        </span>
                    </button>

                    {/* 5 Preloaded AI Backgrounds */}
                    {AI_BACKGROUND_OPTIONS.map((opt) => {
                        const isSelected = selectedBgId === opt.id;
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                    setSelectedBgId(opt.id);
                                    if (opt.presetId && activePreset !== opt.presetId) {
                                        setActivePreset(opt.presetId);
                                    }
                                }}
                                className={`group relative flex flex-col items-center rounded-lg border p-1 text-center transition-all ${
                                    isSelected
                                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                                        : "border-border/60 bg-surface-elevated/70 hover:border-border hover:bg-surface-elevated"
                                }`}
                                title={opt.description}
                            >
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-black/40 border border-white/5">
                                    <Image
                                        src={opt.url}
                                        alt={opt.name}
                                        fill
                                        sizes="120px"
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                    {isSelected && (
                                        <div className="absolute top-0.5 right-0.5 rounded-full bg-primary p-0.5 text-primary-foreground shadow">
                                            <Check className="h-2 w-2" />
                                        </div>
                                    )}
                                </div>
                                <span className="mt-1 text-[10px] font-medium leading-tight truncate w-full text-foreground">
                                    {opt.shortLabel}
                                </span>
                                <span className="text-[9px] text-muted-foreground truncate w-full">
                                    {opt.name.split(" ")[0]}
                                </span>
                            </button>
                        );
                    })}

                    {/* Silhouette Minimalist Option */}
                    <button
                        type="button"
                        onClick={() => setSelectedBgId("silhouette")}
                        className={`group relative flex flex-col items-center justify-center rounded-lg border p-1 text-center transition-all ${
                            selectedBgId === "silhouette"
                                ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                                : "border-border/60 bg-surface-elevated/70 hover:border-border hover:bg-surface-elevated"
                        }`}
                        title="Minimalist procedural vector silhouette without photo background"
                    >
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-black/40 flex items-center justify-center border border-white/5">
                            <UserCheck className={`h-4 w-4 ${selectedBgId === "silhouette" ? "text-primary" : "text-muted-foreground"}`} />
                            {selectedBgId === "silhouette" && (
                                <div className="absolute top-0.5 right-0.5 rounded-full bg-primary p-0.5 text-primary-foreground shadow">
                                    <Check className="h-2 w-2" />
                                </div>
                            )}
                        </div>
                        <span className="mt-1 text-[10px] font-medium leading-tight truncate w-full text-foreground">
                            Silhouette
                        </span>
                        <span className="text-[9px] text-muted-foreground truncate w-full">
                            Minimal
                        </span>
                    </button>
                </div>

                {/* Custom URL Drawer */}
                {showAdvanced && (
                    <div className="rounded-lg border border-border/60 bg-surface-elevated/80 p-3 space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                                <ImageIcon className="h-3.5 w-3.5 text-primary" />
                                Custom External Image URL
                            </span>
                            {selectedBgId === "custom" && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBgId("auto");
                                        setCustomBgInput("");
                                    }}
                                    className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                                >
                                    <X className="h-3 w-3" />
                                    Reset to Auto
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g. /uploads/custom-bg.webp or https://..."
                                value={customBgInput}
                                onChange={(e) => {
                                    setCustomBgInput(e.target.value);
                                    if (e.target.value.trim()) {
                                        setSelectedBgId("custom");
                                    }
                                }}
                                className="h-8 text-xs bg-background"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs px-3"
                                onClick={() => {
                                    if (customBgInput.trim()) {
                                        setSelectedBgId("custom");
                                        performRender(true);
                                    }
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
