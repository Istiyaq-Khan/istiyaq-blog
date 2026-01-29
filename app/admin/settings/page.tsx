import { getSettings } from "@/lib/actions/blog";
import SettingsForm from "./settings-form";

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="space-y-6">
            <h1 className="font-heading text-3xl font-bold">Site Settings</h1>
            <SettingsForm initialData={settings} />
        </div>
    );
}
