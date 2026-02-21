"use client";

import { useEffect } from "react";

interface AdSenseProps {
    className?: string;
    style?: React.CSSProperties;
    dataAdSlot: string;
    dataAdFormat?: string;
    dataAdLayout?: string;
    dataFullWidthResponsive?: boolean;
}

export function AdSense({
    className = "",
    style = { display: "block" },
    dataAdSlot,
    dataAdFormat = "auto",
    dataAdLayout,
    dataFullWidthResponsive = true
}: AdSenseProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, []);

    if (process.env.NODE_ENV !== "production") {
        return (
            <div className={`bg-muted/30 border border-dashed border-border flex items-center justify-center text-muted-foreground py-8 text-sm rounded my-8 ${className}`} style={style}>
                AdSense Placeholder (AdSlot: {dataAdSlot})
            </div>
        );
    }

    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

    if (!clientId) return null;

    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={style}
            data-ad-client={clientId}
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            {...(dataAdLayout ? { "data-ad-layout": dataAdLayout } : {})}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
    );
}
