"use client"
import React, { useState } from 'react'
import { Post } from '@/lib/types'
import { useLogout } from '@/firebase/handle-logout'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, LogOut } from 'lucide-react'
import { PostList } from '@/components/admin/blog-lists'
import { PostForm } from '@/components/admin/blog-form'
import Link from 'next/link'

export default function BlogManagement() {
  const handleLogout = useLogout()
  const [activeTab, setActiveTab] = useState("posts")
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined)
  
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setActiveTab("manage")
  }

  const handleNewPost = () => {
    setEditingPost(undefined)
    setActiveTab("manage")
  }

  const handleFormSuccess = () => {
    setEditingPost(undefined)
    setActiveTab("posts")
  }

  if (isLoading) return <div className="flex items-center justify-center h-screen"><Loader2 className='w-6 h-6'/></div>
  if (isError) return <div className="flex items-center justify-center h-screen">Error fetching posts</div>

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8 mt-8">
        <Link href="/" className='text-4xl text-primary hover:underline'>
          write smthn
        </Link>
        <Button onClick={handleLogout} variant="outline" className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">View Posts</TabsTrigger>
          <TabsTrigger value="manage">Manage Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="mb-4">
            <Button onClick={handleNewPost}>Create New Post</Button>
          </div>
          <PostList posts={posts || []} onEdit={handleEdit} />
        </TabsContent>
        <TabsContent value="manage">
          <PostForm post={editingPost} onSuccess={handleFormSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  )
}