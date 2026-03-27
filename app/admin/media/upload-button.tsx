"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ImageCompressionModal } from "@/components/admin/image-compression-modal";

export function UploadButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showCompression, setShowCompression] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Open compression modal instead of uploading directly
        setSelectedFile(file);
        setShowCompression(true);

        // Reset the input so the same file can be re-selected
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCompressionDone = async (compressedFile: File) => {
        setShowCompression(false);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", compressedFile);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Upload failed");
            }

            toast({
                title: "Success",
                description: "Image compressed and uploaded successfully",
            });

            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
        }
    };

    const handleCompressionClose = () => {
        setShowCompression(false);
        setSelectedFile(null);
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <Button onClick={handleClick} disabled={isUploading}>
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Image"}
            </Button>

            <ImageCompressionModal
                file={selectedFile}
                isOpen={showCompression}
                onClose={handleCompressionClose}
                onDone={handleCompressionDone}
            />
        </div>
    );
}
