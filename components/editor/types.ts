export type BlockType = 'heading' | 'paragraph' | 'image' | 'code' | 'quote' | 'callout';

export type IBlockContent = Record<string, any>;

export interface IBlock {
    id: string; // Internal UI ID
    type: BlockType;
    content: IBlockContent;
}
