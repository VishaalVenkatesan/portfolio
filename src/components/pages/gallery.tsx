"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import { picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8, picture9, picture10} from "@/public/gallery";
import { SectionContainer } from '../global/section-container';

interface GalleryImage {
  src: StaticImageData;
  alt: string;
}

const images: GalleryImage[] = [
  { src: picture1, alt: "Gallery image 1" },
  { src: picture3, alt: "Gallery image 3" },
  { src: picture4, alt: "Gallery image 4" },
  { src: picture5, alt: "Gallery image 5" },
  { src: picture6, alt: "Gallery image 6" },
  { src: picture7, alt: "Gallery image 7" },
  { src: picture8, alt: "Gallery image 8" },
  { src: picture9, alt: "Gallery image 9" },
  { src: picture10, alt: "Gallery image 10" },
  { src: picture2, alt: "Gallery image 2" },
];

export default function Gallery(): JSX.Element {
  return (
    <section id="gallery" className="w-full">
      <SectionContainer>
        <div className="px-4 py-16">
          <motion.h1
            className="text-2xl font-semibold mb-8 text-start"
            initial={{ opacity: 1, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Gallery
          </motion.h1>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0.5, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                  width={500}
                  height={300}
                  priority={index < 4}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}