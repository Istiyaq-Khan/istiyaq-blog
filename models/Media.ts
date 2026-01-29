import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedia extends Document {
    filename: string;
    url: string;
    alt: string;
    mimeType: string;
    size: number;
    createdAt: Date;
}

const MediaSchema = new Schema<IMedia>({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String },
    mimeType: { type: String },
    size: { type: Number },
}, { timestamps: true });

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

export default Media;
