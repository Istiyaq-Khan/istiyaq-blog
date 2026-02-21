import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user || (session.user as any).role !== "admin") {
        redirect("/auth/signin");
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/30">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
