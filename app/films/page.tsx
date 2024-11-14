'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface VideoData {
  url: string;
  title: string;
  description: string;
  location?: string;
  management?: string;
}

const videoData: VideoData[] = [
  {
    url: 'https://www.youtube.com/watch?v=o2oDhA8qWLQ',
    title: 'Jiya & Rahul',
    description: 'A Magical Celebration of Love in Paradise',
    location: 'Ayana Resort, Bali',
    management: 'Eventures Asia',
  },
  {
    url: 'https://www.youtube.com/watch?v=EEdf1Wt8tX4',
    title: 'Rakhi & Mitra',
    description: 'An Enchanting Wedding Celebration',
    location: 'Suryagarh, Jaisalmer',
    management: 'KKings Events',
  },
  // ... other videos
];

export default function Films() {
  const [scale, setScale] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 640 ? 2.8 : 2);
    };

    // Set initial scale
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='min-h-screen bg-[#f8f5f0]'>
      {/* Hero Video Section */}
      <section className='relative h-[40vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden'>
        <div className='absolute inset-0 w-full h-full'>
          <iframe
            src='https://www.youtube.com/embed/o2oDhA8qWLQ?start=10&autoplay=1&mute=1&controls=0&loop=1&playlist=o2oDhA8qWLQ&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3'
            className='absolute w-full h-full object-cover scale-[2] sm:scale-125'
            style={{
              pointerEvents: 'none',
              border: 'none',
              outline: 'none',
              transform: `translate(-50%, -50%) scale(${scale})`,
              top: '50%',
              left: '50%',
            }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60'></div>
        </div>

        <div className='relative z-10 h-full flex items-center justify-center text-center text-white px-4'>
          <div>
            <h1 className='font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 md:mb-6 tracking-wide font-light'>
              Wedding Films
            </h1>
            <p className='text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wider opacity-90'>
              Turning weddings into the rom-coms they are
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className='py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-[#f8f5f0]'>
        {videoData.map((video, index) => (
          <div
            key={index}
            className={`max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-24 flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-4 sm:gap-6 md:gap-8 items-center`}
          >
            {/* Video */}
            <div
              className='w-full md:w-2/3 relative aspect-video overflow-hidden 
                          rounded-lg md:rounded-xl
                          shadow-[0_4px_20px_rgba(0,0,0,0.08)] group'
            >
              <iframe
                className='w-full h-full absolute inset-0 transition-transform duration-700 
                          group-hover:scale-105'
                style={{ border: 'none' }}
                src={`${video.url.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${video.url.split('v=')[1]}`}
                title={video.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>

            {/* Content */}
            <div className='w-full md:w-1/3 text-center md:text-left pt-4 sm:pt-6 md:pt-0 px-2 sm:px-0'>
              <h2 className='font-serif text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 md:mb-4 tracking-wide font-light'>
                {video.title}
              </h2>
              <div className='w-12 md:w-16 h-[1px] bg-[#D4B08C] mx-auto md:mx-0 mb-2 sm:mb-3 md:mb-4'></div>
              <p className='text-gray-600 mb-2 sm:mb-3 md:mb-4 font-light text-sm sm:text-base'>
                {video.description}
              </p>
              {video.location && (
                <p className='text-xs sm:text-sm text-gray-500 font-light mb-0.5'>
                  Location - {video.location}
                </p>
              )}
              {video.management && (
                <p className='text-xs sm:text-sm text-gray-500 font-light'>
                  Management by {video.management}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Contact CTA */}
      <section className='py-16 md:py-20 text-center bg-[#fcfaf7]'>
        <h3 className='font-serif text-2xl sm:text-3xl md:text-4xl mb-6 font-light'>
          Ready to tell your story?
        </h3>
        <Link
          href='/contact'
          className='inline-block px-8 sm:px-10 py-3 sm:py-3.5 text-sm md:text-base 
                    bg-[#68401b] hover:bg-[#5e4429] 
                    text-white font-medium 
                    rounded-full border border-[#D4B08C]
                    transition-all duration-300 ease-in-out
                    shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                    hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                    hover:transform hover:scale-105
                    tracking-wide'
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
} 