import React from 'react'
import { Post } from '@/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Edit2, Trash2 } from 'lucide-react'
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
import Image from 'next/image'
import DOMPurify from 'dompurify'

interface PostListProps {
  posts: Post[]
  onEdit: (post: Post) => void
}

export function PostList({ posts, onEdit }: PostListProps) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

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

  return (
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
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} className="mb-4" />
                <div className="flex justify-end items-center space-x-2">
                  <Button
                    onClick={() => onEdit(post)}
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
  )
}