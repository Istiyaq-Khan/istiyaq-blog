"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function SystemBootLoader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Check if we've already shown the loader in this session
        const hasLoaded = sessionStorage.getItem("hasLoaded");
        if (hasLoaded) {
            setShouldRender(false);
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem("hasLoaded", "true");
                // Optional: Remove from DOM after animation
                gsap.to(containerRef.current, {
                    display: "none",
                });
            },
        });

        const texts = ["Initializing systems...", "Loading content...", "Ready."];
        let textIndex = 0;

        // 1. Text Morphing
        // We can simulate text updates manually or via tween
        const interval = setInterval(() => {
            textIndex++;
            if (textIndex < texts.length && textRef.current) {
                textRef.current.innerText = texts[textIndex];
            }
        }, 600);

        // 2. Progress Bar
        tl.to(progressRef.current, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
        })
            .to(textRef.current, {
                opacity: 0,
                duration: 0.2,
            })
            // 3. Slide Up Reveal
            .to(containerRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "expo.inOut",
                onStart: () => {
                    clearInterval(interval);
                }
            });

        return () => clearInterval(interval);
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
        >
            <div className="w-64">
                <div ref={textRef} className="mb-2 text-sm font-mono text-primary">
                    Initializing systems...
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted/20">
                    <div
                        ref={progressRef}
                        className="h-full w-0 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    />
                </div>
            </div>
        </div>
    );
}
