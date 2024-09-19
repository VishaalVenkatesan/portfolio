"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import { picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8, picture9, picture10, picture11 } from "@/public/gallery";
import { SectionContainer } from '../global/section-container';

interface GalleryImage {
  src: StaticImageData;
  alt: string;
}

const images: GalleryImage[] = [
  { src: picture1, alt: "Gallery image 1" },
  { src: picture2, alt: "Gallery image 2" },
  { src: picture3, alt: "Gallery image 3" },
  { src: picture4, alt: "Gallery image 4" },
  { src: picture5, alt: "Gallery image 5" },
  { src: picture6, alt: "Gallery image 6" },
  { src: picture7, alt: "Gallery image 7" },
  { src: picture8, alt: "Gallery image 8" },
  { src: picture9, alt: "Gallery image 9" },
  { src: picture10, alt: "Gallery image 10" },
  { src: picture11, alt: "Gallery image 11" },
];

export default function Gallery(): JSX.Element {
  return (
    <section id="gallery">
      <SectionContainer>
    <div className="container mx-auto px-4 py-16">
      <motion.h1 className="text-2xl font-semibold mb-4 ">
            My Gallery
        </motion.h1>
      <motion.div 
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {images.map((image, index) => (
          <motion.div 
            key={index}
            className="mb-4 break-inside-avoid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.00 }} 
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
              priority
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
    </SectionContainer>
    </section>
  );
}