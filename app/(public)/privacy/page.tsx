import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Shield, ArrowLeft, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for Istiyaq Khan Razin's personal technical blog (blog.istiyaq.com). Transparent and privacy-conscious data practices.",
    alternates: {
        canonical: "https://blog.istiyaq.com/privacy",
    },
    openGraph: {
        title: "Privacy Policy | Istiyaq Khan Blog",
        description:
            "Privacy Policy for Istiyaq Khan Razin's personal technical blog. Transparent and privacy-conscious data practices.",
        url: "https://blog.istiyaq.com/privacy",
        type: "website",
    },
};

export default function PrivacyPage() {
    const lastUpdated = "October 6, 2026";

    return (
        <Section className="min-h-screen pt-32 pb-24">
            <Container className="max-w-4xl">
                {/* Back link */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="space-y-4 border-b border-border/60 pb-8 mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        <Shield className="h-3.5 w-3.5" />
                        <span>LEGAL // TRUST_ANCHOR</span>
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        Privacy Policy
                    </h1>
                    <p className="text-sm font-mono text-muted-foreground">
                        Effective date: {lastUpdated}
                    </p>
                </header>

                {/* Content */}
                <div className="space-y-10 text-[#D4D4D8] leading-relaxed text-sm sm:text-base">
                    <section className="space-y-3">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            1. Overview & Philosophy
                        </h2>
                        <p>
                            Welcome to the personal engineering blog of{" "}
                            <strong className="text-foreground font-medium">Istiyaq Khan Razin</strong>{" "}
                            (accessible at{" "}
                            <span className="font-mono text-primary text-xs sm:text-sm">
                                https://blog.istiyaq.com
                            </span>
                            ). This site is dedicated to technical writing, automation workflows, and sharing knowledge.
                        </p>
                        <p>
                            I believe in respectful, minimalist data practices. This blog is not a data-harvesting machine. We only collect the minimal telemetry necessary to operate the site reliably and understand which topics resonate with our readers.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            2. Information We Collect
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground marker:text-primary">
                            <li>
                                <strong className="text-foreground">Anonymous Usage Telemetry:</strong> Aggregated, privacy-friendly metrics such as pages viewed, referring URLs, browser user agents, and rough geographic location (country/city level).
                            </li>
                            <li>
                                <strong className="text-foreground">Voluntary Correspondence:</strong> If you choose to contact me via email or through the contact forms on{" "}
                                <a
                                    href="https://istiyaq.com/contact"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline inline-flex items-center gap-1"
                                >
                                    istiyaq.com/contact <ExternalLink className="h-3 w-3" />
                                </a>
                                , I receive the details you submit (such as name, email address, and message contents).
                            </li>
                            <li>
                                <strong className="text-foreground">No Invasive Profiling:</strong> We do not build personal tracking profiles, sell personal data, or execute cross-site tracking scripts.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            3. Analytics & Telemetry
                        </h2>
                        <p>
                            We employ modern, cookieless analytics tools (such as Vercel Analytics) designed to respect user privacy. These services process aggregated traffic statistics without storing persistent cookies or logging individual IP addresses.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            4. Third-Party Services & Cookies
                        </h2>
                        <p>
                            This website may integrate third-party services that set cookies or utilize web beacons under certain conditions:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground marker:text-primary">
                            <li>
                                <strong className="text-foreground">Google AdSense:</strong> If advertisements are served, Google uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to this or other websites. You may opt out of personalized advertising by visiting{" "}
                                <a
                                    href="https://www.google.com/settings/ads"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline inline-flex items-center gap-1"
                                >
                                    Google Ads Settings <ExternalLink className="h-3 w-3" />
                                </a>
                                .
                            </li>
                            <li>
                                <strong className="text-foreground">Hosting Infrastructure:</strong> Vercel hosts this site and processes network traffic to defend against DDoS attacks and optimize global CDN performance.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            5. External Links
                        </h2>
                        <p>
                            Articles and project write-ups frequently link to external third-party websites, GitHub repositories, documentation portals, and community resources. We are not responsible for the privacy practices, content, or data policies of external sites.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            6. Your Rights
                        </h2>
                        <p>
                            Depending on your jurisdiction (such as under the GDPR, CCPA, or UK DPA), you have rights regarding your personal data, including the right to request access, rectification, or deletion of any personal communications sent to us.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-border/60 pt-8">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            7. Contact & Inquiries
                        </h2>
                        <p>
                            If you have questions, concerns, or requests regarding this Privacy Policy, please reach out directly:
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://istiyaq.com/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:border-primary/50 hover:bg-surface-elevated transition-all"
                            >
                                <ExternalLink className="h-4 w-4 text-primary" />
                                <span>Contact Form (istiyaq.com/contact)</span>
                            </a>
                            <a
                                href="https://github.com/Istiyaq-Khan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:border-primary/50 hover:bg-surface-elevated transition-all"
                            >
                                <Mail className="h-4 w-4 text-[#A3E635]" />
                                <span>GitHub: @Istiyaq-Khan</span>
                            </a>
                        </div>
                    </section>
                </div>
            </Container>
        </Section>
    );
}
