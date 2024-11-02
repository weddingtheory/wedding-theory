import AnimatedSection from './components/AnimatedSection';
import Carousel from './components/Carousel';
import ImageCarousel from './components/ImageCarousel';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedStats from './components/AnimatedStats';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-4 md:py-8'>
        <div className='w-full max-w-6xl mx-auto relative'>
          <AnimatedSection className='text-center md:text-left z-10 mb-8 md:mb-0 md:absolute md:top-0 md:left-0'>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none'>
              Celebrating
            </h2>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-1 lg:-mt-2'>
              Indian
            </h2>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-1 lg:-mt-2'>
              love stories
            </h2>
          </AnimatedSection>

          <AnimatedSection
            className='relative z-0 md:ml-[15%] md:mt-24'
            delay={0.3}
          >
            <div className='w-[90%] mx-auto md:w-full h-[45vh] md:h-[75vh] max-h-[800px] rounded-xl overflow-hidden'>
              <Carousel />
            </div>
          </AnimatedSection>

          {/* Get in Touch Section */}
          <AnimatedSection className='mt-12 md:mt-16 text-center'>
            <p className='font-sans text-sm md:text-base text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mb-8'>
              At Wedding Theory, we capture the vibrant colors and rich
              traditions of Indian weddings. From the mehndi ceremony to the
              grand reception, we preserve every precious moment. Let us weave
              your love story into a tapestry of beautiful memories.
            </p>
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
          </AnimatedSection>

          {/* Decorative Separator */}
          <div className='my-16 md:my-20 flex items-center justify-center max-w-4xl mx-auto px-4'>
            <div className='flex-grow h-[1px] bg-gradient-to-r from-transparent via-[#D4B08C] to-transparent'></div>
            <div className='mx-4 text-[#D4B08C]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 animate-pulse'
              >
                <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
              </svg>
            </div>
            <div className='flex-grow h-[1px] bg-gradient-to-r from-[#D4B08C] via-[#D4B08C] to-transparent'></div>
          </div>
        </div>
      </main>

      {/* Image Carousel Section */}
      <AnimatedSection className='w-full h-[60vh] md:h-screen bg-[#f8f5f0] px-4 md:px-8'>
        <div className='h-full w-full max-w-[1400px] mx-auto rounded-2xl overflow-hidden'>
          <ImageCarousel />
        </div>
      </AnimatedSection>

      {/* Blog CTA Section */}
      <AnimatedSection className='w-full bg-[#f8f5f0] py-16 md:py-20'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h3 className='font-serif text-3xl md:text-4xl text-gray-800 mb-6'>
            Explore Our Wedding Journal
          </h3>
          <p className='font-sans text-gray-700 text-base md:text-lg mb-8 leading-relaxed'>
            Discover inspiring stories, wedding planning tips, and
            behind-the-scenes glimpses into the most beautiful Indian weddings.
            Let our blog guide you through your wedding journey.
          </p>
          <Link
            href='/blogs'
            className='inline-block px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base 
                bg-transparent hover:bg-[#68401b] 
                text-[#68401b] hover:text-white font-medium 
                rounded-full border-2 border-[#68401b]
                transition-all duration-300 ease-in-out
                shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                hover:transform hover:scale-105
                tracking-wide'
          >
            Read Our Blog
          </Link>
        </div>
      </AnimatedSection>

      {/* Wedding Stories Section */}
      <AnimatedSection className='w-full bg-[#f8f5f0] py-24 md:py-32'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center'>
            <h3 className='font-serif text-3xl md:text-5xl lg:text-6xl text-gray-800 mb-8'>
              Wedding Stories That Inspire
            </h3>
            <div className='w-32 h-[1px] bg-[#D4B08C] mx-auto mb-12'></div>
            <p className='font-sans text-gray-700 text-base md:text-lg mb-20 px-4 leading-relaxed max-w-3xl mx-auto'>
              Every wedding tells a unique story - a story of love, tradition,
              and celebration. Through our lens, we capture these precious
              moments that become timeless memories, creating visual narratives
              that will be cherished for generations.
            </p>

            {/* Statistics Grid with staggered animation */}
            <AnimatedStats
              stats={[
                { number: '500+', label: 'Weddings Captured' },
                { number: '10+', label: 'Years Experience' },
                { number: '50+', label: 'Cities Covered' },
                { number: '1000+', label: 'Happy Couples' },
              ]}
            />

            <div className='text-center mt-16'>
              <Link
                href='/testimonial'
                className='inline-block px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base 
                  bg-transparent hover:bg-[#68401b] 
                  text-[#68401b] hover:text-white font-medium 
                  rounded-full border-2 border-[#68401b]
                  transition-all duration-300 ease-in-out
                  shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                  hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                  hover:transform hover:scale-105
                  tracking-wide'
              >
                Explore Their Stories
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Video Gallery Section */}
      <AnimatedSection className='w-full px-4 md:px-8 py-16 md:py-24 bg-[#fcfaf7]'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='font-serif text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4'>
              Featured Films
            </h2>
            <p className='font-sans text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
              Immerse yourself in these handpicked wedding films that showcase
              our signature storytelling style and cinematic excellence.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
            {/* First Video */}
            <div className='relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg'>
              <iframe
                title='Wedding Theory Film 1'
                src='https://www.youtube.com/embed/CVOfQ_54Br8'
                className='w-full aspect-video'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
            {/* Second Video */}
            <div className='relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg'>
              <iframe
                title='Wedding Theory Film 2'
                src='https://www.youtube.com/embed/0Ky81YMuR7k'
                className='w-full aspect-video'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className='mt-16 text-center'>
            <Link
              href='/films'
              className='inline-block px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base 
                  bg-transparent hover:bg-[#68401b] 
                  text-[#68401b] hover:text-white font-medium 
                  rounded-full border-2 border-[#68401b]
                  transition-all duration-300 ease-in-out
                  shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                  hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                  hover:transform hover:scale-105
                  tracking-wide'
            >
              View All Films
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* LAHZA Promotion Section */}
      <AnimatedSection className='w-full bg-[#f8f5f0] py-20 md:py-32'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h3 className='font-serif text-5xl md:text-7xl text-gray-800 mb-6'>
              LAHZA
            </h3>
            <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
              Our signature service crafting timeless memories through photo,
              video, music, and print
            </p>
          </div>

          {/* Image Grid with enhanced hover animations */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
            <AnimatedSection className='relative group h-[400px] overflow-hidden rounded-2xl'>
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 md:group-hover:bg-black/40 transition-all duration-500 z-10' />
              <Image
                src='https://ik.imagekit.io/weddingtheory/Photos/WT-2.jpg'
                alt='LAHZA Wedding Service'
                fill
                className='object-cover transform group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute bottom-0 left-0 right-0 p-8 text-white z-20 md:transform md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500'>
                <h4 className='font-serif text-2xl mb-3'>Photography</h4>
                <p className='text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500'>
                  Capturing authentic moments with artistic precision
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className='relative group h-[400px] overflow-hidden rounded-2xl'>
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 md:group-hover:bg-black/40 transition-all duration-500 z-10' />
              <Image
                src='https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg'
                alt='LAHZA Wedding Cinematography'
                fill
                className='object-cover transform group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute bottom-0 left-0 right-0 p-8 text-white z-20 md:transform md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500'>
                <h4 className='font-serif text-2xl mb-3'>Cinematography</h4>
                <p className='text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500'>
                  Weaving your love story into cinematic masterpieces
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className='relative group h-[400px] overflow-hidden rounded-2xl'>
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 md:group-hover:bg-black/40 transition-all duration-500 z-10' />
              <Image
                src='https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg'
                alt='LAHZA Complete Wedding Service'
                fill
                className='object-cover transform group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute bottom-0 left-0 right-0 p-8 text-white z-20 md:transform md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500'>
                <h4 className='font-serif text-2xl mb-3'>
                  Complete Experience
                </h4>
                <p className='text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500'>
                  Harmonizing visuals, music, and print into lasting memories
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Features List */}
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16'>
            {[
              'Photography',
              'Cinematography',
              'Music Production',
              'Premium Prints',
            ].map((feature) => (
              <div key={feature} className='text-center p-4  rounded-lg'>
                <h5 className='font-serif text-base md:text-xl text-gray-800 mb-2'>
                  {feature}
                </h5>
                <div className='w-8 md:w-12 h-[1px] bg-[#68401b] mx-auto' />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className='text-center'>
            <Link
              href='/lahza'
              className='inline-block px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base 
                bg-transparent hover:bg-[#68401b] 
                text-[#68401b] hover:text-white font-medium 
                rounded-full border-2 border-[#68401b]
                transition-all duration-300 ease-in-out
                shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                hover:transform hover:scale-105
                tracking-wider'
            >
              Discover LAHZA
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
