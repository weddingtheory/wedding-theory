import type { Metadata } from 'next';
import './globals.css';
import './styles/fonts.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Wedding Theory | Modern Wedding Photography and Films',
  description:
    'Capturing timeless moments with a modern approach to wedding photography and filmmaking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className="antialiased text-gray-900 font-montserrat">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
