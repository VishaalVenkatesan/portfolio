"use client"
import React from 'react';
import ProjectCard from './project-card';
import podiumetrics from "@/public/podiumetrics.png"
import express from "@/public/express.png"
import { university1, university2, university3, university4, university5, university6 } from '@/public/university-images';
import { dashboard1, dashboard2, dashboard3, dashboard4 } from '@/public/dashboard';
import { admin2 } from '@/public/admin';
import { motion } from 'framer-motion';

import { Project } from '@/lib/types';


const projects: Project[] = [
  {
    title: "Neoperk Agri Dashboard",
    description: "Interactive agricultural dashboards using Next.js, D3.js, and Chart.js with JWT auth, optimized performance, and scalable hosting on GCP and Vercel.",
    images: [dashboard1, dashboard2, dashboard3, dashboard4],
    technologies: ["Next.js", "D3.js", "Chart.js", "TypeScript", "JWT", "GCP", "Vercel", "Zustand"],
    liveLink: "https://dashboard.neoperk.co"
  },
  {
    title: "Admin Panel",
    description: "Comprehensive admin panel with user management, RBAC, real-time updates, and responsive design for cross-device accessibility.",
    images: [admin2],
    technologies: ["Next.js", "TypeScript", "JWT", "GCP", "Vercel", "Firebase"],
  },
  {
    title: "Podiumetrics",
    description: "Intuitive race results interface using Next.js, Tailwind CSS, and NextUI, integrating multiple APIs for enhanced user engagement.",
    images: [podiumetrics],
    technologies: ["Next.js", "Tailwind CSS", "NextUI", "API Integration", "Firebase"],
    liveLink: "https://podiumetrics.vercel.app/"
  },
  {
    title: "Express Agency Website",
    description: "Full-stack CRUD app with Next.js frontend, MongoDB backend, OAuth.js authentication, and interactive features including contact forms and blog.",
    images: [express],
    technologies: ["Next.js", "MongoDB", "Mongoose", "OAuth.js", "CRUD"]
  },
  {
    title: "University Management System",
    description: "Comprehensive Java-based system for student, fee, and course management, utilizing OOP principles and Swing GUI for an intuitive interface.",
    images: [university1, university2, university3, university4, university5, university6],
    technologies: ["Java", "Swing GUI", "OOP"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 ">
      <div className="px-4">
        <motion.h1 className="text-2xl font-semibold mb-4 " >
            Projects
          </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project}  />
          ))}
        </div>
      </div>
    </section>
  );
}
