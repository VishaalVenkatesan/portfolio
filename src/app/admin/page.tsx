"use client"
import React, { useState } from 'react'
import { Post } from '@/lib/types'
import { useLogout } from '@/firebase/handle-logout'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { PostList } from '@/components/admin/blog-lists'
import { PostForm } from '@/components/admin/blog-form'

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

  if (isLoading) return <div className="flex items-center justify-center h-screen"><Skeleton className='w-2/3 h-2/3'/></div>
  if (isError) return <div className="flex items-center justify-center h-screen">Error fetching posts</div>

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen">
      <div className="flex justify-between items-center mb-8 mt-8">
        <h1 className="text-4xl text-primary">write smthn</h1>
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