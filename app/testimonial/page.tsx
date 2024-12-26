'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import TestimonialCard from './components/TestimonialCard';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Testimonial {
  couple_names: string;
  review: string | null;
  image_key: string | null;
  video_url: string | null;
  wedding_date: string | null;
  location: string | null;
}

export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('status', 'published')
          .order('wedding_date', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col min-h-screen bg-[#f8f5f0] items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow container mx-auto px-4 py-16 md:py-24'>
        <div className='max-w-7xl mx-auto space-y-32'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.couple_names}
              content={testimonial.review ? [testimonial.review] : []}
              imageUrl={testimonial.image_key || ''}
              videoUrl={testimonial.video_url || '#'}
              reverse={index % 2 !== 0}
              location={testimonial.location}
              weddingDate={testimonial.wedding_date}
            />
          ))}
        </div>
      </main>
    </div>
  );
} 