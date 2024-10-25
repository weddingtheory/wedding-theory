import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <Navbar />

      <main className='flex-grow flex items-center justify-center px-4 py-12'>
        <div className='max-w-3xl text-center'>
          <h2 className='font-serif text-3xl md:text-4xl font-normal text-gray-800 mb-6'>
            A MODERN APPROACH
          </h2>
          <h3 className='font-serif text-xl md:text-2xl font-normal text-gray-700 italic mb-8'>
            to an Age Old Tradition
          </h3>
          <p className='font-sans text-gray-600 leading-relaxed'>
            Your wedding day marks the beginning of the first day of two lives
            together. And, what better way to make memories of this day with
            your special someone, your friends and family than to capture them
            through our camera. This is where we, the Wedding Theory team, come
            to play. We're a creative team of wedding photographers, who wish to
            make everlasting memories of your special day. Be it candid stories
            from destination weddings or well-versed snapshots, we're here to
            capture all the fun, memorable and touching moments that you
            witness.
          </p>
        </div>
      </main>

      <footer className='w-full bg-white py-4 text-center text-sm text-gray-600'>
        <p className='font-sans'>
          &copy; 2024 Wedding Theory. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
