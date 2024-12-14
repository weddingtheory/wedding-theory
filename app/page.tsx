'use client';
import React, { useState, useEffect } from 'react';
import AnimatedSection from './components/AnimatedSection';
import Carousel from './components/Carousel';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedStats from './components/AnimatedStats';
import WeddingLogo from '../public/weddinglogo.png';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className='relative min-h-screen'>
        <Carousel />
      </section>
    </div>
  );
}
