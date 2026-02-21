import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { getPostBySlug } from "@/lib/actions/blog";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { AdSense } from "@/components/google-adsense";

import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        return {};
    }

    const url = process.env.NEXT_PUBLIC_APP_URL || 'https://istiyaq-blog.vercel.app';

    return {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        alternates: {
            canonical: `${url}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${url}/blog/${post.slug}`,
            type: "article",
            publishedTime: post.publishedAt || post.createdAt,
            authors: [post.author?.name || 'Istiyaq Khan Razin'],
            images: post.coverImage?.url ? [{ url: post.coverImage.url }] : [],
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
        <article className="min-h-screen pb-16">
            <header className="relative w-full bg-gradient-to-b from-muted/50 to-background pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-border/50">
                {/* Optional Hero Image Background blur */}
                {post.coverImage?.url && (
                    <div className="absolute inset-0 z-0 opacity-10 blur-3xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage.url} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
                <Container className="max-w-4xl relative z-10">
                    <div className="space-y-6 text-center">
                        <div className="flex justify-center items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{post.primaryTag || 'General'}</span>
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
                                    <img src={post.author.image} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover" />
                                </>
                            )}
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-foreground text-base tracking-tight">{post.author?.name || 'Istiyaq Khan Razin'}</span>
                                <time dateTime={publishDate.toISOString()}>{format(publishDate, 'MMMM d, yyyy')}</time>
                            </div>
                        </div>
                    </div>
                </Container>
            </header>

            {post.coverImage?.url && (
                <Container className="max-w-5xl -mt-8 md:-mt-16 relative z-20 mb-16">
                    <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.coverImage.url}
                            alt={post.coverImage.alt || post.title}
                            className="w-full h-full object-cover bg-muted hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </Container>
            )}

            <Section className={post.coverImage?.url ? "pt-0 md:pt-8" : "pt-8 md:pt-16"}>
                <Container className="max-w-3xl">
                    <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2">
                        {post.contentFormat === 'markdown' ? (
                            <MarkdownRenderer content={post.markdownContent || ''} />
                        ) : (
                            <BlockRenderer blocks={post.blocks} />
                        )}
                    </div>

                    <div className="my-12">
                        <AdSense
                            dataAdSlot="2070570342"
                            dataAdFormat="fluid"
                            style={{ display: "block", textAlign: "center" }}
                            className="adsbygoogle"
                            dataFullWidthResponsive={true}
                        />
                    </div>

                    {/* Tags */}
                    {post.secondaryTags?.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap gap-2">
                            {post.secondaryTags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-muted/50 border border-border rounded-full text-xs font-medium text-muted-foreground uppercase tracking-wider hover:bg-muted transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </Container>
            </Section>

            {/* JSON-LD Structured Data for advanced Article SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.excerpt,
                        image: post.coverImage?.url ? [post.coverImage.url] : [],
                        datePublished: publishDate.toISOString(),
                        dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : publishDate.toISOString(),
                        author: [{
                            "@type": "Person",
                            name: post.author?.name || 'Istiyaq Khan Razin',
                            url: process.env.NEXT_PUBLIC_APP_URL || 'https://istiyaq-blog.vercel.app'
                        }],
                        publisher: {
                            "@type": "Organization",
                            name: 'Istiyaq Khan Razin',
                            logo: {
                                "@type": "ImageObject",
                                url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://istiyaq-blog.vercel.app'}/icon.png`
                            }
                        }
                    })
                }}
            />
        </article>
    );
}
