import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { getPostBySlug } from "@/lib/actions/blog";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { AdSense } from "@/components/google-adsense";
import { ScrollReveal, StaggerReveal } from "@/components/gsap/scroll-reveal";

import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        return {};
    }

    const url = process.env.NEXT_PUBLIC_APP_URL || 'https://blog.istiyaq.com';

    const allKeywords = [
        ...(post.seo?.seoKeywords || []),
        ...(post.seo?.seoTags || []),
        post.primaryTag,
        ...(post.secondaryTags || [])
    ].filter(Boolean);

    return {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        keywords: allKeywords.length > 0 ? allKeywords : undefined,
        alternates: {
            canonical: post.seo?.canonicalUrl || `${url}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDescription || post.excerpt,
            url: `${url}/blog/${post.slug}`,
            type: "article",
            publishedTime: post.publishedAt || post.createdAt,
            authors: [post.author?.name || 'Istiyaq Khan Razin'],
            images: post.coverImage?.url ? [{ url: post.coverImage.url }] : [],
            tags: post.seo?.seoTags || post.secondaryTags || [],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const publishDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt || Date.now());

    return (
        <article className="min-h-screen pb-16 selection:bg-primary/30 selection:text-primary-foreground">

            <header className="relative w-full bg-background pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-white/5">
                {/* Optional Hero Image Background blur */}
                {post.coverImage?.url && (
                    <div className="absolute inset-0 z-0 opacity-[0.03] blur-3xl pointer-events-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage.url} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                <Container className="max-w-4xl relative z-10">
                    <ScrollReveal direction="down" duration={0.8}>
                        <nav className="mb-6 flex justify-center items-center gap-3 text-sm text-muted-foreground font-medium w-full">
                            <Link href="/" className="hover:text-primary transition-colors duration-300">Home</Link>
                            <span className="opacity-50">/</span>
                            <Link href="/blog" className="hover:text-primary transition-colors duration-300">Blog</Link>
                            <span className="opacity-50">/</span>
                            <span className="text-foreground truncate max-w-[200px] sm:max-w-[300px]">{post.title}</span>
                        </nav>
                    </ScrollReveal>

                    <StaggerReveal className="space-y-6 text-center" staggerDelay={0.1}>
                        <div className="flex justify-center items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
                            <Link href={`/blog?tag=${encodeURIComponent(post.primaryTag || 'General')}`} className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300">
                                {post.primaryTag || 'General'}
                            </Link>
                            {post.readingTime > 0 && (
                                <span className="text-muted-foreground">&bull; {post.readingTime} min read</span>
                            )}
                        </div>
                        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground !leading-tight mx-auto max-w-3xl">
                            {post.title}
                        </h1>
                        {post.excerpt && (
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-6">
                            {post.author?.image && (
                                <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={post.author.image} alt={post.author.name} className="w-12 h-12 rounded-full border border-primary/30 object-cover shadow-lg shadow-primary/10" />
                                </>
                            )}
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-foreground text-base tracking-tight">{post.author?.name || 'Istiyaq Khan Razin'}</span>
                                <time dateTime={publishDate.toISOString()} className="text-muted-foreground/80">{format(publishDate, 'MMMM d, yyyy')}</time>
                            </div>
                        </div>
                    </StaggerReveal>
                </Container>
            </header>

            {post.coverImage?.url && (
                <ScrollReveal delay={0.3} duration={1}>
                    <Container className="max-w-5xl -mt-8 md:-mt-16 relative z-20 mb-16">
                        <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.coverImage.url}
                                alt={post.coverImage.alt || post.title}
                                className="w-full h-full object-cover bg-surface group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                            />
                        </div>
                    </Container>
                </ScrollReveal>
            )}

            <Section className={post.coverImage?.url ? "pt-0 md:pt-8" : "pt-8 md:pt-16"}>
                <Container className="max-w-3xl">
                    <ScrollReveal>
                        <div className="my-8 rounded-xl overflow-hidden bg-surface/50 border border-white/5 p-4 flex items-center justify-center min-h-[120px]">
                            {/* Middle Ad - Placed before post content */}
                            <AdSense
                                dataAdClient="ca-pub-9280900149424904"
                                dataAdSlot="6208907700"
                                dataAdFormat="fluid"
                                dataAdLayout="in-article"
                                style={{ display: "block", textAlign: "center", width: "100%" }}
                                className="adsbygoogle"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-heading prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:shadow-lg prose-pre:border prose-pre:border-white/10">
                            {post.contentFormat === 'markdown' ? (
                                <MarkdownRenderer content={post.markdownContent || ''} />
                            ) : (
                                <BlockRenderer blocks={post.blocks} />
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Tags */}
                    {post.secondaryTags?.length > 0 && (
                        <ScrollReveal delay={0.3}>
                            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-2">
                                {post.secondaryTags.map((tag: string) => (
                                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="px-3 py-1.5 bg-surface border border-white/5 rounded-lg text-xs font-medium text-muted-foreground uppercase tracking-wider hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300">
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </ScrollReveal>
                    )}

                    <ScrollReveal delay={0.4}>
                        <div className="my-12 rounded-xl overflow-hidden bg-surface/50 border border-white/5 p-4 flex items-center justify-center min-h-[120px]">
                            {/* Down Ad */}
                            <AdSense
                                dataAdClient="ca-pub-9280900149424904"
                                dataAdSlot="6208907700"
                                dataAdFormat="fluid"
                                dataAdLayout="in-article"
                                style={{ display: "block", textAlign: "center", width: "100%" }}
                                className="adsbygoogle"
                            />
                        </div>
                    </ScrollReveal>
                </Container>
            </Section>

            {/* JSON-LD Structured Data for advanced Article SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.seo?.metaDescription || post.excerpt,
                        image: post.coverImage?.url ? [post.coverImage.url] : [],
                        datePublished: publishDate.toISOString(),
                        dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : publishDate.toISOString(),
                        keywords: [
                            ...(post.seo?.seoKeywords || []),
                            ...(post.seo?.seoTags || []),
                            ...(post.secondaryTags || [])
                        ].filter(Boolean).join(', ') || undefined,
                        author: [{
                            "@type": "Person",
                            name: post.author?.name || 'Istiyaq Khan Razin',
                            url: process.env.NEXT_PUBLIC_APP_URL || 'https://blog.istiyaq.com'
                        }],
                        publisher: {
                            "@type": "Organization",
                            name: 'Istiyaq Khan Razin',
                            logo: {
                                "@type": "ImageObject",
                                url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://blog.istiyaq.com'}/icon.png`
                            }
                        }
                    })
                }}
            />
            <Analytics />
        </article>
    );
}
