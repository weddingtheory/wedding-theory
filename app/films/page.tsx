import React from 'react';

const videoLinks = [
  'https://www.youtube.com/watch?v=0ho3VbXBI6Y',
  'https://www.youtube.com/watch?v=xZK7cI7AHZg',
  'https://www.youtube.com/watch?v=VMXy2E49qa0',
  'https://www.youtube.com/watch?v=_hX3IsdmttU',
  'https://www.youtube.com/watch?v=o2oDhA8qWLQ',
  'https://www.youtube.com/watch?v=ZLbq7UGm4CU'
];

export default function Films() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-4 md:py-8'>
        <div className='w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {videoLinks.map((link, index) => (
            <div
              key={index}
              className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'
            >
              <iframe
                className='w-full h-64 md:h-80'
                src={link.replace('watch?v=', 'embed/')}
                title={`Video ${index + 1}`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 