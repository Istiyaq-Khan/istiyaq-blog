// notFound import removed (unused)
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { IBlock } from "@/components/editor/types";

// This would normally fetch from DB based on params.slug
// Mocking for "Real Data" demo
async function getPost(slug: string) {
    if (slug === 'automate-content-repurposing') {
        return {
            title: "How I Automated My Content Workflow",
            date: "Oct 24, 2024",
            category: "Automation",
            blocks: [
                { id: '1', type: 'paragraph', content: { text: "Creating content is hard. Repurposing it is harder. That's why I built a system." } },
                { id: '2', type: 'heading', content: { level: 2, text: "The Problem" } },
                { id: '3', type: 'paragraph', content: { text: "I was spending 10 hours a week just copying and pasting from YouTube description to Tweets to LinkedIn posts. It was manual grunt work." } },
                { id: '4', type: 'heading', content: { level: 2, text: "The Solution: n8n" } },
                { id: '5', type: 'paragraph', content: { text: "I set up a workflow that triggers whenever I move a card in Notion to 'Published'." } },
                { id: '6', type: 'code', content: { language: 'js', code: "console.log('Workflow triggered');\n// Magic happens here" } }
            ] as IBlock[]
        }
    }
    return null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);

    if (!post) {
        // Ideally show notFound(), but for demo maybe just show empty
        return <div className="py-24 text-center">Post not found (This is a demo)</div>;
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
