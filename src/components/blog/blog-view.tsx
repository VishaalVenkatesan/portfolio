"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import DOMPurify from 'dompurify'
import { ArrowLeft, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'

import { Button } from "@/components/ui/button"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Navbar from '@/components/global/Navbar'
import { Post } from '@/lib/types'

export default function BlogPostClient({ post }: { post: Post }) {
  const { scrollYProgress } = useScroll()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    )
  }

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.subject,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error)
    }
  }

  return (
    <>
      <Navbar />
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-primary"
        style={{ scaleX }}
      />
      <article className="max-w-3xl mx-auto p-6 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="inline-flex items-center">
              <ArrowLeft className="mr-2" size={20} />
              <span className="text-lg">Back to all posts</span>
            </Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Share this post
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <h1 className="text-4xl font-serif font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-8 font-light">{post.subject}</p>

        {post.images && post.images.length > 0 && (
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={post.images[currentImageIndex]}
                alt={`Blog post image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
              />
              {post.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center mt-4">
              {post.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="prose prose-lg max-w-none mb-12 font-serif text-lg tracking-wide">
          {post.body.split('\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 leading-relaxed first:first-letter:text-3xl first:first-letter:font-bold first:first-letter:mr-3 first:first-letter:float-left"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }}
            />
          ))}
        </div>
        <footer className="mt-12 text-muted-foreground text-sm font-light">
          Published on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
        </footer>
      </article>
    </>
  )
}