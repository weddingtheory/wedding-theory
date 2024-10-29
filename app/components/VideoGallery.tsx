import React from 'react';

const videoData = [
  {
    
    videoUrl: 'https://www.youtube.com/embed/CVOfQ_54Br8',
  },
  {
    videoUrl: 'https://www.youtube.com/embed/0Ky81YMuR7k',
  },
  {
    videoUrl: 'https://www.youtube.com/embed/wF5mXOtQM2U',
  },
  {
    videoUrl: 'https://www.youtube.com/embed/j1V-sG-iPKk',
  },
];

export default function VideoGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8">
      {videoData.map((video, index) => (
        <div key={index} className="relative overflow-hidden bg-gray-200">
          <iframe
            title={`Wedding Theory Film ${index + 1}`}
            src={video.videoUrl.replace('watch?v=', 'embed/')}
            className='w-full h-64 md:h-80'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
} 