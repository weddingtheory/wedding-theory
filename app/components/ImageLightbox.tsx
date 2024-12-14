import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface ImageLightboxProps {
  images: string[];
  initialImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onImageChange?: (index: number) => void;
}

export default function ImageLightbox({
  images,
  initialImageIndex,
  isOpen,
  onClose,
  onImageChange
}: ImageLightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  // Reset when opening new gallery
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsPlaying(false);
      setIsGridView(false);
      onImageChange?.(0);
    }
  }, [isOpen, onImageChange]);

  const handlePrevious = useCallback(() => {
    setIsPlaying(false);
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  // Toggle slideshow
  const toggleSlideshow = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Slideshow effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && !isGridView) {
      timer = setInterval(() => {
        setCurrentImageIndex(prev => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isGridView, images.length]);

  // Notify parent of manual image changes only
  useEffect(() => {
    if (!isPlaying && onImageChange) {
      onImageChange(currentImageIndex);
    }
  }, [currentImageIndex, onImageChange, isPlaying]);

  // Add swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsGridView(false);
    setIsPlaying(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      {/* Progress Bar */}
      {isPlaying && !isGridView && (
        <>
          <style jsx>{`
            @keyframes progressAnimation {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
            .progress-bar {
              height: 2px;
              background: rgba(255, 255, 255, 0.2);
              transform-origin: left;
              animation: progressAnimation 3s linear infinite;
            }
          `}</style>
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[70]">
            <div className="progress-bar w-full h-full" />
          </div>
        </>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className={`fixed top-4 right-4 text-white z-[60] p-2 hover:opacity-80 bg-black/40 rounded-full ${
          isGridView ? 'md:right-7' : ''
        }`}
        aria-label="Close gallery"
      >
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      {!isGridView && (
        <>
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white/90 p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-[60]"
            aria-label="Previous image"
          >
            <IoChevronBackOutline size={24} />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white/90 p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-[60]"
            aria-label="Next image"
          >
            <IoChevronForwardOutline size={24} />
          </button>
        </>
      )}

      {/* Main content area */}
      <div 
        {...handlers}
        className='relative w-full h-full flex items-center justify-center p-4'
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        {isGridView ? (
          // Grid View
          <div className='w-full h-full overflow-y-auto px-4 pt-16 pb-20'>
            <div className='max-w-7xl mx-auto'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                {images.map((image, index) => (
                  <div
                    key={image}
                    className={`relative aspect-square cursor-pointer group ${
                      index === currentImageIndex 
                        ? 'ring-4 ring-white ring-offset-4 ring-offset-black/80' 
                        : 'hover:ring-2 hover:ring-white/50'
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className='object-cover transition-transform duration-200 group-hover:scale-[1.02]'
                      sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    />
                    <div className='absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded-full'>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Single Image View
          <div className='relative w-full max-w-5xl h-[80vh] touch-pan-y'>
            <Image
              src={images[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              fill
              className='object-contain'
              sizes='(max-width: 768px) 100vw, 80vw'
              priority={currentImageIndex === 0}
            />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 text-white flex items-center gap-3 z-[60] bg-black/40 px-4 py-2 rounded-full ${
        isGridView ? 'mb-2' : ''
      }`}>
        {!isGridView && (
          <button
            onClick={toggleSlideshow}
            className='hover:opacity-80 transition-opacity duration-200'
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            ) : (
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            )}
          </button>
        )}
        
        {/* Grid view toggle */}
        <button
          onClick={() => {
            setIsGridView(!isGridView);
            setIsPlaying(false);
          }}
          className='hover:opacity-80'
          aria-label={isGridView ? 'Single image view' : 'Grid view'}
        >
          {isGridView ? (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
              />
            </svg>
          )}
        </button>

        <span className="min-w-[3rem] text-center">
          {currentImageIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
