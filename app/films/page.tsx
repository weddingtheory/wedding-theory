import React from 'react';

interface VideoData {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
}

const videoData: VideoData[] = [
  {
    url: 'https://www.youtube.com/watch?v=jcUgRdejFys',
    title: 'Priya & Rohan - "Moments of Forever"',
    description: 'A Magical Celebration of Love and Family Traditions',
  },
  {
    url: 'https://www.youtube.com/watch?v=EEdf1Wt8tX4',
    title: 'Zara & Ali - "Love\'s Sacred Journey"',
    description:
      'An Enchanting Wedding Celebration Blending Modern Romance with Tradition',
  },
  {
    url: 'https://www.youtube.com/watch?v=o2oDhA8qWLQ',
    title: 'Elena & Michael - "Love in Paradise"',
    description: 'A Destination Wedding Film - Sunset Vows in Bali',
  },
  {
    url: 'https://www.youtube.com/watch?v=ZLbq7UGm4CU',
    title: 'Aisha & Omar - "Forever Begins"',
    description: 'An Intimate Nikah Ceremony Filled with Love and Tradition',
  },
];

export default function Films() {
  return (
    <div className='min-h-screen bg-[#f8f5f0]'>
      <main className='px-4 py-12 md:py-16'>
        {/* Hero Section */}
        <div className='max-w-6xl mx-auto mb-20 text-center'>
          <h1 className='text-4xl md:text-6xl font-light mb-8 text-gray-800 font-serif tracking-wide'>
            Wedding Films
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light'>
            Every love story deserves to be told in its most authentic form. We
            craft cinematic experiences that celebrate the beauty of cultural
            traditions and personal connections.
          </p>
        </div>

        {/* Videos Grid */}
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center mb-12'>
            <div className='h-[1px] w-24 bg-gray-300'></div>
            <div className='mx-4 text-rose-400 text-2xl'>♥</div>
            <div className='h-[1px] w-24 bg-gray-300'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
            {videoData.map((video, index) => (
              <div key={index} className='group'>
                <div
                  className='bg-white rounded-xl overflow-hidden shadow-sm 
                           transition-all duration-500 ease-in-out transform hover:-translate-y-2
                           relative isolate
                           before:absolute before:inset-0 before:bg-gradient-to-t 
                           before:from-rose-20/50 before:to-violet-40/50
                           before:opacity-0 before:transition-opacity before:duration-500
                           hover:before:opacity-100 before:-z-10
                           hover:shadow-xl hover:shadow-rose-100/20'
                >
                  <div className='aspect-video relative'>
                    <iframe
                      className='w-full h-full absolute inset-0'
                      src={video.url.replace('watch?v=', 'embed/')}
                      title={video.title}
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-6 md:p-8'>
                    <h3 className='text-xl md:text-2xl font-serif text-gray-800 mb-3 leading-relaxed 
                                 group-hover:text-rose-900 transition-colors duration-300'>
                      {video.title}
                    </h3>
                    <div className='h-[1px] w-16 bg-gray-200 mb-4 
                                  group-hover:bg-rose-200 transition-colors duration-300'></div>
                    <p className='text-gray-600 text-sm md:text-base font-light leading-relaxed
                                group-hover:text-gray-700 transition-colors duration-300'>
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className='max-w-4xl mx-auto mt-24 text-center'>
          <div className='flex items-center justify-center mb-12'>
            <div className='h-[1px] w-16 bg-gray-300'></div>
            <div className='mx-4 text-rose-400 text-2xl'>♥</div>
            <div className='h-[1px] w-16 bg-gray-300'></div>
          </div>
          <p className='text-lg text-gray-600 font-light italic'>
            "Every wedding tells a unique story - let us help you tell yours
            through our lens."
          </p>
        </div>
      </main>
    </div>
  );
} 