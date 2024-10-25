import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5f0]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-gray-800 mb-6">
            A MODERN APPROACH
          </h2>
          <h3 className="font-serif text-xl md:text-2xl font-normal text-gray-700 italic mb-8">
            to an Age Old Tradition
          </h3>
          <p className="font-sans text-gray-600 leading-relaxed">
            Your wedding day is the start of a beautiful journey together. At Wedding Theory, 
            we&apos;re passionate about capturing those precious moments. Our creative team of 
            photographers specializes in both candid and traditional shots, ensuring every 
            laugh, tear, and loving glance is preserved. From intimate local ceremonies to 
            grand destination weddings, we&apos;re here to turn your special day into timeless memories.
          </p>
        </div>
      </main>

      <footer className="w-full bg-white py-4 text-center text-sm text-gray-600">
        <p className="font-sans">
          &copy; 2024 Wedding Theory. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
