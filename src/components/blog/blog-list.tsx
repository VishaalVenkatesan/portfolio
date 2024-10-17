'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

import { getAllPosts } from "@/db/schema"
import { Post } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BackgroundBeams } from '@/components/ui/background-beams'

export default function BlogList() {
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  const reversedPosts = posts ? [...posts].reverse() : [];

  return (
    <div className="p-8 min-h-screen">
      <BackgroundBeams className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <h1 className="text-4xl font-semibold mb-8 text-center">Latest Articles</h1>
        
        {isLoading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="mb-8">
                <CardHeader>
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : isError ? (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="text-red-600 p-6 text-center">
              <p className="text-lg font-semibold">Error fetching blog posts.</p>
              <p>Please try again later.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="">
            {reversedPosts?.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <Card className="mb-8 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 group-hover:text-foreground transition-colors duration-300">{post.subject}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.ceil(post.body.split(' ').length / 200)} min read
                    </div>
                  </CardFooter>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}