'use client'
import Image from 'next/image'
import { useState } from 'react'
import ImageLightbox from '../components/ImageLightbox'

interface WeddingStory {
  id: string
  couple: string
  destination: string
  imageUrl: string
}

const weddingStories: WeddingStory[] = [
  {
    id: "apoorva-akshay",
    couple: "APOORVA & AKSHAY",
    destination: "Kasaragod",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/ADL08862.jpg"
  },
  {
    id: "sabarina-ridhish",
    couple: "SABARINA & RIDHISH",
    destination: "Coimbatore",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg"
  },
  {
    id: "vyshnavi-bharath",
    couple: "VYSHNAVI & BHARATH",
    destination: "Muscat",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg"
  },
  {
    id: "yuna-kiran",
    couple: "YUNA & KIRAN",
    destination: "Chennai",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg"
  },
  {
    id: "emi-stanley",
    couple: "EMI & STANLEY",
    destination: "Kochi",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/P&PFIRSTLOOK-24.jpg"
  },
  {
    id: "anjana-jinesh",
    couple: "ANJANA & JINESH",
    destination: "Palakkad",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG"
  },
  {
    id: "lidiya-kiran",
    couple: "LIDIYA & KIRAN",
    destination: "Kochi",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/WT-9.jpg"
  },
  {
    id: "niranjana-niranj",
    couple: "NIRANJANA & NIRANJ",
    destination: "Paliyam palace kochi",
    imageUrl: "https://ik.imagekit.io/weddingtheory/Photos/T&DFIRSTSET-6.JPG"
  }
]

// Add all images from image.txt to this array
const allGalleryImages = [
  "https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-26%20(1).jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/ADL08862.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-245%20(1).jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/P&PFIRSTLOOK-24.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG",
  "https://ik.imagekit.io/weddingtheory/Photos/WT-9.jpg",
  "https://ik.imagekit.io/weddingtheory/Photos/T&DFIRSTSET-6.JPG"
]

export default function WeddingsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with split design */}
      <section className="relative h-screen mb-16 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
          <Image
            src="https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg?updatedAt=1730140142519"
            alt="Wedding Hero Left"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex items-center justify-center p-8">
          <div className="text-center max-w-xl">
            <h1 className="text-4xl md:text-6xl text-gray-900 mb-6">
              Wedding Gallery
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              A collection of beautiful moments and cherished memories, where
              each photograph tells a unique story of love and celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Wedding Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {weddingStories.map((story, index) => (
            <div
              key={story.id}
              className="group wedding-story-card cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white shadow-lg">
                  <div className="w-full h-full transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src={story.imageUrl}
                      alt={story.couple}
                      width={500}
                      height={625}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2 px-2">
                  <h3 className="text-xl text-gray-900 font-medium tracking-wide">
                    {story.couple}
                  </h3>
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600">{story.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={allGalleryImages}
        initialImageIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  )
}
