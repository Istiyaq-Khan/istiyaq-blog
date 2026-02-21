"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy } from "lucide-react";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!match) {
        return (
            <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-primary font-medium" {...props}>
                {children}
            </code>
        );
    }

    return (
        <div className="relative group rounded-xl overflow-hidden my-8 border border-border/50 bg-[#1e1e1e] shadow-2xl">
            {/* MacOS-style Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    {match[1] && (
                        <span className="text-xs font-mono font-medium text-muted-foreground uppercase ml-2 select-none tracking-wider opacity-80">
                            {match[1]}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center justify-center p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Copy code"
                    title="Copy code"
                >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Code Content */}
            <div className="text-[14px] leading-relaxed relative isolate">
                <SyntaxHighlighter
                    {...props}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem 1rem',
                        background: 'transparent',
                    }}
                    lineNumberStyle={{
                        minWidth: '3em',
                        paddingRight: '1em',
                        color: '#4b5563', // muted-foreground
                        textAlign: 'right',
                        userSelect: 'none'
                    }}
                />
            </div>
        </div>
    );
};

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code: CodeBlock as any
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
