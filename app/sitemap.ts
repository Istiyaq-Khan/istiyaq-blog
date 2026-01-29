import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/actions/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://istiyaq-blog.vercel.app';

    // Static routes
    const routes = [
        '',
        '/blog',
        '/about',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
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
