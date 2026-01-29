import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlock {
    type: 'heading' | 'paragraph' | 'image' | 'code' | 'quote' | 'callout';
    content: any;
    order: number;
}

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: {
        url: string;
        alt: string;
    };
    primaryTag: string;
    secondaryTags: string[];
    intentTags: string[];
    blocks: IBlock[];
    readingTime: number;
    status: 'draft' | 'published';
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    author: {
        name: string;
        image: string;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        canonicalUrl?: string;
    };
}

const BlockSchema = new Schema<IBlock>({
    type: { type: String, required: true, enum: ['heading', 'paragraph', 'image', 'code', 'quote', 'callout'] },
    content: { type: Schema.Types.Mixed, required: true },
    order: { type: Number, required: true }
}, { _id: false });

const BlogPostSchema = new Schema<IBlogPost>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    coverImage: {
        url: { type: String },
        alt: { type: String }
    },
    primaryTag: { type: String, required: true, index: true },
    secondaryTags: [{ type: String }],
    intentTags: [{ type: String }],
    blocks: [BlockSchema],
    readingTime: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    publishedAt: { type: Date },
    author: {
        name: { type: String, default: "Istiyaq Khan" },
        image: { type: String }
    },
    seo: {
        metaTitle: { type: String },
        metaDescription: { type: String },
        canonicalUrl: { type: String }
    }
}, { timestamps: true });

// Prevent overwrite during HMR
const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
