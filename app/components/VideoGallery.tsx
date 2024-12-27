import React from 'react';

const videoData = [
  {
    title: 'Wedding Theory Cinematic Film - Couple Story 1',
    videoUrl: 'https://www.youtube.com/embed/CVOfQ_54Br8',
  },
  {
    title: 'Wedding Theory Cinematic Film - Couple Story 2',
    videoUrl: 'https://www.youtube.com/embed/0Ky81YMuR7k',
  },
  {
    title: 'Wedding Theory Cinematic Film - Couple Story 3',
    videoUrl: 'https://www.youtube.com/embed/wF5mXOtQM2U',
  },
  {
    title: 'Wedding Theory Cinematic Film - Couple Story 4',
    videoUrl: 'https://www.youtube.com/embed/j1V-sG-iPKk',
  },
];

export default function VideoGallery() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8'>
      {videoData.map((video, index) => (
        <div key={index} className='relative overflow-hidden bg-gray-200'>
          <iframe
            title={video.title}
            src={`${video.videoUrl}?cc_load_policy=1&cc_lang_pref=en`}
            className='w-full h-64 md:h-80'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
} 