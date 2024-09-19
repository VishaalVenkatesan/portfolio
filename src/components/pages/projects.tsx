"use client"
import React from 'react';
import ProjectCard from './project-card';
import podiumetrics from "@/public/podiumetrics.png"
import express from "@/public/express.png"
import { university1, university2, university3, university4, university5, university6 } from '@/public/university-images';
import { dashboard1, dashboard2, dashboard3, dashboard4 } from '@/public/dashboard';
import { admin1, admin2 } from '@/public/admin';
import { motion } from 'framer-motion';

import { Project } from '@/lib/types';


const projects: Project[] = [
  {
    title: "Neoperk Agri Dashboard",
    description: [
      "Developed interactive dashboards using Next.js, D3.js, and Chart.js for agricultural insights.",
      "Implemented JWT authentication and TypeScript for secure, scalable user experience.",
      "Optimized front-end performance and integrated with backend APIs.",
      "Utilized GCP and Vercel for reliable, scalable hosting."
    ],
    images: [dashboard1, dashboard2, dashboard3, dashboard4],
    technologies: ["Next.js", "D3.js", "Chart.js", "TypeScript", "JWT", "GCP", "Vercel", "Zustand"],
    liveLink: "https://dashboard.neoperk.co"
  },
  {
    title: "Admin Panel",
    description: [
      "Built comprehensive admin panel with user management and role-based access control.",
      "Created interfaces for data management, reporting, and system configuration.",
      "Implemented real-time updates and notifications for critical events.",
      "Ensured responsive design for cross-device accessibility."
    ],
    images: [admin1, admin2],
    technologies: ["Next.js", "TypeScript", "JWT", "GCP", "Vercel", "Firebase"],
  },
  {
    title: "Podiumetrics",
    description: [
      "Developed intuitive interface using Next.js, Tailwind CSS, and NextUI.",
      "Integrated multiple APIs for race results, standings, and national flags.",
      "Enhanced user engagement through rich data presentation and insights."
    ],
    images: [podiumetrics],
    technologies: ["Next.js", "Tailwind CSS", "NextUI", "API Integration", "Firebase"],
    liveLink: "https://www.podiumetrics.vercel.app"
  },
  {
    title: "Express Agency Website",
    description: [
      "Built full-stack CRUD app with Next.js frontend and MongoDB backend.",
      "Implemented authentication using OAuth.js framework.",
      "Developed interactive features including contact forms and blog functionality."
    ],
    images: [express],
    technologies: ["Next.js", "MongoDB", "Mongoose", "OAuth.js", "CRUD"]
  },
  {
    title: "University Management System",
    description: [
      "Developed comprehensive system for student, fee, and course management.",
      "Applied advanced OOP principles in Java for complex business logic.",
      "Created intuitive interface using Java Swing GUI library."
    ],
    images: [university1, university2, university3, university4, university5, university6],
    technologies: ["Java", "Swing GUI", "OOP"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 ">
      <div className="container mx-auto px-4">
        <motion.h1 className="text-2xl font-semibold mb-4 ">
            Work
          </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project}  />
          ))}
        </div>
      </div>
    </section>
  );
}
