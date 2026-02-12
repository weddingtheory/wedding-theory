'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    published_at: string | null;
    featured_image_key: string | null;
    gallery_images: string[] | null;
    slug: string;
    video_url: string | null;
    meta_description: string | null;
    featured_image_alt: string | null;
    gallery_image_alts: Record<string, string> | null;
}

interface BlogPostClientProps {
    post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const getEmbedUrl = (url: string | null) => {
        if (!url) return '';
        const videoId = url.match(
            /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/
        );
        return videoId
            ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&mute=1&loop=1&playlist=${videoId[1]}`
            : '';
    };

    return (
        <div className='min-h-screen bg-[#f8f5f0]'>
            {/* Hero Section */}
            <div className='relative h-[60vh] lg:h-screen'>
                <Image
                    src={post.featured_image_key || ''}
                    alt={post.featured_image_alt || post.title}
                    fill
                    className='object-cover'
                    priority
                />
                <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70' />

                {/* Back Button */}
                <Link
                    href='/blog'
                    className='absolute top-4 left-4 lg:top-8 lg:left-8 z-10 flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full hover:bg-black/30 transition-all duration-300 text-sm lg:text-base'
                >
                    <IoArrowBack className='w-4 h-4 lg:w-5 lg:h-5' />
                    <span>Back to Blog</span>
                </Link>

                {/* Title Section */}
                <div className='absolute bottom-0 left-0 right-0 p-4 lg:p-16 text-white'>
                    <div className='max-w-4xl mx-auto'>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className='backdrop-blur-md bg-black/30 p-4 lg:p-8 rounded-xl lg:rounded-2xl border border-white/10'
                        >
                            <h1 className='font-serif text-xl lg:text-4xl xl:text-5xl mb-3 lg:mb-6 text-white leading-tight'>
                                {post.title}
                            </h1>
                            <div className='h-0.5 w-12 lg:w-20 bg-white/40' />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='max-w-4xl mx-auto px-4 py-12 lg:py-24'>
                {/* Video Section */}
                {post.video_url && (
                    <div className='mb-12 lg:mb-16 relative aspect-video w-full overflow-hidden rounded-xl'>
                        <iframe
                            src={getEmbedUrl(post.video_url)}
                            title={`Video for ${post.title}`}
                            className='absolute inset-0 w-full h-full'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                    </div>
                )}

                <div className='prose prose-base lg:prose-lg max-w-none 
                    prose-a:text-[#68401b] prose-a:font-medium hover:prose-a:text-[#8b5e2b] prose-a:transition-colors'>
                    {post.content && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
                </div>
            </div>
        </div>
    );
}
