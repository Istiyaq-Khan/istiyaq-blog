"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "./container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "https://istiyaq.com/about" },
    { name: "Work", href: "https://istiyaq.com/work" },
    { name: "Contact", href: "https://istiyaq.com/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const navRef2 = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // GSAP: Navbar scroll effect
    useEffect(() => {
        if (!navRef2.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef2.current,
                {
                    backgroundColor: "rgba(17, 17, 17, 0)",
                    backdropFilter: "blur(0px)",
                    borderColor: "rgba(39, 39, 42, 0)",
                },
                {
                    backgroundColor: "rgba(17, 17, 17, 0.85)",
                    backdropFilter: "blur(16px)",
                    borderColor: "rgba(39, 39, 42, 1)",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top -60px",
                        end: "top -120px",
                        scrub: 0.5,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    // GSAP: Page load animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 1.8 });

            tl.fromTo(
                logoRef.current,
                { opacity: 0, y: -12 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
            ).fromTo(
                linksRef.current?.children || [],
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 },
                "-=0.4"
            );
        });

        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                { opacity: 0, y: -8, height: 0 },
                { opacity: 1, y: 0, height: "auto", duration: 0.35, ease: "power2.out" }
            );
            gsap.fromTo(
                mobileMenuRef.current.querySelectorAll("a"),
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power2.out", delay: 0.1 }
            );
        }
    }, [isOpen]);

    return (
        <header
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 border-b transition-none"
            style={{ borderColor: "transparent" }}
        >
            <div ref={navRef2} className="w-full">
                <Container>
                    <div className="flex h-16 md:h-[72px] items-center justify-between">
                        {/* Logo */}
                        <Link
                            ref={logoRef}
                            href="/"
                            className="flex items-center gap-2.5 group opacity-0"
                        >
                            <div className="relative w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden group-hover:border-primary/40 transition-colors duration-300">
                                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <Image
                                    src="/icon.png"
                                    alt="Istiyaq Khan"
                                    width={20}
                                    height={20}
                                    className="relative z-10"
                                />
                            </div>
                            <span className="font-heading text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                                Istiyaq Khan
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div ref={linksRef} className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className={cn(
                                        "relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg hover:bg-surface/60 opacity-0",
                                        pathname === item.href
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                    {pathname === item.href && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2.5 rounded-lg text-foreground hover:bg-surface/60 transition-colors duration-300"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
                    style={{ borderColor: "rgba(39, 39, 42, 1)" }}
                >
                    <Container>
                        <nav className="flex flex-col gap-1 py-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className={cn(
                                        "px-4 py-3 text-sm font-medium tracking-wide rounded-lg transition-colors",
                                        pathname === item.href
                                            ? "text-foreground bg-surface/50"
                                            : "text-muted-foreground hover:text-foreground hover:bg-surface/30"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    );
}
