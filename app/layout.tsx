import type { Metadata, Viewport } from 'next';
import './globals.css';
import './styles/fonts.css';
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
  title: 'Wedding Theory - Premier Wedding Photography & Cinematography',
  description: 'Wedding Theory specializes in luxury Indian wedding photography and cinematography. From intimate ceremonies to grand celebrations, we capture timeless moments with artistic vision. Experience our signature LAHZA collection, candid photography, and cinematic films.',
  keywords: 'wedding photography, indian wedding, wedding films, luxury wedding, candid photography, cinematography, LAHZA, wedding albums, wedding stories',
  
  // Icons and Favicon configuration
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#68401b'
      }
    ]
  },
  
  manifest: '/favicon/site.webmanifest',
  
  // Existing OpenGraph configuration
  openGraph: {
    title: 'Wedding Theory - Celebrating Indian Love Stories',
    description: 'Premier Indian wedding photography and cinematography. 500+ weddings captured, 10+ years experience, 50+ cities covered. Specializing in luxury weddings and our signature LAHZA collection.',
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
    description: 'Luxury Indian wedding photography and cinematography. Creating timeless memories with artistic vision.',
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
  
  verification: {
    google: 'your-google-verification-code',
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
