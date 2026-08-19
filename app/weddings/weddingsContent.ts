'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ---- Raw CMS shape (Supabase `pages.content` jsonb for slug='weddings') ----
// Only the static hero — the story grid below it comes from the `weddings`
// table, which already has its own editor.

export interface CmsImage {
  key?: string;
  url?: string | null;
  alt?: string | null;
}

export interface RawWeddingsContent {
  hero?: {
    heroImage?: CmsImage | null;
    heading?: string | null;
    paragraph?: string | null;
  } | null;
}

const DEFAULTS = {
  hero: {
    heroImage: {
      url: 'https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg?updatedAt=1730140142519',
      alt: 'Wedding Hero Left',
    },
    heading: 'Wedding Gallery',
    paragraph:
      'A collection of beautiful moments and cherished memories, where each photograph tells a unique story of love and celebration.',
  },
} as const;

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

export interface WeddingsResolvedContent {
  hero: {
    heroImage: { url: string; alt: string };
    heading: string;
    paragraph: string;
  };
}

export function resolveWeddingsContent(
  raw: RawWeddingsContent | null
): WeddingsResolvedContent {
  return {
    hero: {
      heroImage: image(raw?.hero?.heroImage, DEFAULTS.hero.heroImage),
      heading: text(raw?.hero?.heading, DEFAULTS.hero.heading),
      paragraph: text(raw?.hero?.paragraph, DEFAULTS.hero.paragraph),
    },
  };
}

const FALLBACK_CONTENT = resolveWeddingsContent(null);

export function useWeddingsContent(): WeddingsResolvedContent {
  const [content, setContent] = useState<WeddingsResolvedContent>(
    FALLBACK_CONTENT
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'weddings')
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) return;

      setContent(
        resolveWeddingsContent(data.content as RawWeddingsContent | null)
      );
    }

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
