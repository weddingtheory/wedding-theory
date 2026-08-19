'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ---- Raw CMS shape (Supabase `pages.content` jsonb for slug='home') ----
// Every field, at every level, is optional/nullable — the admin fills this
// in gradually. See resolveHomeContent() below for the fallback rule.

export interface CmsImage {
  key?: string;
  url?: string | null;
  alt?: string | null;
}

export interface CmsVideo {
  key?: string;
  url?: string | null;
  alt?: string | null;
}

export interface RawHomeContent {
  hero?: {
    tagline?: string | null;
  } | null;
  heroVideos?: {
    // Hard max 2 — the crossfade only has two slots.
    videos?: CmsVideo[] | null;
  } | null;
  introGallery?: {
    images?: CmsImage[] | null;
  } | null;
  getInTouch?: {
    paragraph?: string | null;
  } | null;
  blogTeaser?: {
    heading?: string | null;
    paragraph?: string | null;
  } | null;
  lahzaTeaser?: {
    backdropImage?: CmsImage | null;
    eyebrow?: string | null;
    tagline?: string | null;
  } | null;
  statsSection?: {
    heading?: string | null;
    paragraph?: string | null;
    stats?: { number?: string | null; label?: string | null }[] | null;
  } | null;
  faq?: {
    heading?: string | null;
    subtext?: string | null;
    items?: { question?: string | null; answer?: string | null }[] | null;
  } | null;
}

// ---- Today's hardcoded copy, used as the default for every field ----

const DEFAULTS = {
  hero: {
    tagline: 'Transforming love stories into timeless art',
  },
  heroVideos: {
    videos: [
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/WEB1%202%20compressed.mp4',
        alt: 'A wedding film moment',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/sonali%20samip%20website%20run%202.mov',
        alt: 'A wedding film moment',
      },
    ],
  },
  introGallery: {
    images: [
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A2855%20Edit.jpg',
        alt: 'Wedding couple portrait',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A4018.jpg',
        alt: 'Wedding portrait',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A7575.jpg',
        alt: 'Couple portrait',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/ADL02297.jpg',
        alt: 'Wedding celebration',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/NA401349.jpg',
        alt: 'Candid wedding moment',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&DWEDDINGFIRSTLOOK-9.jpg',
        alt: 'Wedding first look',
      },
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&JChristianWeddingFirstlook-38.jpg',
        alt: 'First look moment',
      },
    ],
  },
  getInTouch: {
    paragraph:
      'At Wedding Theory, we capture the vibrant colors and rich traditions of Indian weddings. From the mehndi ceremony to the grand reception, we preserve every precious moment. Let us weave your love story into a tapestry of beautiful memories.',
  },
  blogTeaser: {
    heading: 'Explore Our Wedding Journal',
    paragraph:
      'Discover inspiring stories, wedding planning tips, and behind-the-scenes glimpses into the most beautiful Indian weddings. Let our blog guide you through your wedding journey.',
  },
  lahzaTeaser: {
    backdropImage: {
      url: 'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
      alt: 'LAHZA — Signature Wedding Films & Photography',
    },
    eyebrow: 'Our Premium Wedding Package',
    tagline: 'Every love story, told in a single unforgettable moment',
  },
  statsSection: {
    heading: 'Wedding Stories That Inspire',
    paragraph:
      'Every wedding tells a unique story - a story of love, tradition, and celebration. Through our lens, we capture these precious moments that become timeless memories, creating visual narratives that will be cherished for generations.',
    stats: [
      { number: '500+', label: 'Weddings Captured' },
      { number: '10+', label: 'Years Experience' },
      { number: '50+', label: 'Cities Covered' },
      { number: '500+', label: 'Happy Couples' },
    ],
  },
  faq: {
    heading: 'Frequently Asked Questions',
    subtext: 'Everything you need to know about our wedding photography services',
    items: [
      {
        question: 'How much does wedding photography cost in Bangalore?',
        answer:
          'Wedding photography costs in Bangalore vary by style, location, deliverables, and timeline. Budget-friendly wedding photography packages range from ₹1.5-2 lakhs, while luxury packages range from ₹3-5 lakhs.',
      },
      {
        question: 'What is included in your wedding photography package?',
        answer:
          'Our packages include candid photography and videography, traditional coverage, and cinematic wedding films. Add-ons such as pre-wedding shoots, albums, drone shots, and wedding reels can be added as needed.',
      },
      {
        question:
          'How many days does it take to receive the final edited photos and videos?',
        answer:
          'You will receive 50-60 edited photos within 24 hours of the wedding. The full photo set will be delivered in 20 days, the candid wedding film in 45 days, and the traditional wedding video in 75 days.',
      },
      {
        question: 'What type of weddings do you cover in Bangalore?',
        answer:
          'We cover all types of weddings in Bangalore, including South Indian, North Indian, Christian, and Muslim weddings.',
      },
      {
        question: 'How can we contact you or get a quotation?',
        answer:
          'You can reach out to us directly via phone call or WhatsApp on +91 9902584820. For detailed enquiries and quotations, you can also email us at Hello@weddingtheory.co.in',
      },
      {
        question: 'What happens if we need to reschedule or cancel the shoot?',
        answer:
          'In case of rescheduling, the shoot will be moved to the next available date as requested, subject to our availability. In case of cancellation, no refund will be provided.',
      },
    ],
  },
} as const;

// ---- Fallback helpers ----

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function image(
  value: CmsImage | null | undefined,
  fallback: { url: string; alt: string }
): { url: string; alt: string } {
  const url = value?.url?.trim();
  if (!url) return fallback;
  return { url, alt: value?.alt?.trim() || fallback.alt };
}

function imageList(
  value: CmsImage[] | null | undefined,
  fallback: { url: string; alt: string }[]
): { url: string; alt: string }[] {
  const valid = (value ?? []).filter((img): img is CmsImage & { url: string } =>
    Boolean(img?.url?.trim())
  );
  if (valid.length === 0) return fallback;
  return valid.map((img) => ({
    url: img.url!.trim(),
    alt: img.alt?.trim() || 'A moment from a Wedding Theory story',
  }));
}

// Hard max 2 — the hero video crossfade only has two slots.
function heroVideoList(
  value: CmsVideo[] | null | undefined,
  fallback: { url: string; alt: string }[]
): { url: string; alt: string }[] {
  const valid = (value ?? []).filter((v): v is CmsVideo & { url: string } =>
    Boolean(v?.url?.trim())
  );
  if (valid.length === 0) return fallback;
  return valid.slice(0, 2).map((v) => ({
    url: v.url!.trim(),
    alt: v.alt?.trim() || 'A wedding film moment',
  }));
}

function statList(
  value: { number?: string | null; label?: string | null }[] | null | undefined,
  fallback: { number: string; label: string }[]
): { number: string; label: string }[] {
  const valid = (value ?? []).filter(
    (s) => Boolean(s?.number?.trim()) || Boolean(s?.label?.trim())
  );
  if (valid.length === 0) return fallback;
  return valid.map((s) => ({
    number: s.number?.trim() || '',
    label: s.label?.trim() || '',
  }));
}

function faqItemList(
  value: { question?: string | null; answer?: string | null }[] | null | undefined,
  fallback: { question: string; answer: string }[]
): { question: string; answer: string }[] {
  const valid = (value ?? []).filter((item) => Boolean(item?.question?.trim()));
  if (valid.length === 0) return fallback;
  return valid.map((item) => ({
    question: item.question!.trim(),
    answer: item.answer?.trim() || '',
  }));
}

// ---- Fully-resolved shape the page actually renders ----

export interface HomeResolvedContent {
  hero: {
    tagline: string;
  };
  heroVideos: {
    videos: { url: string; alt: string }[];
  };
  introGallery: {
    images: { url: string; alt: string }[];
  };
  getInTouch: {
    paragraph: string;
  };
  blogTeaser: {
    heading: string;
    paragraph: string;
  };
  lahzaTeaser: {
    backdropImage: { url: string; alt: string };
    eyebrow: string;
    tagline: string;
  };
  statsSection: {
    heading: string;
    paragraph: string;
    stats: { number: string; label: string }[];
  };
  faq: {
    heading: string;
    subtext: string;
    items: { question: string; answer: string }[];
  };
}

export function resolveHomeContent(
  raw: RawHomeContent | null
): HomeResolvedContent {
  return {
    hero: {
      tagline: text(raw?.hero?.tagline, DEFAULTS.hero.tagline),
    },
    heroVideos: {
      videos: heroVideoList(raw?.heroVideos?.videos, [
        ...DEFAULTS.heroVideos.videos,
      ]),
    },
    introGallery: {
      images: imageList(raw?.introGallery?.images, [
        ...DEFAULTS.introGallery.images,
      ]),
    },
    getInTouch: {
      paragraph: text(raw?.getInTouch?.paragraph, DEFAULTS.getInTouch.paragraph),
    },
    blogTeaser: {
      heading: text(raw?.blogTeaser?.heading, DEFAULTS.blogTeaser.heading),
      paragraph: text(
        raw?.blogTeaser?.paragraph,
        DEFAULTS.blogTeaser.paragraph
      ),
    },
    lahzaTeaser: {
      backdropImage: image(
        raw?.lahzaTeaser?.backdropImage,
        DEFAULTS.lahzaTeaser.backdropImage
      ),
      eyebrow: text(raw?.lahzaTeaser?.eyebrow, DEFAULTS.lahzaTeaser.eyebrow),
      tagline: text(raw?.lahzaTeaser?.tagline, DEFAULTS.lahzaTeaser.tagline),
    },
    statsSection: {
      heading: text(
        raw?.statsSection?.heading,
        DEFAULTS.statsSection.heading
      ),
      paragraph: text(
        raw?.statsSection?.paragraph,
        DEFAULTS.statsSection.paragraph
      ),
      stats: statList(raw?.statsSection?.stats, [
        ...DEFAULTS.statsSection.stats,
      ]),
    },
    faq: {
      heading: text(raw?.faq?.heading, DEFAULTS.faq.heading),
      subtext: text(raw?.faq?.subtext, DEFAULTS.faq.subtext),
      items: faqItemList(raw?.faq?.items, [...DEFAULTS.faq.items]),
    },
  };
}

const FALLBACK_CONTENT = resolveHomeContent(null);

// Fetches `content` for slug='home' from the shared `pages` table and
// resolves it against today's hardcoded copy. Always returns a fully
// populated object — the page never renders blank while the CMS row is
// empty or partially filled in.
export function useHomeContent(): HomeResolvedContent {
  const [content, setContent] = useState<HomeResolvedContent>(
    FALLBACK_CONTENT
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'home')
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) return; // keep the hardcoded fallback

      setContent(resolveHomeContent(data.content as RawHomeContent | null));
    }

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
