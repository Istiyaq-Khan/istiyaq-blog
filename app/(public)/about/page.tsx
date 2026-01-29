import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ScrollReveal } from "@/components/gsap/scroll-reveal";
import {
    Github,
    Linkedin,
    Twitter,
    Youtube,
    Instagram,
    ExternalLink,
    Cpu,
    Palette,
    Wrench,
    GraduationCap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Istiyaq Khan Razin | AI Workflow Engineer & Content Systems Architect",
    description: "Istiyaq Khan Razin is a Sylhet-based Creator-Engineer specializing in AI workflow automation, content systems, and creative automation for YouTubers and solopreneurs. Founder of IKK Studio.",
    keywords: [
        "Istiyaq Khan Razin",
        "AI workflow automation",
        "content systems",
        "n8n workflows",
        "YouTube automation",
        "creator engineer",
        "IKK Studio",
        "marketing automation",
        "video editing automation",
        "Python automation",
        "generative AI",
        "content repurposing",
        "Sylhet Bangladesh developer"
    ],
    authors: [{ name: "Istiyaq Khan Razin" }],
    creator: "Istiyaq Khan Razin",
    publisher: "Istiyaq Khan Razin",
    openGraph: {
        title: "About Istiyaq Khan Razin | AI Workflow Engineer & Content Systems Architect",
        description: "Founder of IKK Studio. Building AI-powered content systems and workflow automation for creators. Expert in n8n, Python, and creative automation.",
        url: "https://istiyaq.vercel.app/about",
        siteName: "Istiyaq Khan",
        locale: "en_US",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Istiyaq Khan Razin | AI Workflow Engineer & Content Systems Architect",
        description: "Founder of IKK Studio. Building AI-powered content systems and workflow automation for creators.",
        creator: "@istiyaqkhanr",
    },
    alternates: {
        canonical: "https://istiyaq.vercel.app/about",
    },
};

export default function AboutPage() {
    return (
        <Container>
            <Section>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                    {/* Portrait */}
                    <ScrollReveal>
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
                            <Image
                                src="/istiyaq-khan-razin-founder-ikk-studio.webp"
                                alt="Istiyaq Khan building content automation and AI workflow systems"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </ScrollReveal>

                    {/* Introduction */}
                    <div className="space-y-8">
                        <ScrollReveal delay={0.2}>
                            <h1 className="font-heading text-4xl font-bold md:text-5xl">
                                Hi, I'm Istiyaq Khan Razin
                            </h1>
                            <h2 className="text-xl text-primary font-medium mt-4">
                                Creator × Engineer × System Builder
                            </h2>
                            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                                Founder of <span className="text-foreground font-semibold">IKK Studio</span> — where AI meets creativity
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </Section>

            {/* Who I Am Section */}
            <Section>
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <h2 className="font-heading text-3xl font-bold md:text-4xl">
                            Who I Am
                        </h2>
                        <div className="prose prose-invert prose-lg text-muted-foreground space-y-4">
                            <p className="leading-relaxed">
                                I'm a <strong className="text-foreground">Sylhet-based professional</strong> positioning myself at the intersection of creative media and technical automation. I build digital brains for creators — systems that turn chaos into consistency.
                            </p>
                            <p className="leading-relaxed">
                                Most creators struggle with consistency because they rely on motivation. I rely on <strong className="text-foreground">systems</strong>. My work sits at the convergence of technical engineering and creative storytelling, helping YouTubers and solopreneurs automate their workflows so they can focus on what they do best: creating.
                            </p>
                            <p className="leading-relaxed">
                                As the Founder of <strong className="text-foreground">IKK Studio</strong> (established December 2025), I've moved beyond traditional freelance work to build a specialized agency focused on "AI Workflow & Content Systems." I solve efficiency problems for content creators by designing automated pipelines that handle mundane tasks—repurposing long-form content into short-form clips, generating social media posts, and managing email automations.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            {/* What I Do Section */}
            <Section className="bg-muted/5">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="font-heading text-3xl font-bold md:text-4xl">
                            What I Do
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I design and build custom automation systems that bridge the gap between creative work and technical efficiency. My services span the full spectrum of content creation and distribution.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 mt-8">
                            <div className="space-y-3">
                                <h3 className="font-heading text-xl font-bold flex items-center gap-2">
                                    <Cpu className="h-5 w-5 text-primary" />
                                    AI Workflow Automation
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Custom n8n and Make.com workflows</li>
                                    <li>Python-based automation scripts</li>
                                    <li>Content repurposing pipelines</li>
                                    <li>Marketing automation systems</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-heading text-xl font-bold flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-secondary" />
                                    Creative Services
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>YouTube Channel Management</li>
                                    <li>Video Editing & Motion Graphics</li>
                                    <li>Content SEO & Optimization</li>
                                    <li>Brand Identity & Design</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-heading text-xl font-bold flex items-center gap-2">
                                    <Wrench className="h-5 w-5 text-blue-400" />
                                    Content Systems
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Notion & Obsidian vault design</li>
                                    <li>Publishing workflow setup</li>
                                    <li>Content calendar automation</li>
                                    <li>Multi-platform distribution</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-heading text-xl font-bold flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-green-400" />
                                    Prompt Engineering
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Generative AI integration</li>
                                    <li>Custom GPT workflows</li>
                                    <li>AI-powered content generation</li>
                                    <li>Automated copywriting systems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            {/* Skills Section */}
            <Section>
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="font-heading text-3xl font-bold md:text-4xl">
                            Technical & Creative Skills
                        </h2>

                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Technical Skills */}
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl font-bold text-primary">
                                    Technical Stack
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Automation & AI</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Python, n8n, Make.com, Zapier, Generative AI (GPT-4, Claude, Gemini), Prompt Engineering
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Content Systems</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Notion API, Obsidian, Airtable, Content Management Systems, SEO Tools
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Development</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Next.js, React, TypeScript, Node.js, API Integration, Web Scraping
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Creative Skills */}
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl font-bold text-secondary">
                                    Creative Suite
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Video & Motion</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Adobe After Effects, Premiere Pro, DaVinci Resolve, Motion Graphics, Video Editing
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Design & Branding</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Adobe Photoshop, Illustrator, Figma, Brand Identity Design, UI/UX Basics
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Content Strategy</h4>
                                        <p className="text-muted-foreground text-sm">
                                            Content SEO, YouTube Strategy, Social Media Marketing, Email Marketing
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            {/* Journey Section */}
            <Section className="bg-muted/5">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="font-heading text-3xl font-bold md:text-4xl">
                            My Journey
                        </h2>
                        <div className="space-y-6">
                            <div className="border-l-2 border-primary pl-6 space-y-4">
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-foreground">
                                        Student
                                    </h3>
                                    <p className="text-sm text-primary font-medium">Scholars Home, Sylhet</p>
                                    <p className="text-muted-foreground mt-2">
                                        Learning the fundamentals of code and design. Building a foundation in both technical engineering and creative media.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-heading text-xl font-bold text-foreground">
                                        Freelance Designer & Video Editor
                                    </h3>
                                    <p className="text-sm text-secondary font-medium">February 2025 - Present</p>
                                    <p className="text-muted-foreground mt-2">
                                        Mastered Adobe Photoshop, After Effects, and Motion Graphics. Provided design and video editing services while learning about client workflows and pain points.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-heading text-xl font-bold text-foreground">
                                        Founder, IKK Studio
                                    </h3>
                                    <p className="text-sm text-primary font-medium">December 2025 - Present</p>
                                    <p className="text-muted-foreground mt-2">
                                        Moved from individual execution to system architecture. Building AI Workflow & Content Systems for solopreneurs and small businesses. Scaling the "Creator-Engineer" brand by productizing automation services.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 p-6 rounded-lg bg-card border border-border">
                                <p className="text-foreground font-medium mb-2">
                                    What Sets Me Apart
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    I'm not just editing videos — I'm building the systems that edit videos. My shift from freelancer to founder represents a long-term strategy to productize services using AI to deliver high-volume, high-quality content output with minimal manual input. I serve creators who want to scale without burning out.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            {/* Connect Section */}
            <Section>
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-8 text-center">
                        <h2 className="font-heading text-3xl font-bold md:text-4xl">
                            Let's Connect
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Find me across the web:
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            <Link
                                href="https://github.com/Istiyaq-Khan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                            >
                                <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="font-medium">GitHub</span>
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/istiyaq-khan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                            >
                                <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="font-medium">LinkedIn</span>
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </Link>

                            <Link
                                href="https://x.com/istiyaqkhanr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                            >
                                <Twitter className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="font-medium">X (Twitter)</span>
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </Link>

                            <Link
                                href="https://www.youtube.com/@istiyaq-khan10"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                            >
                                <Youtube className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="font-medium">YouTube</span>
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </Link>

                            <Link
                                href="https://www.instagram.com/ist.iyaqkhan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                            >
                                <Instagram className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="font-medium">Instagram</span>
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </Link>

                            <Link
                                href="https://devpost.com/Istiyaq-Khan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                            >
                                <ExternalLink className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="font-medium">Devpost</span>
                            </Link>
                        </div>

                        <div className="mt-8">
                            <Link href="/contact">
                                <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                                    Get in Touch
                                </button>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Istiyaq Khan Razin",
                        "alternateName": "Istiyaq Khan",
                        "jobTitle": "Founder & AI Workflow Engineer",
                        "description": "Creator-Engineer specializing in AI workflow automation, content systems, and creative automation for YouTubers and solopreneurs",
                        "url": "https://istiyaq.vercel.app",
                        "image": "https://istiyaq.vercel.app/og-image.jpg",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Sylhet",
                            "addressCountry": "Bangladesh"
                        },
                        "alumniOf": {
                            "@type": "EducationalOrganization",
                            "name": "Scholars Home, Sylhet"
                        },
                        "knowsAbout": [
                            "AI Workflow Automation",
                            "Python Programming",
                            "n8n Workflows",
                            "Generative AI",
                            "Content Systems",
                            "Video Editing",
                            "Motion Graphics",
                            "Marketing Automation",
                            "YouTube SEO",
                            "Prompt Engineering"
                        ],
                        "sameAs": [
                            "https://github.com/Istiyaq-Khan",
                            "https://www.linkedin.com/in/istiyaq-khan/",
                            "https://x.com/istiyaqkhanr",
                            "https://www.youtube.com/@istiyaq-khan10",
                            "https://www.instagram.com/ist.iyaqkhan/",
                            "https://devpost.com/Istiyaq-Khan"
                        ],
                        "founder": {
                            "@type": "Organization",
                            "name": "IKK Studio",
                            "description": "AI Workflow & Content Systems agency",
                            "foundingDate": "2025-12"
                        }
                    })
                }}
            />
        </Container>
    );
}
