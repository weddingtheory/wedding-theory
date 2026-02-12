'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlogPost {
    id: string;
    title: string;
    published_at: string | null;
    featured_image_key: string | null;
    slug: string;
    status: string;
    is_featured_home: boolean | null;
    featured_image_alt: string | null;
}

export default function BlogListingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const lastTransitionTimeRef = useRef(Date.now());

    useEffect(() => {
        async function fetchBlogPosts() {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select(
                        'id, title, published_at, featured_image_key, slug, status, is_featured_home, featured_image_alt'
                    )
                    .eq('status', 'published')
                    .order('published_at', { ascending: false });

                if (error) throw error;
                setBlogPosts(data || []);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogPosts();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const startTimer = () => {
            timer = setInterval(() => {
                const currentTime = Date.now();
                const timeElapsed = currentTime - lastTransitionTimeRef.current;

                if (timeElapsed >= 3000) {
                    // 3 seconds
                    setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
                    lastTransitionTimeRef.current = currentTime;
                }
            }, 3000);
        };

        if (blogPosts.length > 0) {
            startTimer();
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [blogPosts.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
        lastTransitionTimeRef.current = Date.now();
    }, [blogPosts.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));
        lastTransitionTimeRef.current = Date.now();
    }, [blogPosts.length]);

    // Carousel Component
    const CarouselSection = () => {
        const handlers = useSwipeable({
            onSwipedLeft: goToNext,
            onSwipedRight: goToPrevious,
            trackMouse: true,
            trackTouch: true,
            delta: 10,
            rotationAngle: 0,
        });

        if (loading) {
            return (
                <div className='flex justify-center items-center h-full'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#68401b]'></div>
                </div>
            );
        }

        if (blogPosts.length === 0) {
            return null;
        }

        const currentPost = blogPosts[currentIndex];

        return (
            <div
                {...handlers}
                className='relative h-[60vh] lg:h-full overflow-hidden'
                style={{ touchAction: 'pan-y pinch-zoom' }}
            >
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.7 }}
                        className='absolute inset-0'
                    >
                        <Link
                            href={`/blog/${currentPost.slug}`}
                            className='group block relative h-full'
                        >
                            <Image
                                src={currentPost.featured_image_key || ''}
                                alt={currentPost.featured_image_alt || currentPost.title}
                                fill
                                className='object-cover'
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60' />
                            <motion.div
                                className='absolute bottom-12 left-4 right-4 lg:bottom-24 lg:left-20 lg:right-auto text-white z-10 
                  max-w-[calc(100%-2rem)] lg:max-w-lg'
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div
                                    className='backdrop-blur-md bg-black/30 p-3 lg:p-4 rounded-lg
                  border border-white/10 shadow-lg transition-all duration-300
                  active:scale-[0.98] lg:hover:scale-[1.02] lg:hover:bg-black/40 lg:hover:shadow-2xl'
                                >
                                    <div className='flex flex-col gap-1 lg:gap-2'>
                                        <h3
                                            className='font-serif text-base lg:text-3xl leading-tight relative z-10 text-white/90 
                      transition-colors duration-300 group-hover:text-white'
                                        >
                                            {currentPost.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Navigation Dots */}
                        <div className='absolute bottom-4 right-4 lg:bottom-12 lg:right-20 flex gap-1.5 lg:gap-2 z-20'>
                            {blogPosts.map((_, index) => (
                                <button
                                    key={index}
                                    aria-label={`Go to slide ${index + 1}`}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        lastTransitionTimeRef.current = Date.now();
                                    }}
                                    className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                        ? 'bg-white w-4 lg:w-6'
                                        : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300'
                    aria-label='Previous slide'
                >
                    <IoChevronBackOutline size={24} />
                </button>
                <button
                    onClick={goToNext}
                    className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300'
                    aria-label='Next slide'
                >
                    <IoChevronForwardOutline size={24} />
                </button>
            </div>
        );
    };

    return (
        <div className='min-h-screen bg-[#f8f5f0]'>
            {/* Mobile Carousel */}
            <div className='lg:hidden w-full h-[60vh] mb-8'>
                <CarouselSection />
            </div>

            <div className='flex relative'>
                {/* Desktop Left Side - Fixed Carousel */}
                <div className='hidden lg:block w-1/2 sticky top-0 h-screen'>
                    <CarouselSection />
                </div>

                {/* Right Side - Scrollable Blog Posts */}
                <div className='w-full lg:w-1/2 p-8 md:p-16'>
                    <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-16'>
                        Our Blog
                    </h1>
                    {loading ? (
                        <div className='flex justify-center items-center py-16'>
                            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#68401b]'></div>
                        </div>
                    ) : (
                        <div className='space-y-24 mb-24'>
                            {blogPosts.map((post) => {
                                return (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className='group block transition-all duration-300 active:scale-[0.98] cursor-pointer'
                                    >
                                        <motion.article
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <div
                                                className='relative h-64 md:h-[500px] mb-6 overflow-hidden rounded-2xl 
                        shadow-lg group-hover:shadow-2xl transition-all duration-300'
                                            >
                                                <Image
                                                    src={post.featured_image_key || ''}
                                                    alt={post.featured_image_alt || post.title}
                                                    fill
                                                    className='object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                                                />
                                                <div
                                                    className='absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500'
                                                />
                                            </div>
                                            <div className='space-y-2 transition-transform duration-300 group-hover:scale-[1.01]'>
                                                <h2 className='font-serif text-2xl md:text-3xl text-gray-800 group-hover:text-[#68401b] transition-colors duration-300'>
                                                    {post.title}
                                                </h2>
                                            </div>
                                        </motion.article>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
