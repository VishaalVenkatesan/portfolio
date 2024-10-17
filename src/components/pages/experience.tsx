"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { SectionContainer } from "../global/section-container"

export default function Experience() {
  const experiences = [
    {
      title: "Full-Stack Developer Intern",
      company: "Neoperk",
      duration: "Jun 2024 - Current",
      location: "Remote",
      description: [
        "Developed interactive dashboards with Next.js, D3.js, and Chart.js for agricultural insights.",
        "Implemented JWT auth, TypeScript, and modern UI components for secure, scalable UX.",
        "Optimized frontend performance and API responsiveness using GCP and Vercel.",
        "Built an internal Admin Panel for efficient user and content management."
      ],
      links: [{ url: "https://neoperk.co", label: "Neoperk" }],
      skills: ["Next.js", "D3.js", "Chart.js", "TypeScript", "JWT", "GCP", "Vercel", "Node.js", "Framer", "Zustand", "Firebase"]
    },
    {
      title: "Summer Intern",
      company: "Codincity",
      duration: "Jun 2023 - Aug 2023",
      location: "Bengaluru, KA",
      description: [
        "Developed high-performance C data structures for Python integration.",
        "Led project on extending Python ecosystems with C libraries.",
        "Collaborated with mentors to overcome challenges and deliver quality results."
      ],
      skills: ["C", "Python", "Data Structures", "Interoperability", "CFFI"],
      links:[{url: "https://www.codincity.com/", label: "Codincity"}]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <section id="experience" className="py-16 bg-gradient-to-b from-background to-secondary/10 m-5">
      <SectionContainer>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2 
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Professional Experience
          </motion.h2>
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold">{exp.title}</CardTitle>
                      <CardDescription className="text-base font-medium ">
                        {exp.company} | {exp.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold px-2 py-1">
                      {exp.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="list-disc list-inside space-y-2 mb-4 text-base">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                  {exp.links && exp.links.length > 0 && (
                    <div className="mb-4 ">
                      {exp.links.map((link, idx) => (
                        <Link key={idx} href={link.url} target="_blank" rel="noopener noreferrer" 
                          className="text-primary hover:text-primary/80 flex items-center transition-colors duration-200 text-base">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>
    </section>
  )
}