import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { Suspense } from 'react';
import { Metadata } from 'next';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published_at: string | null;
  featured_image_key: string | null;
  gallery_images: string[] | null;
  location: string | null;
  wedding_date: string | null;
  slug: string;
  video_url: string | null;
  meta_description: string | null;
  featured_image_alt: string | null;
  gallery_image_alts: Record<string, string> | null;
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(
        'id, title, content, published_at, featured_image_key, gallery_images, location, wedding_date, slug, video_url, meta_description, featured_image_alt, gallery_image_alts'
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      return null;
    }

    return post as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description:
      post.meta_description ||
      `Read about ${post.title} - A beautiful wedding story`,
    openGraph: {
      title: post.title,
      description:
        post.meta_description ||
        `Read about ${post.title} - A beautiful wedding story`,
      images: post.featured_image_key
        ? [
            {
              url: post.featured_image_key,
              alt: post.featured_image_alt || post.title,
            },
          ]
        : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description:
        post.meta_description ||
        `Read about ${post.title} - A beautiful wedding story`,
      images: post.featured_image_key ? [post.featured_image_key] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#68401b]"></div>
      </div>
    }>
      <BlogPostClient post={post} />
    </Suspense>
  );
} 