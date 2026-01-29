import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { getPostBySlug } from "@/lib/actions/blog";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <article>
            {/* Header */}
            <Section className="pb-8 pt-24 md:pt-32">
                <Container className="max-w-3xl">
                    <div className="space-y-4 text-center">
                        <div className="text-sm font-medium text-primary uppercase tracking-wider">{post.category}</div>
                        <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl">{post.title}</h1>
                        <div className="text-muted-foreground">{post.date}</div>
                    </div>
                </Container>
            </Section>

            {/* Content */}
            <Section className="pt-0">
                <Container className="max-w-3xl">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <BlockRenderer blocks={post.blocks} />
                    </div>
                </Container>
            </Section>
        </article>
    );
}
