'use client'

import React, { useState } from 'react'
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
      <div className="max-w-4xl mx-auto p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  if (isError || !post) {
    return (
      <Card className="max-w-4xl mx-auto mt-8">
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
    <article className="max-w-4xl mx-auto p-6 min-h-screen">
      <Link href="/blog" className="flex items-center text-blue-500 hover:underline mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to all posts
      </Link>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-xl text-gray-600 mb-6">{post.subject}</p>

      {post.images && post.images.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.images.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="relative aspect-square cursor-pointer overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Blog post image ${index + 1}`}
                      layout="fill"
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="relative aspect-video">
                    <Image
                      src={post.images[currentImageIndex]}
                      alt={`Blog post image ${currentImageIndex + 1}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" size="icon" onClick={prevImage}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>{currentImageIndex + 1} / {post.images.length}</span>
                    <Button variant="outline" size="icon" onClick={nextImage}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-8">
        {post.body.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        Published on {format(new Date(post.createdAt), 'MMMM dd, yyyy HH:mm')}
      </footer>
    </article>
  )
}