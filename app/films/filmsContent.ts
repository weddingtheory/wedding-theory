'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ---- Raw CMS shape (Supabase `pages.content` jsonb for slug='films') ----
// Only the static hero — the film cards below it come from the `films`
// table, which already has its own editor.

export interface CmsVideo {
  key?: string;
  url?: string | null;
  alt?: string | null;
}

export interface RawFilmsContent {
  hero?: {
    heading?: string | null;
    subtext?: string | null;
    heroVideo?: CmsVideo | null;
  } | null;
}

const DEFAULTS = {
  hero: {
    heading: 'Wedding Films',
    subtext: 'Turning weddings into the rom-coms they are',
    heroVideo: {
      url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/insta%20flim%2001.mp4',
      alt: 'Wedding Theory films showreel',
    },
  },
} as const;

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function video(
  value: CmsVideo | null | undefined,
  fallback: { url: string; alt: string }
): { url: string; alt: string } {
  const url = value?.url?.trim();
  if (!url) return fallback;
  return { url, alt: value?.alt?.trim() || fallback.alt };
}

export interface FilmsResolvedContent {
  hero: {
    heading: string;
    subtext: string;
    heroVideo: { url: string; alt: string };
  };
}

export function resolveFilmsContent(
  raw: RawFilmsContent | null
): FilmsResolvedContent {
  return {
    hero: {
      heading: text(raw?.hero?.heading, DEFAULTS.hero.heading),
      subtext: text(raw?.hero?.subtext, DEFAULTS.hero.subtext),
      heroVideo: video(raw?.hero?.heroVideo, DEFAULTS.hero.heroVideo),
    },
  };
}

const FALLBACK_CONTENT = resolveFilmsContent(null);

export function useFilmsContent(): FilmsResolvedContent {
  const [content, setContent] = useState<FilmsResolvedContent>(
    FALLBACK_CONTENT
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'films')
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) return;

      setContent(resolveFilmsContent(data.content as RawFilmsContent | null));
    }

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
