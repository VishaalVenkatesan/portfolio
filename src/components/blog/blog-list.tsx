"use client"
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from "@/db/schema"
import { Post } from '@/lib/types'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import React from 'react'

import { BackgroundBeams } from '@/components/ui/background-beams'
export default function BlogList(){
      
    const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

    return(
    <div className="container mx-auto p-8 max-w-4xl min-h-screen">
        <BackgroundBeams />
        <h1 className="text-4xl font-semibold mb-8 text-center font-serif">Latest Articles</h1>
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
          <ScrollArea className="h-[calc(100vh-180px)] pr-4">
            {(posts as Post[])?.map((post) => (
              <React.Fragment key={post.id}>
                <Card className="mb-8 hover:shadow-lg transition-all duration-300 group">
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
                    <p className="text-muted-foreground line-clamp-3">{post.subject}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.ceil(post.body.split(' ').length / 200)} min read
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="group-hover:text-primary transition-colors duration-300">
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </React.Fragment>
            ))}
          </ScrollArea>
        )}
      </div>
    )
}