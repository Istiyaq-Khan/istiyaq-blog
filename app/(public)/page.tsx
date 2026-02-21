import Link from "next/link";
import { ArrowRight, Bot, PlaySquare, Workflow, RefreshCw, Github, Twitter, Linkedin, Instagram, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/gsap/scroll-reveal";
import { getPosts } from "@/lib/actions/blog";
import { format } from "date-fns";

export default async function HomePage() {
    const { posts } = await getPosts(1, 3, { status: "published" });
    const recentPosts = posts || [];

    return (
        <div className="relative min-h-screen overflow-hidden bg-background selection:bg-primary/30 selection:text-primary-foreground">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

            {/* HERO SECTION */}
            <Section className="relative z-10 flex min-h-[90vh] flex-col justify-center pt-32 pb-20">
                <Container>
                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
                        <div className="flex flex-col justify-center space-y-10">
                            <ScrollReveal>
                                <div className="space-y-4">
                                    <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground">
                                        NOTES ON<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">ENGINEERING &</span><br />
                                        SYSTEMS.
                                    </h1>
                                    <p className="max-w-xl text-xl text-muted-foreground sm:text-2xl font-light tracking-wide">
                                        My personal blog exploring AI,<br className="hidden sm:block" />
                                        n8n automation, and code.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <div className="flex flex-wrap gap-6 items-center">
                                    <Link href="/blog">
                                        <Button
                                            size="lg"
                                            className="relative group overflow-hidden rounded-full bg-secondary/90 hover:bg-secondary text-secondary-foreground px-10 py-7 text-lg font-semibold transition-all duration-300 shadow-[0_0_40px_-10px_rgba(163,230,53,0.5)] hover:shadow-[0_0_60px_-10px_rgba(163,230,53,0.7)] hover:scale-105"
                                        >
                                            <span className="relative z-10">Read Latest Posts</span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                        </Button>
                                    </Link>
                                    <a href="https://istiyaqkhan.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground font-medium flex items-center gap-2 transition-colors group">
                                        View my Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </ScrollReveal>

                            {/* Bio Snippet */}
                            <ScrollReveal delay={0.3}>
                                <div className="pt-8 border-t border-border/50 max-w-xl">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        <strong className="text-foreground font-medium">ISTIYAQ KHAN RAZIN</strong> — This is my digital garden. I document my learnings, write tutorials on Python and n8n, and share insights on building automated pipelines for creators. Welcome to my brain.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Abstract Hero Visual (Glassmorphism) */}
                        <div className="relative lg:h-[600px] flex items-center justify-center pointer-events-none">
                            <ScrollReveal delay={0.4} className="w-full h-full relative flex items-center justify-center">
                                {/* Decorative Glass Elements */}
                                <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                                <div className="absolute w-72 h-72 bg-secondary/10 rounded-full blur-3xl mix-blend-screen translate-x-1/2 translate-y-1/4" />

                                <Card className="relative z-10 w-full max-w-md aspect-square rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 ring-1 ring-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

                                    <div className="relative w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                                        <Bot className="w-16 h-16 text-primary" strokeWidth={1.5} />
                                        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center backdrop-blur-md">
                                            <Workflow className="w-6 h-6 text-secondary" strokeWidth={2} />
                                        </div>
                                    </div>

                                    <div className="space-y-3 w-full max-w-[80%] relative z-10">
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-primary to-secondary w-[75%] rounded-full" />
                                        </div>
                                        <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                                        <div className="h-2 w-4/5 bg-white/10 rounded-full" />
                                    </div>
                                    <p className="mt-8 text-xs font-mono text-muted-foreground tracking-widest uppercase">System Initialization_</p>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* BENTO BOX GRID SECTION */}
            <Section className="relative z-10 py-24 bg-black/50 border-t border-white/5 backdrop-blur-xl">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <ScrollReveal>
                            <h2 className="font-heading text-3xl font-bold md:text-5xl text-foreground tracking-tight">
                                Most Viewed<br />Articles
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <Link href="/blog">
                                <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground">
                                    View All Posts <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                        {recentPosts.length > 0 ? recentPosts.map((post: any, i: number) => (
                            <ScrollReveal key={post._id} delay={0.1 * (i + 1)} className={i === 0 ? "md:col-span-2 md:row-span-2" : "h-full"}>
                                <Card className={`h-full w-full group overflow-hidden border border-white/10 bg-gradient-to-br from-card to-background hover:border-primary/50 transition-all duration-500 rounded-3xl relative ${i === 0 ? "flex flex-col" : "flex flex-col p-8"}`}>
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {i === 0 ? (
                                        <CardContent className="p-10 h-full flex flex-col justify-between relative z-10 w-full">
                                            <div className="space-y-4 max-w-lg">
                                                <div className="inline-flex items-center rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-medium text-primary uppercase tracking-wide">
                                                    {post.primaryTag || "Featured"}
                                                </div>
                                                <h3 className="font-heading text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                                                    {post.title}
                                                </h3>
                                                <p className="text-lg text-muted-foreground line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <p className="text-sm font-medium text-muted-foreground pt-2">
                                                    {post.publishedAt ? format(new Date(post.publishedAt), 'MMM dd, yyyy') : format(new Date(post.createdAt), 'MMM dd, yyyy')}
                                                </p>
                                            </div>

                                            <div className="mt-8">
                                                <Link href={`/blog/${post.slug}`}>
                                                    <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all">
                                                        Read Article
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 z-20">
                                                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-20">
                                                    <span className="sr-only">Read {post.title}</span>
                                                </Link>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />
                                            <div className="inline-flex items-center rounded-full bg-secondary/10 border border-secondary/20 px-3 py-1 text-xs font-medium text-secondary uppercase tracking-wide max-w-max mb-6">
                                                {post.primaryTag || "Article"}
                                            </div>
                                            <h3 className="font-heading text-2xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-secondary transition-colors duration-300 relative z-30 pointer-events-none">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed mt-auto line-clamp-3 relative z-30 pointer-events-none">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-6 flex items-center justify-between relative z-30 pointer-events-none">
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    {post.publishedAt ? format(new Date(post.publishedAt), 'MMM dd, yyyy') : format(new Date(post.createdAt), 'MMM dd, yyyy')}
                                                </p>
                                                <div className="text-secondary hover:text-secondary/80 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                                                    Read <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Card>
                            </ScrollReveal>
                        )) : (
                            <div className="text-muted-foreground md:col-span-3 text-center py-12">No posts available yet. Check back soon.</div>
                        )}
                    </div>
                </Container>
            </Section>

            {/* SOCIALS & LINKS SECTION */}
            <Section className="relative z-10 py-24 bg-background border-t border-border/50">
                <Container>
                    <div className="flex flex-col items-center justify-center text-center space-y-12">
                        <ScrollReveal>
                            <h2 className="font-heading text-3xl font-bold md:text-4xl text-foreground">
                                Join the Conversation.
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                I share my daily learnings, open-source projects, and new blog posts across my social platforms. Let's connect and build something cool.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    { name: "YouTube", icon: PlaySquare, url: "https://www.youtube.com/@istiyaq-khan10", hover: "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50" },
                                    { name: "GitHub", icon: Github, url: "https://github.com/Istiyaq-Khan", hover: "hover:bg-white/10 hover:text-white hover:border-white/50" },
                                    { name: "X (Twitter)", icon: Twitter, url: "https://x.com/istiyaqkhanr", hover: "hover:bg-blue-400/10 hover:text-blue-400 hover:border-blue-400/50" },
                                    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/istiyaq-khan", hover: "hover:bg-blue-600/10 hover:text-blue-600 hover:border-blue-600/50" },
                                    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/ist.iyaqkhan", hover: "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/50" },
                                ].map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/5 bg-white/5 shadow-sm backdrop-blur-md transition-all duration-300 font-medium text-muted-foreground ${link.hover}`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span>{link.name}</span>
                                    </a>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </Container>
            </Section>

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "Istiyaq Khan Razin | Personal Blog",
                        "description": "Personal blog exploring AI workflow automation, content systems engineering, python scripts, and n8n tutorials.",
                        "url": "https://istiyaq-blog.vercel.app",
                        "author": {
                            "@type": "Person",
                            "name": "Istiyaq Khan Razin",
                            "jobTitle": "Creator-Engineer",
                            "url": "https://istiyaq-blog.vercel.app",
                            "sameAs": [
                                "https://www.youtube.com/@istiyaq-khan10",
                                "https://github.com/Istiyaq-Khan",
                                "https://x.com/istiyaqkhanr",
                                "https://www.linkedin.com/in/istiyaq-khan",
                                "https://www.instagram.com/ist.iyaqkhan"
                            ]
                        }
                    })
                }}
            />
        </div>
    );
}
