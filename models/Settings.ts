import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
    siteName: string;
    siteDescription: string;
    socials: {
        twitter?: string;
        github?: string;
        linkedin?: string;
        youtube?: string;
    };
    maintenanceMode: boolean;
}

const SettingsSchema = new Schema<ISettings>({
    siteName: { type: String, default: "Istiyaq's Blog" },
    siteDescription: { type: String, default: "A personal blog about tech and automation." },
    socials: {
        twitter: String,
        github: String,
        linkedin: String,
        youtube: String,
    },
    maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
