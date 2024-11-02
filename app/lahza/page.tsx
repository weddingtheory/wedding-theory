import Image from 'next/image';
import Link from 'next/link';

export default function Lahza() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow'>
        {/* Hero Section - Enhanced with better overlay and typography */}
        <section className='relative h-[70vh] md:h-[90vh] w-full'>
          <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10' />
          <Image
            src='https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728'
            alt='LAHZA by Wedding Theory'
            fill
            className='object-cover'
            priority
            unoptimized
          />
          <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-white'>
            <h1 className='font-serif text-4xl md:text-8xl text-center tracking-[0.2em]'>
              L A H Z A
            </h1>
            <p className='font-sans text-xl md:text-2xl mt-6 text-center font-light tracking-wider'>
              Signature Weddings by Wedding Theory
            </p>
          </div>
        </section>

        {/* Elegant Introduction */}
        <section className='max-w-4xl mx-auto px-4 py-16 text-center'>
          <p className='font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed'>
            &ldquo;Every moment tells a story, every frame captures an
            emotion&rdquo;
          </p>
          <div className='w-24 h-[1px] bg-gray-400 mx-auto my-8'></div>
          <p className='font-sans text-gray-700 leading-relaxed max-w-2xl mx-auto'>
            LAHZA represents the pinnacle of wedding documentation, where
            artistry meets technical excellence to create timeless memories of
            your special day.
          </p>
        </section>

        {/* Visual Artistry Section */}
        <section className='bg-white py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <h2 className='font-serif text-4xl md:text-5xl text-center text-gray-800 mb-16'>
              Visual Artistry
            </h2>
            <div className='flex flex-col gap-16'>
              {/* Candid Photography */}
              <div className='group bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full'>
                <div className='flex flex-col md:flex-row gap-10 items-center'>
                  <div className='flex-1 space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 rounded-full bg-[#412e0d] flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 text-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                      </div>
                      <h3 className='font-serif text-3xl text-gray-800'>
                        Candid Photography
                      </h3>
                    </div>
                    <p className='font-sans text-gray-700 leading-relaxed text-lg'>
                      Relive an authentic moment with our candid photography!
                      Our team of 2-3 technical experts brings hands-on
                      expertise, a sharp eye for detail, and swift presence of
                      mind to capture every precious moment using the
                      photojournalistic method.
                    </p>
                  </div>
                  <div className='flex-1 w-full'>
                    <div className='aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md'>
                      <Image
                        src='https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg?updatedAt=1730140124794'
                        alt='Candid Photography'
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Film */}
              <div className='group bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full'>
                <div className='flex flex-col md:flex-row-reverse gap-10 items-center'>
                  <div className='flex-1 space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 rounded-full bg-[#412e0d] flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 text-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <h3 className='font-serif text-3xl text-gray-800'>
                        Film
                      </h3>
                    </div>
                    <p className='font-sans text-gray-700 leading-relaxed text-lg'>
                      Imagine your love story as the most romantic movie
                      you&apos;ve ever seen! With 10+ years of industry
                      experience, our film experts create cinematic masterpieces
                      that capture the essence of your special day.
                    </p>
                  </div>
                  <div className='flex-1 w-full'>
                    <div className='aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md'>
                      <iframe
                        src='https://www.youtube.com/embed/flUyMnitCj4'
                        className='absolute inset-0 w-full h-full'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className='py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <h2 className='font-serif text-4xl md:text-5xl text-center text-gray-800 mb-16'>
              Signature Elements
            </h2>
            <div className='flex flex-col gap-16'>
              {/* Music */}
              <div className='group bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full'>
                <div className='flex flex-col md:flex-row gap-10 items-center'>
                  <div className='flex-1 space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 rounded-full bg-[#412e0d] flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 text-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
                          />
                        </svg>
                      </div>
                      <h3 className='font-serif text-3xl text-gray-800'>
                        Music
                      </h3>
                    </div>
                    <p className='font-sans text-gray-700 leading-relaxed text-lg'>
                      Your wedding film deserves a unique soundtrack. We
                      collaborate with independent artists to compose an
                      original track for your fairy tale story.
                    </p>
                  </div>
                  <div className='flex-1 w-full'>
                    <iframe
                      style={{ borderRadius: '12px' }}
                      src='https://open.spotify.com/embed/track/4AM44o1sPhmoWHjt7GmpSl?utm_source=generator&theme=0'
                      width='100%'
                      height='352'
                      frameBorder='0'
                      allowFullScreen
                      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>

              {/* Print */}
              <div className='group bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full'>
                <div className='flex flex-col md:flex-row-reverse gap-10 items-center'>
                  <div className='flex-1 space-y-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 rounded-full bg-[#412e0d] flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 text-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <h3 className='font-serif text-3xl text-gray-800'>
                        Print
                      </h3>
                    </div>
                    <p className='font-sans text-gray-700 leading-relaxed text-lg'>
                      Let us help you create a timeless wedding album. Our
                      in-house experts craft custom-made albums with
                      professionally designed templates ensuring your memories
                      are preserved in elegant style.
                    </p>
                  </div>
                  <div className='flex-1 w-full'>
                    <div className='aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md'>
                      <Image
                        src='https://cdn0.weddingwire.in/article/7121/3_2/1280/jpg/91217-indian-wedding-album-design-mili-ghosh-lead.jpeg'
                        alt='Wedding Album'
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updated CTA Section */}
        <section className='relative py-24 md:py-32 px-4 bg-[#f8f5f0]'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='font-serif text-4xl md:text-5xl mb-6 text-gray-800'>
              Let&apos;s Create Your Story Together
            </h2>
            <p className='font-sans text-lg md:text-xl mb-12 leading-relaxed text-gray-700'>
              Every love story is unique. Let us help you preserve yours in the
              most beautiful way possible.
            </p>
            {/* <Link
              href='/contact'
              className='inline-block bg-[#412e0d] text-white px-8 py-4 rounded-full
                font-sans text-lg transition-all duration-300
                hover:bg-gray-800 hover:shadow-lg '
            >
              Get in Touch
            </Link> */}
            <Link
              href='/contact'
              className='inline-block px-10 py-3.5 text-sm md:text-base 
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
          </div>
        </section>
      </main>
    </div>
  );
}
