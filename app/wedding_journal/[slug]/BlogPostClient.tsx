'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack, IoLocationOutline, IoCalendarClearOutline } from 'react-icons/io5';

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

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const formatLocation = (location: string | null) => {
    if (!location) return null;
    return location.replace(/^\/+|\/+$/g, '').trim();
  };

  const getEmbedUrl = (url: string | null) => {
    if (!url) return '';
    const videoId = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/
    );
    return videoId
      ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&mute=1&loop=1&playlist=${videoId[1]}`
      : '';
  };

  const formattedLocation = formatLocation(post.location);

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

        {/* Back Button with improved contrast */}
        <Link
          href='/wedding_journal'
          className='absolute top-4 left-4 lg:top-8 lg:left-8 z-10 flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full hover:bg-black/30 transition-all duration-300 text-sm lg:text-base'
        >
          <IoArrowBack className='w-4 h-4 lg:w-5 lg:h-5' />
          <span>Back to Wedding Journal</span>
        </Link>

        {/* Title Section with improved readability */}
        <div className='absolute bottom-0 left-0 right-0 p-4 lg:p-16 text-white'>
          <div className='max-w-4xl mx-auto'>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className='backdrop-blur-md bg-black/30 p-4 lg:p-8 rounded-xl lg:rounded-2xl border border-white/10'
            >
              <div className='flex flex-wrap gap-2 lg:gap-4 mb-3 lg:mb-4'>
                {post.wedding_date && (
                  <div className='flex items-center gap-1.5 lg:gap-2 text-white/90 text-xs lg:text-sm bg-black/20 px-2 py-0.5 lg:px-3 lg:py-1 rounded-full'>
                    <IoCalendarClearOutline className='w-3 h-3 lg:w-4 lg:h-4' />
                    <span>
                      {new Date(post.wedding_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {formattedLocation && (
                  <div className='flex items-center gap-1.5 lg:gap-2 text-white/90 text-xs lg:text-sm bg-black/20 px-2 py-0.5 lg:px-3 lg:py-1 rounded-full'>
                    <IoLocationOutline className='w-3 h-3 lg:w-4 lg:h-4' />
                    <span>{formattedLocation}</span>
                  </div>
                )}
              </div>
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
              title={`Wedding video for ${post.title}`}
              className='absolute inset-0 w-full h-full'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        )}

        <div className='prose prose-base lg:prose-lg max-w-none 
          prose-a:text-[#68401b] prose-a:font-medium hover:prose-a:text-[#8b5e2b] prose-a:transition-colors'>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}
