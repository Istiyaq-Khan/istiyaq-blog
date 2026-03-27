"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Image as ImageIcon } from "lucide-react";

interface ImageCompressionModalProps {
    file: File | null;
    isOpen: boolean;
    onClose: () => void;
    onDone: (compressedFile: File) => void;
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function useImagePanZoom() {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const isPanning = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        setZoom((z) => Math.max(0.5, Math.min(5, z + (e.deltaY > 0 ? -0.15 : 0.15))));
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isPanning.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isPanning.current) return;
        setPan((p) => ({
            x: p.x + (e.clientX - lastPos.current.x),
            y: p.y + (e.clientY - lastPos.current.y),
        }));
        lastPos.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseUp = useCallback(() => {
        isPanning.current = false;
    }, []);

    const reset = useCallback(() => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    }, []);

    const zoomIn = useCallback(() => setZoom((z) => Math.min(5, z + 0.25)), []);
    const zoomOut = useCallback(() => setZoom((z) => Math.max(0.5, z - 0.25)), []);

    return { zoom, pan, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, reset, zoomIn, zoomOut };
}

function ImagePreview({
    src,
    label,
    fileSize,
    zoom,
    pan,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
}: {
    src: string;
    label: string;
    fileSize: string;
    zoom: number;
    pan: { x: number; y: number };
    onWheel: (e: React.WheelEvent) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
}) {
    return (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{label}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{fileSize}</span>
            </div>
            <div
                className="relative aspect-square rounded-xl overflow-hidden bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] border border-border cursor-grab active:cursor-grabbing select-none"
                onWheel={onWheel}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                <img
                    src={src}
                    alt={label}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-75 pointer-events-none"
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    }}
                />
            </div>
            <div className="text-xs text-muted-foreground text-center">
                Scroll to zoom • Drag to pan
            </div>
        </div>
    );
}

export function ImageCompressionModal({ file, isOpen, onClose, onDone }: ImageCompressionModalProps) {
    const [quality, setQuality] = useState(75);
    const [originalUrl, setOriginalUrl] = useState<string>("");
    const [compressedUrl, setCompressedUrl] = useState<string>("");
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
    const [compressedSize, setCompressedSize] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [outputFormat, setOutputFormat] = useState<"webp" | "jpeg">("webp");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const originalPZ = useImagePanZoom();
    const compressedPZ = useImagePanZoom();

    // Load original image
    useEffect(() => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setOriginalUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    // Compress image when quality or format changes
    useEffect(() => {
        if (!file || !originalUrl) return;

        const compress = async () => {
            setIsProcessing(true);
            try {
                const img = new Image();
                img.src = originalUrl;
                await new Promise<void>((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = reject;
                });

                const canvas = canvasRef.current || document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                const mimeType = outputFormat === "webp" ? "image/webp" : "image/jpeg";

                const blob = await new Promise<Blob>((resolve, reject) => {
                    canvas.toBlob(
                        (b) => (b ? resolve(b) : reject(new Error("Compression failed"))),
                        mimeType,
                        quality / 100
                    );
                });

                if (compressedUrl) URL.revokeObjectURL(compressedUrl);
                const url = URL.createObjectURL(blob);
                setCompressedUrl(url);
                setCompressedBlob(blob);
                setCompressedSize(blob.size);
            } catch (err) {
                console.error("Compression error:", err);
            } finally {
                setIsProcessing(false);
            }
        };

        const debounce = setTimeout(compress, 200);
        return () => clearTimeout(debounce);
    }, [file, originalUrl, quality, outputFormat]);

    const handleDone = () => {
        if (!compressedBlob || !file) return;
        const ext = outputFormat === "webp" ? ".webp" : ".jpg";
        const baseName = file.name.replace(/\.[^.]+$/, "");
        const compressedFile = new File(
            [compressedBlob],
            `${baseName}${ext}`,
            { type: compressedBlob.type }
        );
        onDone(compressedFile);
    };

    const handleReset = () => {
        setQuality(75);
        originalPZ.reset();
        compressedPZ.reset();
    };

    const savings = file ? Math.max(0, Math.round((1 - compressedSize / file.size) * 100)) : 0;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] overflow-y-auto p-0">
                <canvas ref={canvasRef} className="hidden" />

                <DialogHeader className="px-6 pt-6 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        Image Compression Studio
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 py-4 space-y-5">
                    {/* Side-by-side previews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {originalUrl && (
                            <ImagePreview
                                src={originalUrl}
                                label="Original"
                                fileSize={file ? formatFileSize(file.size) : "–"}
                                zoom={originalPZ.zoom}
                                pan={originalPZ.pan}
                                onWheel={originalPZ.handleWheel}
                                onMouseDown={originalPZ.handleMouseDown}
                                onMouseMove={originalPZ.handleMouseMove}
                                onMouseUp={originalPZ.handleMouseUp}
                            />
                        )}
                        {compressedUrl ? (
                            <ImagePreview
                                src={compressedUrl}
                                label="Compressed"
                                fileSize={formatFileSize(compressedSize)}
                                zoom={compressedPZ.zoom}
                                pan={compressedPZ.pan}
                                onWheel={compressedPZ.handleWheel}
                                onMouseDown={compressedPZ.handleMouseDown}
                                onMouseMove={compressedPZ.handleMouseMove}
                                onMouseUp={compressedPZ.handleMouseUp}
                            />
                        ) : (
                            <div className="flex-1 aspect-square rounded-xl border border-dashed border-border flex items-center justify-center text-muted-foreground">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm">Compressing...</span>
                                    </div>
                                ) : (
                                    "Preview will appear here"
                                )}
                            </div>
                        )}
                    </div>

                    {/* Savings indicator */}
                    {compressedSize > 0 && file && (
                        <div className="flex items-center justify-center gap-3">
                            <div className={`text-sm font-semibold px-3 py-1.5 rounded-full ${savings > 0 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                                {savings > 0 ? `${savings}% smaller` : "No reduction"}
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} → {formatFileSize(compressedSize)}
                            </span>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="space-y-4 rounded-xl bg-muted/30 border border-border p-4">
                        {/* Quality slider */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Compression Quality</Label>
                                <span className="text-sm font-mono font-bold text-primary">{quality}%</span>
                            </div>
                            <input
                                type="range"
                                min={5}
                                max={100}
                                step={1}
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Max compression</span>
                                <span>Best quality</span>
                            </div>
                        </div>

                        {/* Output format */}
                        <div className="flex items-center gap-4">
                            <Label className="text-sm font-medium">Format:</Label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOutputFormat("webp")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputFormat === "webp" ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}
                                >
                                    WebP
                                </button>
                                <button
                                    onClick={() => setOutputFormat("jpeg")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${outputFormat === "jpeg" ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}
                                >
                                    JPEG
                                </button>
                            </div>
                        </div>

                        {/* Zoom controls */}
                        <div className="flex items-center gap-2">
                            <Label className="text-sm font-medium mr-2">Zoom:</Label>
                            <Button variant="outline" size="sm" onClick={() => { originalPZ.zoomIn(); compressedPZ.zoomIn(); }} className="h-8 w-8 p-0">
                                <ZoomIn className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => { originalPZ.zoomOut(); compressedPZ.zoomOut(); }} className="h-8 w-8 p-0">
                                <ZoomOut className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleReset} className="h-8 gap-1 text-xs">
                                <RotateCcw className="h-3.5 w-3.5" /> Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-6 pb-6 pt-0 gap-2">
                    <Button variant="outline" onClick={onClose} className="gap-1.5">
                        <X className="h-4 w-4" /> Cancel
                    </Button>
                    <Button
                        onClick={handleDone}
                        disabled={isProcessing || !compressedBlob}
                        className="gap-1.5 bg-primary hover:bg-primary/90"
                    >
                        <Check className="h-4 w-4" />
                        {isProcessing ? "Processing..." : "Done — Upload Compressed"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
