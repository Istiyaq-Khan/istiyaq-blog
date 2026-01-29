import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SystemBootLoader } from "@/components/gsap/boot-loader";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <SystemBootLoader />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
