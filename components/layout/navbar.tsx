"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
                            Istiyaq Khan
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border/40">
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary px-2",
                                        pathname === item.href
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
