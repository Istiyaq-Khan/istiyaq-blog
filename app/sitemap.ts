import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://istiyaq.com'; // Replace with actual domain

    // Static routes
    const routes = [
        '',
        '/blog',
        '/about',
        '/uses',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In a real app, we would fetch blog posts here and add them
    // const posts = await getPosts();
    // const postRoutes = posts.map(...)

    return [...routes];
}
