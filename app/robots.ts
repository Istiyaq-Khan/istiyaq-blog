import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Prohibit admin crawling
        },
        sitemap: 'https://istiyaq.com/sitemap.xml', // Replace with actual domain
    };
}
