import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, updatePost } from "@/db/schema"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PlusCircle, Save, Image as ImageIcon, X } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import { getSignedURL } from '@/db/s3-config'
import { TiptapEditor } from './text-editor'

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  images: z.array(z.string()).default([]),
})

type FormData = z.infer<typeof formSchema>



export function PostForm({ post, onSuccess }: { post?: FormData; onSuccess: () => void }) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [imagePreviews, setImagePreviews] = useState<string[]>(post?.images || [])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: post || {
      title: "",
      subject: "",
      body: "",
      images: [],
    },
  })

  const createPostMutation = useMutation({
    mutationFn: (newPost: FormData) => createPost(newPost.title, newPost.subject, newPost.body, newPost.images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast({
        title: "Success",
        description: "Post created successfully",
      })
      onSuccess()
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
      onSuccess()
    },
  })

  const onSubmit = (values: FormData) => {
    if (values.id !== undefined) {
      updatePostMutation.mutate(values)
    } else {
      createPostMutation.mutate(values)
    }
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{post ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} className="text-lg" />
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
                    <Input placeholder="Enter post subject" {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={() => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Controller
                      name="body"
                      control={form.control}
                      render={({ field }) => (
                        <TiptapEditor content={field.value} onChange={field.onChange} />
                      )}
                    />
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
                    <div className="space-y-4">
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
                        className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disable:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Upload Images
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <Image src={preview} alt={`Preview ${index + 1}`} width={200} height={200} className="object-cover rounded-lg transition-opacity group-hover:opacity-75" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
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
            <div className="flex justify-end">
              <Button type="submit" className="gap-2 mt-4" size="lg">
                {post ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                {post ? 'Save Changes' : 'Create Post'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}