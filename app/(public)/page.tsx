"use client";

import Link from "next/link";
import { ArrowRight, Bot, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/gsap/scroll-reveal";
import Head from "next/head";

export default function HomePage() {
    return (
        <>
            <Section className="flex min-h-[80vh] flex-col justify-center pt-24 md:pt-32 lg:pt-40">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                        <div className="flex flex-col justify-center space-y-8">
                            <ScrollReveal>
                                <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                    Building <span className="text-primary">content systems</span>,<br />
                                    AI workflows,<br />
                                    and <span className="text-secondary">creative automation</span>.
                                </h1>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2}>
                                <p className="max-w-md text-lg text-muted-foreground sm:text-xl leading-relaxed">
                                    I&apos;m Istiyaq Khan — I design systems that help creators
                                    publish faster, smarter, and consistently.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.4}>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/blog">
                                        <Button size="lg" className="rounded-full px-8 text-base">
                                            Read my notes
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                                            Work with me
                                        </Button>
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Featured Graphic / Card (Right Side) */}
                        <div className="flex items-center justify-center lg:justify-end">
                            <ScrollReveal delay={0.6} className="w-full max-w-md">
                                <Card className="overflow-hidden border-none bg-gradient-to-br from-primary/10 to-secondary/5 p-1 ring-1 ring-white/10">
                                    <div className="aspect-[4/3] rounded-2xl bg-card/80 p-8 backdrop-blur-sm flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <div className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                                                Featured Guide
                                            </div>
                                            <h3 className="font-heading text-2xl font-bold">
                                                How I Automate Content Repurposing
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                A deep dive into the n8n workflows that save me 10+ hours a week.
                                            </p>
                                        </div>
                                        <Link href="/blog/automate-content-repurposing" className="inline-flex items-center text-sm font-medium text-secondary hover:underline">
                                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* What I Do Section */}
            <Section className="bg-muted/5">
                <Container>
                    <ScrollReveal>
                        <h2 className="mb-12 font-heading text-3xl font-bold md:text-4xl text-center md:text-left">
                            What I focus on
                        </h2>
                    </ScrollReveal>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "Automation",
                                desc: "Building custom n8n and Make.com workflows to eliminate manual grunt work.",
                                icon: Bot,
                                color: "text-blue-400"
                            },
                            {
                                title: "Content Systems",
                                desc: "Designing Notion and Obsidian vaults that turn chaos into a publishing engine.",
                                icon: Layers,
                                color: "text-primary"
                            },
                            {
                                title: "Creative + Tech",
                                desc: "Bridging the gap between video editing (creative) and code (technical).",
                                icon: Cpu,
                                color: "text-secondary"
                            }
                        ].map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 0.1}>
                                <Card className="h-full transition-all hover:bg-muted/50">
                                    <CardContent className="p-8 space-y-4">
                                        <item.icon className={`h-10 w-10 ${item.color}`} />
                                        <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Istiyaq Khan",
                        "description": "AI Workflow Engineer & Content Systems Architect. Building automation systems for creators.",
                        "url": "https://istiyaq-blog.vercel.app",
                        "author": {
                            "@type": "Person",
                            "name": "Istiyaq Khan Razin",
                            "jobTitle": "Founder & AI Workflow Engineer",
                            "url": "https://istiyaq-blog.vercel.app/about"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "IKK Studio",
                            "description": "AI Workflow & Content Systems agency for creators",
                            "url": "https://istiyaq-blog.vercel.app"
                        }
                    })
                }}
            />
        </>
    );
}
