'use client'

import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from "@/db/schema"
import { Post } from '@/lib/types'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Blog() {
  const { data: posts } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <section id="blog" className="py-20">
      <div className="px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="text-2xl font-semibold mb-4">
            Blogs
          </motion.h1>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {(posts as Post[])?.map((post, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="transition-all duration-300 shadow-lg hover:shadow-xl h-52">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 overflow-hidden text-ellipsis">{post.subject}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <Link href="/blog" passHref>
              <Button 
                variant="outline" 
                className="transition-all duration-300"
              >
                View All Posts
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}