import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
    default: "Istiyaq Khan Razin | AI Workflow Engineer & Content Systems Architect",
    template: "%s | Istiyaq Khan Razin",
  },
  description: "Istiyaq Khan Razin is a Creator-Engineer specializing in AI workflow automation, content systems, and creative automation. Founder of IKK Studio, building automated content pipelines for YouTubers and solopreneurs using Python, n8n, and Generative AI.",
  keywords: [
    "Istiyaq Khan Razin",
    "AI workflow automation",
    "content systems",
    "n8n workflows",
    "creator engineer",
    "IKK Studio",
    "YouTube automation",
    "marketing automation",
    "Python automation",
    "generative AI",
    "content repurposing",
    "video editing automation",
    "solopreneur tools",
    "Sylhet developer",
    "Bangladesh tech",
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
    siteName: "Istiyaq Khan Razin",
    title: "Istiyaq Khan Razin | AI Workflow Engineer & Content Systems Architect",
    description: "Building AI-powered content systems and workflow automation for creators. Expert in n8n, Python, and creative automation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Istiyaq Khan - Creator × Engineer × System Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Istiyaq Khan Razin | AI Workflow Engineer & Content Systems Architect",
    description: "Building AI-powered content systems and workflow automation for creators. Expert in n8n, Python, and creative automation.",
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
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
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
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
