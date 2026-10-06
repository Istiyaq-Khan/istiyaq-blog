import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/actions/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://blog.istiyaq.com';

    // Static routes
    const routes = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
    ].map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // Fetch blog posts and add them to sitemap
    try {
        const { posts } = await getPosts(1, 100, { status: 'published' });

        const postRoutes = posts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        return [...routes, ...postRoutes];
    } catch (error) {
        console.error('Error fetching posts for sitemap:', error);
        return routes; // Return static routes if blog posts fail to load
    }
}
