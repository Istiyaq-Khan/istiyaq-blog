"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Exclude admin panel and api routes from tracking
        if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

        const trackPageview = async () => {
            try {
                await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: pathname,
                        referrer: document.referrer,
                        event: 'page_view'
                    }),
                });
            } catch (error) {
                // Silently fail if ad-blockers block it
            }
        };

        const timer = setTimeout(trackPageview, 500);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
