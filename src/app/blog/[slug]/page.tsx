import { db } from "@/db/db-config"
import { posts } from "@/db/schema"
import { Post } from '@/lib/types'
import { eq } from 'drizzle-orm'
import BlogPostClient from "@/components/blog/blog-view"
import { Metadata } from 'next'

async function getPostById(id: number): Promise<Post> {
  const result = await db.select().from(posts).where(eq(posts.id, id))
  return {
    ...result[0],
    images: result[0].images as string[],
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postId = parseInt(params.slug, 10)
  const post = await getPostById(postId)

  return {
    title: `${post.title} | Your Blog Name`,
    description: post.subject,
    openGraph: {
      title: post.title,
      description: post.subject,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      images: post.images,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const postId = parseInt(params.slug, 10)
  const post = await getPostById(postId)

  return <BlogPostClient post={post} />
}