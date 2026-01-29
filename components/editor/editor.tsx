"use client";

import { useState } from "react";
import { IBlock, BlockType, IBlockContent } from "./types";
import { HeadingBlock, ParagraphBlock, ImageBlock, CodeBlock } from "./blocks";
import { Button } from "@/components/ui/button";
import { Plus, Type, Heading, Image as ImageIcon, Code, Quote } from "lucide-react";

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

export function Editor() {
    const [blocks, setBlocks] = useState<IBlock[]>([]);

    const addBlock = (type: BlockType) => {
        const newBlock: IBlock = {
            id: generateId(),
            type,
            content: type === 'heading' ? { level: 2, text: '' } : { text: '' }
        };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (id: string, content: IBlockContent) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const moveBlock = (id: string, direction: 'up' | 'down') => {
        const index = blocks.findIndex(b => b.id === id);
        if (index === -1) return;

        const newBlocks = [...blocks];
        if (direction === 'up' && index > 0) {
            [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
        } else if (direction === 'down' && index < newBlocks.length - 1) {
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        }
        setBlocks(newBlocks);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
                {blocks.map((block, index) => {
                    const props = {
                        key: block.id,
                        block,
                        updateBlock,
                        removeBlock,
                        moveBlock,
                        index,
                        isFirst: index === 0,
                        isLast: index === blocks.length - 1
                    };

                    switch (block.type) {
                        case 'heading': return <HeadingBlock {...props} />;
                        case 'paragraph': return <ParagraphBlock {...props} />;
                        case 'image': return <ImageBlock {...props} />;
                        case 'code': return <CodeBlock {...props} />;
                        default: return <div key={block.id}>Unknown block</div>;
                    }
                })}
            </div>

            {/* Block Picker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-border pt-4">
                <Button variant="outline" onClick={() => addBlock('heading')} className="gap-2 justify-start">
                    <Heading className="h-4 w-4" /> Heading
                </Button>
                <Button variant="outline" onClick={() => addBlock('paragraph')} className="gap-2 justify-start">
                    <Type className="h-4 w-4" /> Paragraph
                </Button>
                <Button variant="outline" onClick={() => addBlock('image')} className="gap-2 justify-start">
                    <ImageIcon className="h-4 w-4" /> Image
                </Button>
                <Button variant="outline" onClick={() => addBlock('code')} className="gap-2 justify-start">
                    <Code className="h-4 w-4" /> Code
                </Button>
                {/* Add Quote/Callout later */}
            </div>
        </div>
    );
}
