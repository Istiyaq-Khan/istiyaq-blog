// Image import removed (unused)
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ScrollReveal } from "@/components/gsap/scroll-reveal";

export const metadata = {
    title: "About | Istiyaq Khan",
    description: "Creator, Engineer, and System Builder.",
};

export default function AboutPage() {
    return (
        <Container>
            <Section>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                    {/* Portrait */}
                    <ScrollReveal>
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
                            {/* Placeholder for portrait. PRD says 'Portrait' */}
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                Portrait Image (Istiyaq Khan)
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Story */}
                    <div className="space-y-8">
                        <ScrollReveal delay={0.2}>
                            <h1 className="font-heading text-4xl font-bold">
                                Hi, I&apos;m Istiyaq.
                            </h1>
                            <h2 className="text-xl text-primary font-medium">
                                Creator × Engineer × System Builder
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="prose prose-invert prose-lg text-muted-foreground">
                                <p>
                                    I build digital brains for creators. My work sits at the intersection of technical engineering and creative storytelling.
                                </p>
                                <p>
                                    Most creators struggle with consistency because they rely on motivation. I rely on systems.
                                </p>
                                <p>
                                    I help YouTubers and solopreneurs automate their workflows so they can focus on what they do best: creating.
                                </p>

                                <h3 className="text-foreground font-heading font-bold text-xl mt-8 mb-4">The Journey</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Student:</strong> Learning the fundamentals of code and design.</li>
                                    <li><strong>Builder:</strong> Shipping projects and learning in public.</li>
                                    <li><strong>Founder:</strong> Building IKK Studio to help others scale.</li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </Section>
        </Container>
    );
}
