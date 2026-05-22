"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    once?: boolean;
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = "up",
    duration = 0.8,
    once = true,
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const offsets = {
            up: { y: 50, x: 0 },
            down: { y: -50, x: 0 },
            left: { x: 50, y: 0 },
            right: { x: -50, y: 0 },
        };

        const { x, y } = offsets[direction];

        const ctx = gsap.context(() => {
            gsap.fromTo(
                element,
                { opacity: 0, x, y },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration,
                    delay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        toggleActions: once ? "play none none none" : "play none none reverse",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [delay, direction, duration, once]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}

// Staggered children reveal
interface StaggerRevealProps {
    children: React.ReactNode[];
    className?: string;
    childClassName?: string;
    staggerDelay?: number;
    baseDelay?: number;
    direction?: "up" | "down" | "left" | "right";
    childrenClassName?: React.HTMLAttributes<HTMLDivElement>['className']
}

export function StaggerReveal({
    children,
    className,
    childrenClassName,
    staggerDelay = 0.1,
    baseDelay = 0,
    direction = "up",
}: StaggerRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll(".stagger-item");

        const offsets = {
            up: { y: 40, x: 0 },
            down: { y: -40, x: 0 },
            left: { x: 40, y: 0 },
            right: { x: -40, y: 0 },
        };

        const { x, y } = offsets[direction];

        const ctx = gsap.context(() => {
            gsap.fromTo(
                items,
                { opacity: 0, x, y },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    stagger: staggerDelay,
                    delay: baseDelay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [staggerDelay, baseDelay, direction]);

    return (
        <div ref={containerRef} className={className}>
            {children && ((children as any[]).map ? (children as React.ReactNode[]).map((child, i) => (
                <div key={i} className={`stagger-item ${childrenClassName || ''}`}>
                    {child}
                </div>
            )) : (
                <div className={`stagger-item ${childrenClassName || ''}`}>
                    {children}
                </div>
            ))}
        </div>
    );
}
