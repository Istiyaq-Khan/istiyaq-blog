"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { format } from "date-fns";
import { Container } from "@/components/layout/container";
import { ScrollReveal } from "@/components/gsap/scroll-reveal";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";

interface Post {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    primaryTag?: string;
    publishedAt?: string;
    createdAt: string;
}

interface HomeClientProps {
    recentPosts: Post[];
}

export function HomeClient({ recentPosts }: HomeClientProps) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Ambient backgrounds that follow scroll — extremely subtle */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/3 rounded-full blur-[150px] pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#A3E635]/2 rounded-full blur-[150px] pointer-events-none" />

            <HeroSection />
            <ProofSection />
            <ServicesSection />
            <ThinkingSection />
            <ProjectsSection />
            <BlogSection recentPosts={recentPosts} />
            <ConnectSection />
        </div>
    );
}

function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 1.5 });

            if (titleRef.current) {
                const words = titleRef.current.querySelectorAll(".hero-word");
                tl.fromTo(
                    words,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.07 }
                );
            }

            if (subtitleRef.current) {
                tl.fromTo(
                    subtitleRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                    "-=0.5"
                );
            }

            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                    "-=0.4"
                );
            }

            if (metaRef.current) {
                tl.fromTo(
                    metaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.3"
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative z-10 min-h-screen flex items-center pt-16 pb-16 border-b border-[#27272A]/60">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272A] bg-[#1A1A1A]/60">
                                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
                                <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest">
                                    Building in Public
                                </span>
                            </div>
                            <h1 ref={titleRef} className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#EDEDED] leading-[1.05]">
                                <span className="hero-word inline-block">I</span>{" "}
                                <span className="hero-word inline-block">build</span>{" "}
                                <span className="hero-word inline-block">AI</span>{" "}
                                <span className="hero-word inline-block">systems</span>
                                <br />
                                <span className="hero-word inline-block">that</span>{" "}
                                <span className="hero-word inline-block">turn</span>{" "}
                                <span className="hero-word inline-block">creators</span>{" "}
                                <span className="hero-word inline-block">into</span>
                                <br />
                                <span className="hero-word inline-block text-[#8B5CF6]">scalable</span>{" "}
                                <span className="hero-word inline-block text-[#8B5CF6]">machines.</span>
                            </h1>
                            <p ref={subtitleRef} className="max-w-2xl text-lg sm:text-xl text-[#A1A1AA] leading-relaxed opacity-0">
                                Not a guru. Just a student builder from Bangladesh documenting the process 
                                of building in public. Systems over tasks. Clarity over decoration.
                            </p>
                        </div>

                        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 opacity-0">
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#8B5CF6] text-[#111111] rounded-full text-sm font-semibold tracking-wide hover:bg-[#A78BFA] transition-all duration-300 hover:scale-105"
                            >
                                Explore the Blog
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            <a
                                href="https://istiyaq.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-[#A1A1AA] hover:text-[#EDEDED] transition-colors duration-300"
                            >
                                View Portfolio
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </a>
                        </div>

                        <div ref={metaRef} className="flex items-center gap-6 pt-8 border-t border-[#27272A]/50 opacity-0">
                            <span className="text-xs text-[#A1A1AA] font-mono uppercase tracking-wider">
                                Creator-Engineer & System Architect
                            </span>
                            <div className="h-px flex-1 bg-[#27272A]/50" />
                        </div>
                    </div>

                    <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
                        <div className="relative w-full max-w-[320px] aspect-[3/4]">
                            <div className="absolute inset-0 rounded-3xl border border-[#27272A] bg-[#1A1A1A]/80 backdrop-blur-sm" />
                            <div className="absolute inset-3 rounded-2xl border border-[#8B5CF6]/15 flex flex-col items-center justify-center p-6">
                                <div className="w-20 h-20 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-8">
                                    <span className="text-4xl font-bold text-[#8B5CF6]">I</span>
                                </div>
                                <div className="space-y-3 w-full max-w-[180px]">
                                    <div className="h-2 w-full bg-[#27272A] rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-[#8B5CF6] rounded-full" />
                                    </div>
                                    <div className="h-2 w-2/3 bg-[#27272A] rounded-full" />
                                    <div className="h-2 w-4/5 bg-[#27272A] rounded-full" />
                                </div>
                                <p className="mt-10 text-xs font-mono text-[#A1A1AA] tracking-widest uppercase">system_init_</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function ProofSection() {
    const proofs = [
        { label: "Systems Built", value: "10+", desc: "Automated workflows" },
        { label: "Hours Saved", value: "200+", desc: "Per month via automation" },
        { label: "Content Generated", value: "500+", desc: "Pieces created" },
    ];

    return (
        <section className="relative z-10 py-24 border-b border-[#27272A]/60">
            <Container>
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">01</span>
                        <div className="h-px flex-1 bg-[#27272A]" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDED]">
                        Proof of Work
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {proofs.map((proof, i) => (
                        <ScrollReveal key={proof.label} delay={i * 0.1}>
                            <div className="group p-8 rounded-2xl border border-[#27272A] bg-[#1A1A1A]/60 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/80 transition-all duration-300 hover:-translate-y-1">
                                <div className="text-5xl font-bold text-[#8B5CF6] font-heading mb-3">{proof.value}</div>
                                <div className="text-lg font-semibold text-[#EDEDED] mb-1">{proof.label}</div>
                                <div className="text-sm text-[#A1A1AA]">{proof.desc}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function ServicesSection() {
    const services = [
        {
            title: "AI Automation Systems",
            description: "n8n, Python, and LangChain pipelines that eliminate repetitive tasks and free up creative energy.",
            icon: "01",
        },
        {
            title: "Content Repurposing Systems",
            description: "Automated workflows that turn one piece of content into dozens, distributed across platforms.",
            icon: "02",
        },
        {
            title: "YouTube Growth Systems",
            description: "End-to-end pipelines: research, scripting, thumbnail generation, and analytics that compound over time.",
            icon: "03",
        },
    ];

    return (
        <section className="relative z-10 py-24 border-b border-[#27272A]/60">
            <Container>
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">02</span>
                        <div className="h-px flex-1 bg-[#27272A]" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDED] mb-4">
                        What I Actually Do
                    </h2>
                    <p className="text-[#A1A1AA] max-w-2xl leading-relaxed">Not services. Systems. I build infrastructure that compounds.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <ScrollReveal key={service.title} delay={i * 0.1} direction="up">
                            <div className="group p-8 rounded-2xl border border-[#27272A] bg-[#1A1A1A]/60 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/80 transition-all duration-300 hover:-translate-y-1 h-full">
                                <span className="text-sm font-mono text-[#A1A1AA]/50 mb-6 block">{service.icon}</span>
                                <h3 className="font-heading text-xl font-semibold text-[#EDEDED] mb-4 group-hover:text-[#8B5CF6] transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-[#A1A1AA] leading-relaxed">{service.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function ThinkingSection() {
    const frameworks = [
        { name: "Systems First", desc: "Build the machine, not the task." },
        { name: "Learn in Public", desc: "Document before you become an expert." },
        { name: "Clarity Over Hype", desc: "Simple is hard. Simple wins." },
        { name: "Automation Mindset", desc: "If you repeat it, automate it." },
    ];

    return (
        <section className="relative z-10 py-24 border-b border-[#27272A]/60">
            <Container>
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">03</span>
                        <div className="h-px flex-1 bg-[#27272A]" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDED] mb-4">
                        Thinking Layer
                    </h2>
                    <p className="text-[#A1A1AA] max-w-2xl leading-relaxed">
                        Mental models and frameworks I use to navigate complexity and make decisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {frameworks.map((fw, i) => (
                        <ScrollReveal key={fw.name} delay={i * 0.08} direction="left">
                            <div className="group p-6 rounded-xl border border-[#27272A] bg-[#1A1A1A]/40 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/60 transition-all duration-300">
                                <h4 className="font-heading text-lg font-semibold text-[#EDEDED] mb-1 group-hover:text-[#8B5CF6] transition-colors duration-300">
                                    {fw.name}
                                </h4>
                                <p className="text-sm text-[#A1A1AA]">{fw.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function ProjectsSection() {
    const projects = [
        {
            title: "AI Video Pipeline",
            problem: "Creating content was too manual and inconsistent.",
            system: "Built an n8n + Python pipeline that automates research, script generation, thumbnail creation, and scheduling.",
            outcome: "Reduced production time from 6 hours to 45 minutes per video.",
        },
        {
            title: "YouTube Growth Engine",
            problem: "Growth plateaued without a repeatable system.",
            system: "Designed an end-to-end system: trend research, keyword optimization, batch scripting, and automated analytics.",
            outcome: "Achieved consistent 20% month-over-month growth in views.",
        },
    ];

    return (
        <section className="relative z-10 py-24 border-b border-[#27272A]/60">
            <Container>
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">04</span>
                        <div className="h-px flex-1 bg-[#27272A]" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDED] mb-4">
                        Systems Built
                    </h2>
                    <p className="text-[#A1A1AA] max-w-2xl leading-relaxed">
                        Real systems, real outcomes. No fluff. Problem, system, outcome.
                    </p>
                </div>

                <div className="space-y-6">
                    {projects.map((proj, i) => (
                        <ScrollReveal key={proj.title} delay={i * 0.1}>
                            <div className="group p-8 rounded-2xl border border-[#27272A] bg-[#1A1A1A]/60 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/80 transition-all duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-3">
                                        <h3 className="font-heading text-xl font-semibold text-[#EDEDED] mb-2 group-hover:text-[#8B5CF6] transition-colors duration-300">
                                            {proj.title}
                                        </h3>
                                    </div>
                                    <div className="md:col-span-9 space-y-4">
                                        <div>
                                            <span className="text-xs font-mono text-[#A1A1AA]/60 uppercase tracking-wider">Problem</span>
                                            <p className="text-sm text-[#A1A1AA] mt-1">{proj.problem}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-mono text-[#8B5CF6]/60 uppercase tracking-wider">System</span>
                                            <p className="text-sm text-[#EDEDED] mt-1">{proj.system}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-mono text-[#A3E635]/60 uppercase tracking-wider">Outcome</span>
                                            <p className="text-sm text-[#A3E635] mt-1">{proj.outcome}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function BlogSection({ recentPosts }: { recentPosts: Post[] }) {
    return (
        <section className="relative z-10 py-24 border-b border-[#27272A]/60">
            <Container>
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-widest">05</span>
                        <div className="h-px flex-1 bg-[#27272A]" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
                        <div>
                            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDED] mb-4">
                                The Thinking Lab
                            </h2>
                            <p className="text-[#A1A1AA] max-w-2xl leading-relaxed">
                                A premium space for deep thinking about AI, automation, and the philosophy of building in public.
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors duration-300 shrink-0"
                        >
                            View all articles
                            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    {recentPosts.length > 0 ? (
                        recentPosts.map((post, i) => (
                            <ScrollReveal key={post._id} delay={i * 0.1}>
                                <Link href={`/blog/${post.slug}`} className="group block">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl border border-[#27272A] bg-[#1A1A1A]/60 hover:border-[#3F3F46] hover:bg-[#1A1A1A]/80 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
                                                    {post.primaryTag || "Article"}
                                                </span>
                                                <span className="text-xs text-[#A1A1AA]/60">
                                                    {format(new Date(post.publishedAt || post.createdAt), "MMM dd, yyyy")}
                                                </span>
                                            </div>
                                            <h3 className="font-heading text-xl font-semibold text-[#EDEDED] group-hover:text-[#8B5CF6] transition-colors duration-300 mb-1 line-clamp-1">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-[#A1A1AA] line-clamp-2">
                                                {post.excerpt || "Read this article to explore the thinking behind the systems."}
                                            </p>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-[#3F3F46] group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))
                    ) : (
                        <div className="py-16 text-center border border-dashed border-[#27272A] rounded-2xl">
                            <BookOpen className="h-8 w-8 text-[#27272A] mx-auto mb-3" />
                            <p className="text-[#A1A1AA]">No posts published yet. Check back soon.</p>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

function ConnectSection() {
    const links = [
        { name: "YouTube", href: "https://www.youtube.com/@istiyaq-khan10" },
        { name: "GitHub", href: "https://github.com/Istiyaq-Khan" },
        { name: "X (Twitter)", href: "https://x.com/istiyaqkhanr" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/istiyaq-khan/" },
    ];

    return (
        <section className="relative z-10 py-24">
            <Container>
                <ScrollReveal>
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEDED] mb-4">
                            Follow the Build
                        </h2>
                        <p className="text-[#A1A1AA] leading-relaxed mb-10">
                            I share my daily learnings, open-source projects, and new blog posts across my social platforms.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#27272A] bg-[#1A1A1A]/60 text-sm font-medium text-[#A1A1AA] hover:text-[#EDEDED] hover:border-[#3F3F46] hover:bg-[#1A1A1A]/80 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {link.name}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
}
