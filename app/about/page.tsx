/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className='min-h-screen bg-[#f8f5f0]'>
      {/* Updated Hero Section with new background colors */}
      <div className='relative w-full min-h-[90vh] md:flex flex-col md:flex-row bg-gradient-to-b from-[#f4ede4] to-[#f8f5f0]'>
        {/* Left side - Image with enhanced overlay */}
        <div className='relative w-full md:w-1/2 h-[50vh] md:h-[90vh]'>
          <div className='absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-10' />
          <Image
            src='https://ik.imagekit.io/weddingtheory/Photos/P&PFIRSTLOOK-24.jpg?updatedAt=1730140170348'
            alt='Wedding Couple'
            fill
            className='object-cover'
            unoptimized
          />
        </div>

        {/* Right side - Content with enhanced styling */}
        <div className='w-full md:w-1/2 bg-gradient-to-br from-[#f4ede4] to-[#f8f5f0] flex items-center justify-center p-8 md:p-12 min-h-[50vh] md:min-h-[90vh]'>
          <div className='max-w-xl space-y-6 md:space-y-8'>
            {/* Logo styling remains the same */}
            <div className='hidden md:block mb-12'>
              <Image
                src='/weddinglogo.png'
                alt='Wedding Theory Logo'
                width={120}
                height={60}
                className='mb-8'
              />
            </div>

            <h1 className='font-serif text-2xl md:text-4xl tracking-wider text-center md:text-left text-[#2c1810]'>
              Capturing Love
            </h1>
            <h2 className='font-serif text-xl md:text-2xl italic text-center md:text-left text-[#68401b]'>
              In Every Shade
            </h2>
            <p className='text-sm md:text-base text-[#5c3724]/80 text-center md:text-left font-light'>
              Specialising in Editorial Images & Narrative Films
            </p>
            <div className='flex justify-center md:justify-start pt-4'>
              <Link
                href='/contact'
                className='inline-block px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base 
                  bg-transparent hover:bg-[#68401b] 
                  text-[#68401b] hover:text-[#f4ede4] font-medium 
                  rounded-full border-2 border-[#68401b]
                  transition-all duration-300 ease-in-out
                  shadow-[0_4px_14px_0_rgba(104,64,27,0.25)]
                  hover:shadow-[0_6px_20px_rgba(104,64,27,0.35)]
                  hover:transform hover:scale-105
                  tracking-wide'
              >
                Frame Your Forever
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Introduction */}
      <section className='max-w-4xl mx-auto px-4 py-16 text-center'>
        <p className='font-serif text-2xl md:text-3xl text-gray-800  leading-relaxed'>
          &ldquo;Creating timeless memories, one frame at a time&rdquo;
        </p>
        <div className='w-24 h-[1px] bg-gray-400 mx-auto my-8'></div>
      </section>

      {/* Content Section */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-16 md:gap-24'>
          {/* Capturing Timeless Moments */}
          <div className='space-y-6'>
            <div className='flex items-center space-x-4 mb-8'>
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
                </svg>
              </div>
              <h2 className='font-serif text-3xl text-gray-800'>
                Capturing Timeless Moments
              </h2>
            </div>
            <div className='h-[2px] bg-[#412e0d] w-48 mb-8'></div>
            <p className='font-sans text-gray-700 leading-relaxed'>
              Your wedding day marks the beginning of the first day of two lives
              together. And, what better way to make memories of this day with
              your special someone, your friends and family than to capture them
              through our camera.
            </p>
            <p className='font-sans text-gray-700 leading-relaxed'>
              This is where we, the Wedding Theory team, come to play. We're a
              creative team of wedding photographers, who wish to make
              everlasting memories of your special day. Be it candid stories
              from destination weddings or well-versed snapshots, we're here to
              capture all the fun, memorable and touching moments that you
              witness.
            </p>
          </div>

          {/* Our Commitment */}
          <div className='space-y-6'>
            <div className='flex items-center space-x-4 mb-8'>
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
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
              <h2 className='font-serif text-3xl text-gray-800'>
                Our Commitment
              </h2>
            </div>
            <div className='h-[2px] bg-[#412e0d] w-48 mb-8'></div>
            <p className='font-sans text-gray-700 leading-relaxed'>
              Our signature services not only include wedding photography and
              wedding films, but it also includes albums along with a high dose
              of professionalism. We believe in the authenticity of having
              traditional albums alongside their digital counterparts, as the
              two complements each other.
            </p>
            <p className='font-sans text-gray-700 leading-relaxed'>
              If the promise of a lifetime's worth of memories is what you're
              looking for, you've come to the right place.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className='mt-24'>
          <h2 className='font-serif text-4xl md:text-5xl text-center text-gray-800 mb-16'>
            What We Offer
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {services.map((service, index) => (
              <div
                key={index}
                className='bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300'
              >
                <div className='flex items-center space-x-4 mb-6'>
                  <div className='w-12 h-12 rounded-full bg-[#412e0d] flex items-center justify-center'>
                    {service.icon}
                  </div>
                  <h3 className='font-serif text-2xl text-gray-800'>
                    {service.title}
                  </h3>
                </div>
                <p className='font-sans text-gray-700 leading-relaxed'>
                  {service.description}
                </p>
              </div>
            ))}

            {/* Music Service Card */}
            <div className='bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300'>
              <div className='flex items-center space-x-4 mb-6'>
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
                <h3 className='font-serif text-2xl text-gray-800'>
                  Original Music
                </h3>
              </div>
              <p className='font-sans text-gray-700 leading-relaxed'>
                Your wedding film deserves a unique soundtrack, making your
                memories even more special.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
      </svg>
    ),
    title: "Wedding Photography",
    description:
      "Capturing authentic moments with our signature artistic style.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Wedding Films",
    description:
      "Cinematic storytelling that brings your special day to life.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Premium Albums",
    description:
      "Beautifully crafted albums that preserve your memories for generations.",
  },
];

export default AboutPage; 