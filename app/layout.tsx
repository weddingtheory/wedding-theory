import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#68401b' }
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.weddingtheory.co.in'),
  title: {
    template: '%s | Wedding Theory',
    default: 'Wedding Theory - Premier Wedding Photography & Cinematography'
  },
  description:
    'Wedding Theory - Luxury Indian wedding photography and cinematography services across India. Specializing in candid moments, cinematic films, and our signature LAHZA collection.',
  keywords:
    'wedding photography, indian wedding, wedding films, luxury wedding, candid photography, cinematography, LAHZA, wedding albums, wedding stories',

  // Icons and Favicon configuration
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#68401b',
      },
    ],
  },

  // Existing OpenGraph configuration
  openGraph: {
    title: {
      template: '%s | Wedding Theory',
      default: 'Wedding Theory - Celebrating Indian Love Stories'
    },
    description:
      'Premier Indian wedding photography and cinematography. Specializing in luxury weddings, candid photography, and cinematic storytelling across India.',
    url: 'https://www.weddingtheory.co.in',
    siteName: 'Wedding Theory',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Theory - Indian Wedding Photography',
      },
    ],
  },

  // Existing Twitter configuration
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Theory - Premier Wedding Photography & Cinematography',
    description:
      'Luxury Indian wedding photography and cinematography. Creating timeless memories with artistic vision.',
    images: ['https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg'],
  },

  // Existing robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.weddingtheory.co.in',
  },

  // Apple web app configuration
  appleWebApp: {
    title: 'Wedding Theory',
    statusBarStyle: 'default',
    capable: true,
  },

 

  // Additional metadata
  applicationName: 'Wedding Theory',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Wedding Theory' }],
  creator: 'Wedding Theory',
  publisher: 'Wedding Theory',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
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
