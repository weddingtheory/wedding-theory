'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ---- Raw CMS shape (Supabase `pages.content` jsonb for slug='lahza') ----
// Every field, at every level, is optional/nullable — the admin fills this
// in gradually. See resolveLahzaContent() below for the fallback rule.

export interface CmsImage {
  key?: string;
  url?: string | null;
  alt?: string | null;
}

export interface CmsVideo {
  key?: string;
  url?: string | null;
}

export interface RawLahzaContent {
  hero?: {
    eyebrow?: string | null;
    tagline?: string | null;
    backdropImage?: CmsImage | null;
  } | null;
  manifesto?: {
    quote?: string | null;
    byline?: string | null;
    image?: CmsImage | null;
    imageCaption?: string | null;
  } | null;
  gallery?: {
    heading?: string | null;
    images?: CmsImage[] | null;
  } | null;
  cinematicMoment?: {
    heading?: string | null;
    videos?: CmsVideo[] | null;
  } | null;
  visualArtistry?: {
    heading?: string | null;
    photography?: {
      eyebrow?: string | null;
      title?: string | null;
      description?: string | null;
      images?: CmsImage[] | null;
    } | null;
    film?: {
      eyebrow?: string | null;
      title?: string | null;
      description?: string | null;
      video?: CmsVideo | null;
    } | null;
  } | null;
  finerDetails?: {
    heading?: string | null;
    music?: {
      eyebrow?: string | null;
      title?: string | null;
      description?: string | null;
      spotifyUrl?: string | null;
    } | null;
    print?: {
      eyebrow?: string | null;
      title?: string | null;
      description?: string | null;
      image?: CmsImage | null;
    } | null;
  } | null;
  editorialCollage?: {
    eyebrow?: string | null;
    quote?: string | null;
    images?: CmsImage[] | null;
    video?: CmsVideo | null;
  } | null;
  cta?: {
    heading?: string | null;
    subtext?: string | null;
    buttonLabel?: string | null;
  } | null;
}

// ---- Today's hardcoded copy, used as the default for every field ----
// (kept in one place so "what the page shows with an empty CMS row" stays
// obviously in sync with what shipped before this integration)

const DEFAULTS = {
  hero: {
    eyebrow: 'Signature Wedding Films & Photography',
    tagline: 'Every love story, told in a single unforgettable moment',
    backdropImage: {
      url: 'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
      alt: 'LAHZA by Wedding Theory',
    },
  },
  manifesto: {
    byline: '— Wedding Theory',
    image: {
      url: 'https://ik.imagekit.io/weddingtheory/Photos/T&DFIRSTSET-6.JPG?updatedAt=1730206583483',
      alt: 'A quiet moment, captured',
    },
    imageCaption: 'A Wedding, Once Lived',
  },
  gallery: {
    heading: "Every Story We've Held",
    images: [
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A2855%20Edit.jpg',
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A4018.jpg',
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A7575.jpg',
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/ADL02297.jpg',
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/NA401349.jpg',
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&DWEDDINGFIRSTLOOK-9.jpg',
      'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&JChristianWeddingFirstlook-38.jpg',
    ].map((url) => ({ url, alt: 'A moment from a Wedding Theory story' })),
  },
  cinematicMoment: {
    heading: 'In Motion, Forever Held',
    videos: [
      {
        url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/WEB1%202%20compressed.mp4',
      },
    ],
  },
  visualArtistry: {
    heading: 'Visual Artistry',
    photography: {
      eyebrow: 'Photography',
      title: 'The Unscripted Moment',
      description:
        'Relive every stolen glance and unguarded laugh. Our photographers move quietly through your day, two or three artists deep, trained to find the moment before you know it is happening — and keep it forever.',
      images: [
        'https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg?updatedAt=1730140124794',
        'https://ik.imagekit.io/weddingtheory/Photos/T&DFIRSTSET-6.JPG?updatedAt=1730206583483',
        'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
        'https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-245%20(1).jpg?updatedAt=1730140149027',
      ].map((url) => ({ url, alt: 'Candid Photography' })),
    },
    film: {
      eyebrow: 'Film',
      title: 'A Love Story, Directed by Life',
      description:
        'Imagine the most beautiful film you have ever seen — and it is yours. With over a decade behind the lens, our filmmakers weave your wedding into a cinematic heirloom, scored and paced like the romance it is.',
      // No default hosted video — falls back to the YouTube embed in the component.
      video: null as { url: string } | null,
    },
  },
  finerDetails: {
    heading: 'The Finer Details',
    music: {
      eyebrow: 'Music',
      title: 'The Sound of Your Story',
      description:
        'Every great love story deserves its own score. We collaborate with independent composers to create an original piece written only for you — a melody as singular as your fairytale.',
      // Default Spotify track id — used when no CMS spotifyUrl is set.
      defaultTrackId: '4AM44o1sPhmoWHjt7GmpSl',
    },
    print: {
      eyebrow: 'Print',
      title: 'Bound in Forever',
      description:
        'Some moments are meant to be held, not scrolled past. Our in-house artisans design and craft heirloom albums by hand, so your story lives on a shelf, not just a server.',
      image: {
        url: 'https://cdn0.weddingwire.in/article/7121/3_2/1280/jpg/91217-indian-wedding-album-design-mili-ghosh-lead.jpeg',
        alt: 'Wedding Album',
      },
    },
  },
  editorialCollage: {
    eyebrow: 'A Lahza Worth Keeping',
    quote:
      'Somewhere between the vows and the very last dance, forever begins.',
    images: [
      {
        url: 'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
        alt: 'A quiet moment before the vows',
      },
      {
        url: 'https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-245%20(1).jpg?updatedAt=1730140149027',
        alt: 'A candid laugh, kept forever',
      },
    ],
    video: {
      url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/sonali%20samip%20website%20run%202.mov',
    },
  },
  cta: {
    heading: "Let's Write Your Chapter",
    subtext:
      'Every love story deserves to be told beautifully, and kept forever. Let us begin yours.',
    buttonLabel: 'Begin Your Story',
  },
} as const;

// ---- Fallback helpers ----
// Treat null, undefined, and empty/whitespace-only strings as "not set yet".

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function optionalText(
  value: string | null | undefined,
  fallback: string | null
): string | null {
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

function firstVideoUrl(
  value: CmsVideo[] | null | undefined,
  fallback: string
): string {
  const valid = (value ?? []).find((v) => Boolean(v?.url?.trim()));
  return valid?.url?.trim() || fallback;
}

function singleVideoUrl(
  value: CmsVideo | null | undefined
): string | null {
  return value?.url?.trim() || null;
}

// Accepts a full Spotify track URL (open.spotify.com/track/<id>, with or
// without query params) and returns the embeddable player URL. Falls back
// to the default track if the CMS value is missing or unparseable.
function toSpotifyEmbedUrl(
  spotifyUrl: string | null | undefined,
  defaultTrackId: string
): string {
  const trackIdMatch = spotifyUrl?.match(/track\/([a-zA-Z0-9]+)/);
  const trackId = trackIdMatch?.[1] || defaultTrackId;
  return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
}

// ---- Fully-resolved shape the page actually renders ----

export interface LahzaResolvedContent {
  hero: {
    eyebrow: string;
    tagline: string;
    backdropImage: { url: string; alt: string };
  };
  manifesto: {
    quote: string | null; // null = keep the default styled JSX quote
    byline: string;
    image: { url: string; alt: string };
    imageCaption: string;
  };
  gallery: {
    heading: string;
    images: { url: string; alt: string }[];
  };
  cinematicMoment: {
    heading: string | null; // null = keep the default two-line/script heading
    videoUrl: string;
  };
  visualArtistry: {
    heading: string;
    photography: {
      eyebrow: string;
      title: string;
      description: string;
      images: { url: string; alt: string }[];
    };
    film: {
      eyebrow: string;
      title: string;
      description: string;
      videoUrl: string | null; // null = keep the default YouTube embed
    };
  };
  finerDetails: {
    heading: string;
    music: {
      eyebrow: string;
      title: string;
      description: string;
      spotifyEmbedUrl: string;
    };
    print: {
      eyebrow: string;
      title: string;
      description: string;
      image: { url: string; alt: string };
    };
  };
  editorialCollage: {
    eyebrow: string;
    quote: string | null; // null = keep the default styled JSX quote
    images: { url: string; alt: string }[];
    videoUrl: string;
  };
  cta: {
    heading: string;
    subtext: string;
    buttonLabel: string;
  };
}

export function resolveLahzaContent(
  raw: RawLahzaContent | null
): LahzaResolvedContent {
  return {
    hero: {
      eyebrow: text(raw?.hero?.eyebrow, DEFAULTS.hero.eyebrow),
      tagline: text(raw?.hero?.tagline, DEFAULTS.hero.tagline),
      backdropImage: image(raw?.hero?.backdropImage, DEFAULTS.hero.backdropImage),
    },
    manifesto: {
      quote: optionalText(raw?.manifesto?.quote, null),
      byline: text(raw?.manifesto?.byline, DEFAULTS.manifesto.byline),
      image: image(raw?.manifesto?.image, DEFAULTS.manifesto.image),
      imageCaption: text(
        raw?.manifesto?.imageCaption,
        DEFAULTS.manifesto.imageCaption
      ),
    },
    gallery: {
      heading: text(raw?.gallery?.heading, DEFAULTS.gallery.heading),
      images: imageList(raw?.gallery?.images, [...DEFAULTS.gallery.images]),
    },
    cinematicMoment: {
      heading: optionalText(raw?.cinematicMoment?.heading, null),
      // Multiple videos are accepted by the schema; the current design only
      // has a slot for one, so we render the first and leave a multi-video
      // display treatment for later.
      videoUrl: firstVideoUrl(
        raw?.cinematicMoment?.videos,
        DEFAULTS.cinematicMoment.videos[0].url
      ),
    },
    visualArtistry: {
      heading: text(
        raw?.visualArtistry?.heading,
        DEFAULTS.visualArtistry.heading
      ),
      photography: {
        eyebrow: text(
          raw?.visualArtistry?.photography?.eyebrow,
          DEFAULTS.visualArtistry.photography.eyebrow
        ),
        title: text(
          raw?.visualArtistry?.photography?.title,
          DEFAULTS.visualArtistry.photography.title
        ),
        description: text(
          raw?.visualArtistry?.photography?.description,
          DEFAULTS.visualArtistry.photography.description
        ),
        images: imageList(raw?.visualArtistry?.photography?.images, [
          ...DEFAULTS.visualArtistry.photography.images,
        ]),
      },
      film: {
        eyebrow: text(
          raw?.visualArtistry?.film?.eyebrow,
          DEFAULTS.visualArtistry.film.eyebrow
        ),
        title: text(
          raw?.visualArtistry?.film?.title,
          DEFAULTS.visualArtistry.film.title
        ),
        description: text(
          raw?.visualArtistry?.film?.description,
          DEFAULTS.visualArtistry.film.description
        ),
        videoUrl: singleVideoUrl(raw?.visualArtistry?.film?.video),
      },
    },
    finerDetails: {
      heading: text(raw?.finerDetails?.heading, DEFAULTS.finerDetails.heading),
      music: {
        eyebrow: text(
          raw?.finerDetails?.music?.eyebrow,
          DEFAULTS.finerDetails.music.eyebrow
        ),
        title: text(
          raw?.finerDetails?.music?.title,
          DEFAULTS.finerDetails.music.title
        ),
        description: text(
          raw?.finerDetails?.music?.description,
          DEFAULTS.finerDetails.music.description
        ),
        spotifyEmbedUrl: toSpotifyEmbedUrl(
          raw?.finerDetails?.music?.spotifyUrl,
          DEFAULTS.finerDetails.music.defaultTrackId
        ),
      },
      print: {
        eyebrow: text(
          raw?.finerDetails?.print?.eyebrow,
          DEFAULTS.finerDetails.print.eyebrow
        ),
        title: text(
          raw?.finerDetails?.print?.title,
          DEFAULTS.finerDetails.print.title
        ),
        description: text(
          raw?.finerDetails?.print?.description,
          DEFAULTS.finerDetails.print.description
        ),
        image: image(
          raw?.finerDetails?.print?.image,
          DEFAULTS.finerDetails.print.image
        ),
      },
    },
    editorialCollage: {
      eyebrow: text(
        raw?.editorialCollage?.eyebrow,
        DEFAULTS.editorialCollage.eyebrow
      ),
      quote: optionalText(raw?.editorialCollage?.quote, null),
      images: imageList(raw?.editorialCollage?.images, [
        ...DEFAULTS.editorialCollage.images,
      ]),
      videoUrl:
        singleVideoUrl(raw?.editorialCollage?.video) ||
        DEFAULTS.editorialCollage.video.url,
    },
    cta: {
      heading: text(raw?.cta?.heading, DEFAULTS.cta.heading),
      subtext: text(raw?.cta?.subtext, DEFAULTS.cta.subtext),
      buttonLabel: text(raw?.cta?.buttonLabel, DEFAULTS.cta.buttonLabel),
    },
  };
}

const FALLBACK_CONTENT = resolveLahzaContent(null);

// Fetches `content` for slug='lahza' from the shared `pages` table and
// resolves it against today's hardcoded copy. Always returns a fully
// populated object — the page never renders blank while the CMS row is
// empty or partially filled in.
export function useLahzaContent(): LahzaResolvedContent {
  const [content, setContent] = useState<LahzaResolvedContent>(
    FALLBACK_CONTENT
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', 'lahza')
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) return; // keep the hardcoded fallback

      setContent(resolveLahzaContent(data.content as RawLahzaContent | null));
    }

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
