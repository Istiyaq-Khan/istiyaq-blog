import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://istiyaq-blog.vercel.app"),
  title: {
    default: "Istiyaq Khan Razin | Personal Blog & AI Workflow Insights",
    template: "%s | Istiyaq Khan Blog",
  },
  description: "The personal blog of Istiyaq Khan Razin. Exploring AI workflow automation, content systems engineering, python scripts, n8n tutorials, and the journey of building tools for creators.",
  keywords: [
    "Istiyaq Khan Razin Blog",
    "Istiyaq Khan Razin",
    "personal blog",
    "tech blog",
    "AI workflow automation",
    "n8n tutorials",
    "python automation scripts",
    "creator engineering",
    "system architecture",
    "software development blog",
    "content creation tools",
    "Sylhet developer",
  ],
  authors: [{ name: "Istiyaq Khan Razin", url: "https://istiyaq-blog.vercel.app" }],
  creator: "Istiyaq Khan Razin",
  publisher: "Istiyaq Khan Razin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://istiyaq-blog.vercel.app",
    siteName: "Istiyaq Khan Razin - Personal Blog",
    title: "Istiyaq Khan Razin | Personal Blog & AI Workflow Insights",
    description: "Read my latest articles on Python, n8n, generative AI, and building automated content systems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Istiyaq Khan - Personal Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Istiyaq Khan Razin | Personal Blog & AI Workflow Insights",
    description: "Read my latest articles on Python, n8n, generative AI, and building automated content systems.",
    creator: "@istiyaqkhanr",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "r7320kg3zhgfCc-dBs17Z5HYl2vblzN0-f5aIWVVp7M",
    yandex: "your-yandex-verification-code",
    other: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? {
      "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
    } : {}
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://istiyaq-blog.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`\${spaceGrotesk.variable} \${inter.variable} antialiased bg-background text-foreground`}
      >
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=\${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
        <Providers>
          <AnalyticsTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
