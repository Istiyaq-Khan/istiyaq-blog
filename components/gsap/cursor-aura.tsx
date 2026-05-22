"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CursorEffectProps {
    children: React.ReactNode;
}

export function CursorAura({ children }: CursorEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const isTouchDevice = "ontouchstart" in window;
        if (isTouchDevice) return;

        const ctx = gsap.context(() => {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;

                gsap.to(container, {
                    backgroundPosition: `${xPercent}% ${yPercent}%`,
                    duration: 1.5,
                    ease: "power2.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(container, {
                    backgroundPosition: "50% 50%",
                    duration: 0.8,
                    ease: "power2.out",
                });
            };

            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {children}
        </div>
    );
}
