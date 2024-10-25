import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

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
    <html lang='en' className={`${ebGaramond.variable} ${montserrat.variable}`}>
      <body
        className={`antialiased text-gray-900 font-sans ${montserrat.className}`}
      >
        {children}
      </body>
    </html>
  );
}
