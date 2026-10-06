import Link from "next/link";
import { Home, BookOpen, Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <>
            <head>
                <title>404 - Page Not Found | Istiyaq Khan Blog</title>
                <meta name="robots" content="noindex, nofollow" />
            </head>
            <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-16 text-center">
                <div className="relative mx-auto max-w-md space-y-6">
                    {/* Status Pill */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        <span>404 // RESOURCE_NOT_FOUND</span>
                    </div>

                    {/* Headline & Description */}
                    <div className="space-y-2">
                        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                            Lost in the System
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            The route you requested could not be located on this server. It may have been relocated, deleted, or entered incorrectly.
                        </p>
                    </div>

                    {/* Quick Recovery Navigation Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <Link href="/" className="w-full sm:w-auto">
                            <Button className="w-full gap-2 font-medium">
                                <Home className="h-4 w-4" />
                                <span>Return Home</span>
                            </Button>
                        </Link>
                        <Link href="/blog" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full gap-2 border-border hover:border-border-hover text-foreground">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span>All Articles</span>
                            </Button>
                        </Link>
                        <Link href="/sitemap.xml" className="w-full sm:w-auto">
                            <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                                <Compass className="h-4 w-4" />
                                <span>Sitemap</span>
                            </Button>
                        </Link>
                    </div>

                    {/* Helpful Context */}
                    <div className="pt-6 border-t border-border/40">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Back to blog.istiyaq.com</span>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
