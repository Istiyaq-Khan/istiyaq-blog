import { IBlock } from "@/components/editor/types";
import { cn } from "@/lib/utils";
// Blocks: Heading, Paragraph, Image, Code.

export function BlockRenderer({ blocks }: { blocks: IBlock[] }) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className="space-y-6">
            {blocks.map((block) => {
                switch (block.type) {
                    case "heading":
                        const rawLevel = block.content.level as number | undefined;
                        const level = rawLevel || 2;
                        // Explicitly defined to satisfy TypeScript/Next.js build
                        const headingMap = { 1: 'h1', 2: 'h2', 3: 'h3' } as const;
                        const validLevel = (level === 1 || level === 2 || level === 3) ? level : 2;
                        const HeadingTag = headingMap[validLevel];
                        return (
                            <HeadingTag
                                key={block.id}
                                className={cn(
                                    "font-heading font-bold tracking-tight mt-8 first:mt-0",
                                    level === 1 ? "text-4xl" : level === 2 ? "text-3xl" : "text-2xl"
                                )}
                            >
                                {block.content.text}
                            </HeadingTag>
                        );
                    case "paragraph":
                        return (
                            <p key={block.id} className="text-lg leading-relaxed text-muted-foreground">
                                {block.content.text}
                            </p>
                        );
                    case "image":
                        return (
                            <figure key={block.id} className="my-8">
                                <div className="overflow-hidden rounded-xl bg-muted">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={block.content.url}
                                        alt={block.content.alt || ""}
                                        className="w-full object-cover transition-transform hover:scale-[1.02]"
                                    />
                                </div>
                                {block.content.caption && (
                                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                                        {block.content.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    case "code":
                        return (
                            <div key={block.id} className="my-6 overflow-hidden rounded-lg border border-border bg-[#0d0d0d]">
                                {block.content.filename && (
                                    <div className="border-b border-border/50 px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/20">
                                        {block.content.filename}
                                    </div>
                                )}
                                <pre className="overflow-x-auto p-4 text-sm font-mono text-gray-300">
                                    <code>{block.content.code}</code>
                                </pre>
                            </div>
                        );
                    case "quote":
                        return (
                            <blockquote key={block.id} className="border-l-4 border-primary pl-4 my-8 italic text-xl text-muted-foreground bg-muted/30 py-4 pr-4 rounded-r-lg">
                                &ldquo;{block.content.text}&rdquo;
                                {block.content.citation && (
                                    <footer className="mt-2 text-sm text-foreground font-medium not-italic">
                                        &mdash; {block.content.citation}
                                    </footer>
                                )}
                            </blockquote>
                        );
                    case "callout":
                        const intentConfig: Record<string, string> = {
                            info: "bg-blue-500/10 border-blue-500/50 text-blue-500",
                            warning: "bg-yellow-500/10 border-yellow-500/50 text-yellow-500",
                            success: "bg-green-500/10 border-green-500/50 text-green-500",
                            error: "bg-red-500/10 border-red-500/50 text-red-500",
                        };
                        const intentKey = block.content.intent || 'info';
                        const theme = intentConfig[intentKey] || intentConfig.info;
                        return (
                            <div key={block.id} className={cn("my-6 rounded-lg border p-4", theme)}>
                                {block.content.text}
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
