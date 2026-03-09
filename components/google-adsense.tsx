"use client";

import { useEffect } from "react";

interface AdSenseProps {
    className?: string;
    style?: React.CSSProperties;
    dataAdSlot: string;
    dataAdFormat?: string;
    dataAdLayout?: string;
    dataFullWidthResponsive?: boolean;
    dataAdClient?: string;
}

export function AdSense({
    className = "",
    style = { display: "block" },
    dataAdSlot,
    dataAdFormat = "auto",
    dataAdLayout,
    dataFullWidthResponsive = true,
    dataAdClient
}: AdSenseProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, []);

    const clientId = dataAdClient || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9280900149424904";

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
