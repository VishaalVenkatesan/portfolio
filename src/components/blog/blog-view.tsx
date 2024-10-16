"use client"

import React, { useState } from 'react'
import Navbar from '@/components/global/Navbar'
import { Post } from '@/lib/types'
import { format } from 'date-fns'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import DOMPurify from 'dompurify'

export default function BlogPostClient({ post }: { post: Post }) {
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

  return (
    <>
      <Navbar/>
      <div className="max-w-3xl mx-auto p-6 min-h-screen">
        <Link href="/blog" className="inline-flex items-center mb-8">
          <ArrowLeft className="mr-2" size={20} />
          <span className="text-lg">Back to all posts</span>
        </Link>

        <h1 className="text-4xl font-serif font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-8 font-light">{post.subject}</p>

        {post.images && post.images.length > 0 && (
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={post.images[currentImageIndex]}
                alt={`Blog post image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                layout="responsive"
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
        
        <div className="px-6 sm:px-8 pb-8">
          <div className="prose prose-lg max-w-none mb-12 font-serif text-lg tracking-wide">
            {post.body.split('\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="mb-6 leading-relaxed first-letter:capitalize first-letter:text-3xl first-letter:font-bold first-letter:mr-3 first-letter:leading-3"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }} 
              />
            ))}
          </div>
        </div>

        <footer className="mt-12 text-gray-500 text-sm font-light">
          Published on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
        </footer>
      </div>
    </>
  )
}