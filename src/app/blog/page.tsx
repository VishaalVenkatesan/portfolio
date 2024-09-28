import Navbar from '@/components/global/Navbar'
import React from 'react'
import type { Metadata } from "next";
import BlogList from '@/components/blog/blog-list';

export const metadata: Metadata = {
  title: "Vishaal's Blogs",
  description: "Take a read through my blogs going through my journey as a developer",
};
export default function BlogPreviewPage() {
  return (
    <>
      <Navbar />
      <BlogList />
    </>
  )
}