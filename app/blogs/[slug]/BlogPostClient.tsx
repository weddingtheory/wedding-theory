'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack, IoLocationOutline, IoCalendarClearOutline, IoGridOutline, IoImagesOutline } from 'react-icons/io5';
import ImageLightbox from '../../components/ImageLightbox';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

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

  const getImageAlt = (imageUrl: string, index: number) => {
    if (post.gallery_image_alts && post.gallery_image_alts[imageUrl]) {
      return post.gallery_image_alts[imageUrl];
    }
    return `Gallery image ${index + 1}`;
  };

  const formattedLocation = formatLocation(post.location);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
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

        {/* Back Button with improved contrast */}
        <Link
          href='/blogs'
          className='absolute top-4 left-4 lg:top-8 lg:left-8 z-10 flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full hover:bg-black/30 transition-all duration-300 text-sm lg:text-base'
        >
          <IoArrowBack className='w-4 h-4 lg:w-5 lg:h-5' />
          <span>Back to Blogs</span>
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

        <div className='prose prose-base lg:prose-lg max-w-none'>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Gallery Section */}
        {post.gallery_images && post.gallery_images.length > 0 && (
          <div className='mt-12 lg:mt-16'>
            <div className='flex justify-between items-center mb-6 lg:mb-8'>
              <h2 className='font-serif text-2xl lg:text-3xl text-gray-800'>
                Gallery
              </h2>
              <div className='flex gap-2'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 lg:p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-[#68401b] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label='Grid view'
                >
                  <IoGridOutline className='w-4 h-4 lg:w-5 lg:h-5' />
                </button>
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`p-1.5 lg:p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'carousel'
                      ? 'bg-[#68401b] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label='Carousel view'
                >
                  <IoImagesOutline className='w-4 h-4 lg:w-5 lg:h-5' />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              // Grid View with improved image captions
              <div className='space-y-4 lg:space-y-8'>
                {post.gallery_images.map((image, index) => (
                  <motion.div
                    key={image}
                    className='relative w-full cursor-pointer group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleImageClick(index)}
                  >
                    <div className='relative aspect-[3/2] w-full overflow-hidden rounded-lg'>
                      <Image
                        src={image}
                        alt={getImageAlt(image, index)}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                      {/* Image overlay with number */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='absolute bottom-3 left-3 lg:bottom-4 lg:left-4 text-white text-xs lg:text-sm bg-black/30 px-2 py-0.5 lg:px-3 lg:py-1 rounded-full backdrop-blur-sm'>
                          Image {index + 1} of{' '}
                          {post.gallery_images?.length || 0}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Carousel View with improved thumbnails
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4'>
                {post.gallery_images.map((image, index) => (
                  <motion.div
                    key={image}
                    className='relative aspect-square cursor-pointer group'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={image}
                      alt={getImageAlt(image, index)}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    {/* Thumbnail overlay with number */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='absolute bottom-2 left-2 text-white text-[10px] lg:text-xs bg-black/30 px-1.5 py-0.5 lg:px-2 lg:py-0.5 rounded-full backdrop-blur-sm'>
                        {index + 1} / {post.gallery_images?.length || 0}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Lightbox */}
      {post.gallery_images && (
        <ImageLightbox
          images={post.gallery_images}
          imageAlts={post.gallery_images.map((image, index) =>
            getImageAlt(image, index)
          )}
          initialImageIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onImageChange={setSelectedImageIndex}
        />
      )}
    </div>
  );
} 