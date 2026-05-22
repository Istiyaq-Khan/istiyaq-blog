"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function SystemBootLoader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const hasLoaded = sessionStorage.getItem("hasLoaded");
        if (hasLoaded) {
            setShouldRender(false);
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem("hasLoaded", "true");
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (containerRef.current) {
                            containerRef.current.style.display = "none";
                        }
                    },
                });
            },
        });

        const texts = ["Initializing...", "Loading...", "Ready."];
        let textIndex = 0;

        const interval = setInterval(() => {
            textIndex++;
            if (textIndex < texts.length && textRef.current) {
                textRef.current.innerText = texts[textIndex];
            }
        }, 500);

        tl.to(progressRef.current, {
            width: "100%",
            duration: 1.2,
            ease: "power2.inOut",
        })
            .to(textRef.current, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
            })
            .to(containerRef.current, {
                y: "-100%",
                duration: 0.7,
                ease: "power3.inOut",
                delay: 0.15,
                onStart: () => {
                    clearInterval(interval);
                },
            });

        return () => clearInterval(interval);
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111111]"
        >
            <div className="w-48">
                <div className="h-px w-full bg-[#27272A] mb-3 overflow-hidden rounded-full">
                    <div
                        ref={progressRef}
                        className="h-full w-0 bg-[#8B5CF6]"
                    />
                </div>
                <div
                    ref={textRef}
                    className="text-xs font-mono text-[#A1A1AA] tracking-widest uppercase"
                >
                    Initializing...
                </div>
            </div>
        </div>
    );
}
