import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalytics extends Document {
    path: string;
    referrer?: string;
    userAgent?: string;
    sessionIdentifier?: string;
    timestamp: Date;
    event?: string;
}

const AnalyticsSchema = new Schema<IAnalytics>({
    path: { type: String, required: true, index: true },
    referrer: { type: String },
    userAgent: { type: String },
    sessionIdentifier: { type: String, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    event: { type: String, default: 'page_view' }
});

const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
