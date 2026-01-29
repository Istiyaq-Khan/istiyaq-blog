import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SystemBootLoader } from "@/components/gsap/boot-loader";

export const metadata: Metadata = {
    title: "Home | Istiyaq Khan - AI Workflow Engineer & Creator",
    description: "Building content systems, AI workflows, and creative automation. I help creators publish faster, smarter, and consistently through automated pipelines using n8n, Python, and Generative AI.",
    openGraph: {
        title: "Istiyaq Khan - Building Content Systems & AI Workflows",
        description: "I design systems that help creators publish faster, smarter, and consistently. Specializing in n8n automation, Python workflows, and creative content systems.",
        url: "https://istiyaq-blog.vercel.app",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Istiyaq Khan - Building Content Systems & AI Workflows",
        description: "I design systems that help creators publish faster, smarter, and consistently.",
        creator: "@istiyaqkhanr",
    },
};

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
