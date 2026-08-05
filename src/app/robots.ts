import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chimjoylogistics.com.ng';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/account/', '/auth/', '/api/', '/debug/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'PerplexityBot',
          'CCBot',
          'Meta-ExternalAgent',
        ],
        allow: '/',
        disallow: ['/admin/', '/account/', '/auth/', '/api/', '/debug/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
