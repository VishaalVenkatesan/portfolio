"use client"
import React, { useState } from 'react'
import Navbar from '@/components/global/Navbar'
import { useQuery } from '@tanstack/react-query'
import { db } from "@/db/db-config"
import { posts } from "@/db/schema"
import { Post } from '@/lib/types'
import { format } from 'date-fns'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { eq } from 'drizzle-orm'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import DOMPurify from 'dompurify'

const getPostById = async (id: number): Promise<Post> => {
  const result = await db.select().from(posts).where(eq(posts.id, id))
  return {
    ...result[0],
    images: result[0].images as string[],
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const postId = parseInt(params.slug, 10)
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-80 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/5" />
        </div>
      </div>
    )
  }

  if (isError || !post) {
    return (
      <Card className="max-w-3xl mx-auto mt-8">
        <CardContent className="p-6">
          <p className="text-center text-red-500">Error fetching blog post. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

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
    <article className="max-w-3xl mx-auto p-6 min-h-screen">
      <Link href="/blog" className="inline-flex items-center mb-8">
        <ArrowLeft className="mr-2" size={20} />
        <span className="text-lg">Back to all posts</span>
      </Link>

      <h1 className="text-4xl font-serif font-bold mb-4">{post.title}</h1>
      <p className="text-xl text-gray-600 mb-8 font-light">{post.subject}</p>

      {post.images && post.images.length > 0 && (
        <div className="mb-12">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <Image
              src={post.images[currentImageIndex]}
              alt={`Blog post image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
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

      <div className="prose prose-lg max-w-none mb-12">
        {post.body.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }} />
        ))}
      </div>

      <footer className="mt-12 text-gray-500 text-sm font-light">
        Published on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
      </footer>
    </article>
    </>
  )
}