"use client"
import React, { useState } from 'react'
import { Post } from '@/lib/types'
import { useLogout } from '@/firebase/handle-logout'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, getAllPosts, updatePost, deletePost } from "@/db/schema"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { X, Edit2, Trash2, LogOut, PlusCircle, Save, Image as ImageIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { getSignedURL } from '@/lib/s3-config'

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  images: z.array(z.string()).default([]),
})

type FormData = z.infer<typeof formSchema>

export default function BlogManagement() {
  const handleLogout = useLogout()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("posts")
  const { toast } = useToast()
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      body: "",
      images: [],
    },
  })

  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  const createPostMutation = useMutation({
    mutationFn: (newPost: FormData) => createPost(newPost.title, newPost.subject, newPost.body, newPost.images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Success",
        description: "Post created successfully",
      })
      handleNewPost()
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: (updatedPost: FormData) => {
      if (updatedPost.id === undefined) throw new Error("Post ID is required for update")
      return updatePost(updatedPost.id, updatedPost)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Success",
        description: "Post updated successfully",
      })
      handleNewPost()
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
    },
  })

  const onSubmit = (values: FormData) => {
    if (values.id !== undefined) {
      updatePostMutation.mutate(values)
    } else {
      createPostMutation.mutate(values)
    }
  }

  const handleEdit = (post: Post) => {
    form.reset({
      id: post.id,
      title: post.title,
      subject: post.subject,
      body: post.body,
      images: post.images ?? [],
    })
    setImagePreviews(post.images ?? [])
    setActiveTab("manage")
  }

  const handleNewPost = () => {
    form.reset({
      id: undefined,
      title: "",
      subject: "",
      body: "",
      images: [],
    })
    setImagePreviews([])
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const uploadedImages: string[] = []
    const newPreviews: string[] = []

    for (const file of files) {
      try {
        const signedURLResponse = await getSignedURL()
        if (signedURLResponse.failure !== undefined) {
          toast({
            title: "Error",
            description: signedURLResponse.failure,
            variant: "destructive",
          })
          continue
        }

        const url = signedURLResponse.success.url
        const response = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const imageUrl = url.split('?')[0]
        uploadedImages.push(imageUrl)
        newPreviews.push(URL.createObjectURL(file))
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "Error",
          description: `Failed to upload image ${file.name}. Please try again.`,
          variant: "destructive",
        })
      }
    }

    const currentImages = form.getValues("images")
    form.setValue("images", [...currentImages, ...uploadedImages])
    setImagePreviews([...imagePreviews, ...newPreviews])

    toast({
      title: "Success",
      description: `${uploadedImages.length} image(s) uploaded successfully`,
    })
  }

  const handleRemoveImage = (index: number) => {
    const currentImages = form.getValues("images")
    const newImages = [...currentImages]
    newImages.splice(index, 1)
    form.setValue("images", newImages)

    const newPreviews = [...imagePreviews]
    newPreviews.splice(index, 1)
    setImagePreviews(newPreviews)
  }

  if (isLoading) return <div className="flex items-center justify-center h-screen"><Skeleton className='w-2/3 h-2/3'/></div>
  if (isError) return <div className="flex items-center justify-center h-screen">Error fetching posts</div>

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen">
            <div className="flex justify-between items-center mb-8 mt-8">
        <h1 className="text-4xl text-primary">add stuff</h1>
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
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <AnimatePresence>
            {Array.isArray(posts) && posts.map((post: Post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4 overflow-hidden">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.images && post.images.length > 0 && (
                      <div className="flex space-x-2 mb-4 overflow-x-auto">
                        {post.images.map((image, index) => (
                          <Image key={index} src={image} alt={`${post.title} ${index + 1}`} width={100} height={100} className="object-cover rounded" />
                        ))}
                      </div>
                    )}
                    <p className="mb-4">{post.body}</p>
                                     <div className="flex justify-end items-center space-x-2">
                        <Button
                          onClick={() => handleEdit(post)}
                          variant="secondary"
                          size="sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the post.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deletePostMutation.mutate(post.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </TabsContent>
      
          <TabsContent value="manage">
        <Card>
          <CardHeader>
            <CardTitle>{form.getValues("id") !== undefined ? 'Edit Post' : 'Create New Post'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter post body" {...field} className="min-h-[100px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                      control={form.control}
                      name="images"
                      render={() => (
                        <FormItem>
                          <FormLabel>Images</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                multiple
                                className="hidden"
                                id="image-upload"
                              />
                              <label
                                htmlFor="image-upload"
                                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                              >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Upload Images
                              </label>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                {imagePreviews.map((preview, index) => (
                                  <div key={index} className="relative">
                                    <Image src={preview} alt={`Preview ${index + 1}`} width={100} height={100} className="object-cover rounded" />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                <div className="flex justify-between">
                    <Button type="submit" className="gap-2 mt-4" variant="outline">
                      {form.getValues("id") !== undefined ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                      {form.getValues("id") !== undefined ? 'Save Changes' : 'Create Post'}
                    </Button>
                    </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  )

}