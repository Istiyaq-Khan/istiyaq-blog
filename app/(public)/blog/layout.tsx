import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    alternates: {
        canonical: "https://blog.istiyaq.com/blog",
    },
};

export const revalidate = 60;

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
