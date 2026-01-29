import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { Container } from "./container";

const socialLinks = [
    { name: "YouTube", href: "https://www.youtube.com/@istiyaq-khan10", icon: Youtube },
    { name: "GitHub", href: "https://github.com/Istiyaq-Khan", icon: Github },
    { name: "X", href: "https://x.com/istiyaqkhanr", icon: Twitter },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/istiyaq-khan/", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/ist.iyaqkhan/", icon: Instagram },
];

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background py-6 md:py-0">
            <Container>
                <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <Link
                            href="/"
                            className="font-medium underline underline-offset-4 hover:text-primary"
                        >
                            Istiyaq Khan
                        </Link>
                        . The source code is available on{" "}
                        <Link
                            href="https://github.com/Istiyaq-Khan"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-primary"
                        >
                            GitHub
                        </Link>
                        .
                    </p>
                    <div className="flex items-center gap-4">
                        {socialLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="sr-only">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
