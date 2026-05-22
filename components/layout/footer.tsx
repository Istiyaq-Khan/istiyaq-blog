"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { Container } from "./container";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/Istiyaq-Khan", icon: Github },
    { name: "X", href: "https://x.com/istiyaqkhanr", icon: Twitter },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/istiyaq-khan/", icon: Linkedin },
];

const footerLinks = [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "https://istiyaq.com/about" },
    { label: "Work", href: "https://istiyaq.com/work" },
    { label: "Contact", href: "https://istiyaq.com/contact" },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative border-t border-[#27272A]/60 bg-[#111111]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

            <Container>
                <div className="pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                        <div className="lg:col-span-5 space-y-6">
                            <Link href="/" className="inline-flex items-center gap-2 group">
                                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                                    <span className="text-[#8B5CF6] text-sm font-bold">I</span>
                                </div>
                                <span className="font-heading text-sm font-semibold tracking-tight text-[#EDEDED] group-hover:text-[#8B5CF6] transition-colors">
                                    Istiyaq Khan
                                </span>
                            </Link>
                            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
                                Building AI systems that turn creators into scalable machines.
                                Documenting the journey in public.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                {socialLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-[#1A1A1A]/50 border border-[#27272A] hover:border-[#3F3F46] flex items-center justify-center text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-[#222222] transition-all duration-300"
                                        aria-label={item.name}
                                    >
                                        <item.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-3 lg:col-start-7">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-6 font-mono">
                                NAVIGATION
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            className="group inline-flex items-center gap-1.5 text-sm text-[#EDEDED]/80 hover:text-[#EDEDED] transition-colors duration-300"
                                        >
                                            {link.label}
                                            {link.href.startsWith("http") && (
                                                <ArrowUpRight className="h-3 w-3 text-[#A1A1AA] opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all duration-300" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3 lg:col-start-10">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-6 font-mono">
                                NOW
                            </h4>
                            <p className="text-sm text-[#EDEDED] leading-relaxed">
                                Looking for ambitious collaborators and meaningful problems to solve.
                            </p>
                            <a
                                href="https://istiyaq.com/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-[#8B5CF6] hover:text-[#8B5CF6]/80 transition-colors duration-300 group/link"
                            >
                                Get in touch
                                <ArrowUpRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#27272A]/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#A1A1AA] font-mono">
                        &copy; {year} ISTIYAQ KHAN RAZIN. All rights reserved.
                    </p>
                    <a
                        href="https://github.com/Istiyaq-Khan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#EDEDED] transition-colors duration-300 font-mono group"
                    >
                        <Github className="h-3.5 w-3.5" />
                        <span>Open source on GitHub</span>
                    </a>
                </div>
            </Container>
        </footer>
    );
}
