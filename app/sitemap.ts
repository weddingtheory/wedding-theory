import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.weddingtheory.co.in';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString();

    // Fetch all published blog posts
    const { data: blogPosts } = await supabase
        .from('blogs')
        .select('slug, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    // Fetch all published wedding journal entries
    const { data: journalPosts } = await supabase
        .from('blog_posts')
        .select('slug, published_at, wedding_date')
        .eq('status', 'published')
        .order('wedding_date', { ascending: false });

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/weddings`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/films`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/lahza`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/wedding_journal`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/testimonial`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    const blogPostPages: MetadataRoute.Sitemap = (blogPosts || []).map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at).toISOString() : now,
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    const journalPostPages: MetadataRoute.Sitemap = (journalPosts || []).map((post) => ({
        url: `${BASE_URL}/wedding_journal/${post.slug}`,
        lastModified: post.published_at
            ? new Date(post.published_at).toISOString()
            : post.wedding_date
            ? new Date(post.wedding_date).toISOString()
            : now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogPostPages, ...journalPostPages];
}
