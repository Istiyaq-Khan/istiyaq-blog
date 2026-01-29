"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error); 
    }, [error]);

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-heading text-4xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground">We apologize for the inconvenience.</p>
            <div className="flex gap-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                    Go Home
                </Button>
            </div>
        </div>
    );
}
