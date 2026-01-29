"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Start when top of element is 85% down viewport
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [delay]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}
