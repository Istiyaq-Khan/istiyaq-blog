import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Linkedin, Youtube, Instagram, Mail, FolderKanban, Cpu } from "lucide-react";

export const metadata = {
    title: "Contact | Istiyaq Khan",
    description: "Get in touch.",
};

const socialLinks = [
    { name: "YouTube", href: "https://www.youtube.com/@istiyaq-khan10", icon: Youtube },
    { name: "GitHub", href: "https://github.com/Istiyaq-Khan", icon: Github },
    { name: "X", href: "https://x.com/istiyaqkhanr", icon: Twitter },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/istiyaq-khan/", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/ist.iyaqkhan/", icon: Instagram },
    { name: "Devpost", href: "https://devpost.com/Istiyaq-Khan", icon: Cpu },
    { name: "Portfolio", href: "https://istiyaq.vercel.app", icon: FolderKanban },
];

export default function ContactPage() {
    return (
        <Section>
            <Container>
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <h1 className="font-heading text-4xl font-bold">Let&apos;s build systems.</h1>
                        <p className="text-lg text-muted-foreground">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-5 w-5" />
                                <a href="mailto:razinkhan3245@gmail.com" className="hover:text-primary">razinkhan3245@gmail.com</a>
                                {/* Placeholder email as none in docs */}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {socialLinks.map((item) => (
                                <Link key={item.name} href={item.href} target="_blank">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <item.icon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Card>
                        <CardContent className="p-8">
                            <form className="space-y-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" placeholder="Your name" />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea id="message" placeholder="How can I help you?" className="min-h-[150px]" />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </Section>
    );
}
