'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import ImageLightbox from '../components/ImageLightbox'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface WeddingStory {
  id: string
  couple_names: string
  location: string | null
  featured_image_key: string | null
  gallery_images: string[] | null
  wedding_date: string | null
}

export default function WeddingsPage() {
  const [weddingStories, setWeddingStories] = useState<WeddingStory[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeddings() {
      try {
        const { data, error } = await supabase
          .from('weddings')
          .select('*')
          .eq('status', 'published')
          .order('wedding_date', { ascending: false });

        if (error) throw error;
        console.log('Fetched weddings:', data); // Debug log
        setWeddingStories(data || []);
      } catch (error) {
        console.error('Error fetching weddings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeddings();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedStoryIndex(index)
    setCurrentImageIndex(0)
    setLightboxOpen(true)
  }

  // Get the gallery images for the selected story
  const selectedStoryGallery = weddingStories[selectedStoryIndex]?.gallery_images || [];

  // Handler for when user changes image in lightbox
  const handleImageChange = useCallback((newIndex: number) => {
    setCurrentImageIndex(newIndex);
  }, []);

  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section with split design */}
      <section className='relative h-screen mb-16 flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 h-1/2 md:h-full relative'>
          <Image
            src='https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg?updatedAt=1730140142519'
            alt='Wedding Hero Left'
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='w-full md:w-1/2 h-1/2 md:h-full bg-[#f8f5f0] flex items-center justify-center p-8'>
          <div className='text-center max-w-xl'>
            <h1 className='text-4xl md:text-6xl text-gray-900 mb-6'>
              Wedding Gallery
            </h1>
            <p className='text-lg md:text-xl text-gray-600 leading-relaxed'>
              A collection of beautiful moments and cherished memories, where
              each photograph tells a unique story of love and celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Wedding Stories Grid */}
      <section className='max-w-7xl mx-auto px-4 py-8'>
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800'></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
            {weddingStories.map((story, index) => (
              <div
                key={story.id}
                className='group wedding-story-card cursor-pointer'
                onClick={() => openLightbox(index)}
              >
                <div className='space-y-4'>
                  <div className='aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white shadow-lg'>
                    <div className='relative w-full h-full transform hover:scale-105 transition-transform duration-500'>
                      {story.featured_image_key ? (
                        <Image
                          src={story.featured_image_key}
                          alt={story.couple_names}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className='object-cover'
                          quality={90}
                          priority={index < 3}
                        />
                      ) : (
                        <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                          <p className='text-gray-400'>No image available</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='text-center space-y-2 px-2'>
                    <h3 className='text-xl text-gray-900 font-medium tracking-wide'>
                      {story.couple_names}
                    </h3>
                    <div className='flex items-center justify-center gap-4'>
                      {story.location && (
                        <div className='flex items-center space-x-2'>
                          <svg
                            className='w-4 h-4 text-gray-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                          <p className='text-sm text-gray-600'>{story.location}</p>
                        </div>
                      )}
                      {story.wedding_date && (
                        <div className='flex items-center space-x-2'>
                          <svg
                            className='w-4 h-4 text-gray-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          <p className='text-sm text-gray-600'>
                            {format(new Date(story.wedding_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={selectedStoryGallery}
        initialImageIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onImageChange={handleImageChange}
      />
    </main>
  );
}
