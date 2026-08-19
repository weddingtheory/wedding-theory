import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gotu': ['Gotu', 'sans-serif'],
        // Keep these for backward compatibility if needed
        sans: ['Gotu', 'sans-serif'],
        serif: ['Gotu', 'serif'],
      },
      // Brand styling for CMS-authored blog/journal post bodies (rendered
      // via `dangerouslySetInnerHTML` inside a `.prose` wrapper). Without
      // this, `prose` classes generate no CSS at all — see the `plugins`
      // array below.
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-lead': theme('colors.gray.600'),
            '--tw-prose-links': '#68401b',
            '--tw-prose-bold': '#68401b',
            '--tw-prose-counters': '#D4B08C',
            '--tw-prose-bullets': '#D4B08C',
            '--tw-prose-hr': '#D4B08C',
            '--tw-prose-quotes': theme('colors.gray.700'),
            '--tw-prose-quote-borders': '#D4B08C',
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-th-borders': '#D4B08C',
            '--tw-prose-td-borders': theme('colors.gray.200'),
            p: {
              lineHeight: '1.8',
            },
            h2: {
              fontFamily: 'Gotu, serif',
              fontWeight: '500',
              fontSize: '1.75rem',
              lineHeight: '1.3',
              marginTop: '2.75rem',
              marginBottom: '1.1rem',
              paddingBottom: '0.65rem',
              borderBottom: '1px solid rgba(212, 176, 140, 0.4)',
            },
            h3: {
              fontFamily: 'Gotu, serif',
              fontWeight: '500',
              fontSize: '1.375rem',
              marginTop: '2.25rem',
              marginBottom: '0.9rem',
              color: '#68401b',
            },
            strong: {
              fontWeight: '600',
            },
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              textDecorationColor: 'rgba(212, 176, 140, 0.6)',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            },
            'a:hover': {
              color: '#8b5e2b',
            },
            'ul > li::marker': {
              color: '#D4B08C',
            },
            'ol > li::marker': {
              color: '#D4B08C',
              fontWeight: '600',
            },
            li: {
              marginTop: '0.4rem',
              marginBottom: '0.4rem',
            },
            blockquote: {
              fontStyle: 'italic',
              fontWeight: '400',
              borderLeftWidth: '3px',
              borderLeftColor: '#D4B08C',
            },
            figure: {
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
            },
            'figure > img': {
              marginTop: '0',
              marginBottom: '0',
            },
            img: {
              borderRadius: theme('borderRadius.xl'),
              boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.25)',
            },
            figcaption: {
              textAlign: 'center',
              marginTop: '0.75rem',
              color: theme('colors.gray.500'),
            },
          },
        },
        lg: {
          css: {
            h2: { fontSize: '2rem' },
            h3: { fontSize: '1.5rem' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
