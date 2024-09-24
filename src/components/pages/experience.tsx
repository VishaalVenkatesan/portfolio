"use client"
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SectionContainer } from "../global/section-container";

export default function Experience() {
  const experiences = [
    {
      title: "Full-Stack Developer Intern",
      company: "Neoperk",
      duration: "Jun 2024 - Current",
      location: "Remote",
      description: [
        "Driving the end-to-end development of advanced, interactive dashboards using Next.js, leveraging the power of D3.js and Chart.js to create sophisticated, dynamic data visualisations that empower farmers with actionable agricultural insights.",
        "Spearheading the integration of JWT authentication, TypeScript, and modern UI components to ensure a secure, scalable, and seamless user experience across devices. Collaborating closely with cross-functional teams to iterate on requirements, incorporating continuous feedback to enhance dashboard functionality, responsiveness, and accessibility.",
        "Optimising performance through meticulous front-end engineering practices, working in tandem with backend developers to fine-tune API responsiveness and streamline GCP cloud hosting solutions, resulting in faster load times and higher user engagement. Leveraging Vercel for deployment to ensure reliable, scalable, and efficient hosting.",
        "Building an internal Admin Panel for Neoperk to seamlessly manage users, data, and content, enhancing operational efficiency and enabling the team to make data-driven decisions."
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
        "Developed High-Performance Interoperable Data Structures using C Programming Language to be integrated with the Python software development ecosystems, resulting in improved efficiency and performance of Python applications.",
        "Spearheaded the final project \"Extending Python Ecosystems with high-performance C Libraries\", contributing to enhanced capabilities and efficiency, with positive feedback from peers and mentors.",
        "Collaborated closely with my mentor to navigate challenges and deliver high-quality results."
      ],
      skills: ["C", "Python", "Data Structures", "Interoperability", "CFFI"],
      links:[{url: "https://www.codincity.com/", label: "Codincity"}]
    }
  ];

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };


  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 bg-inherit">
        <SectionContainer>
          <motion.h1 className="text-2xl font-semibold mb-4 ">
            Professional Experience
          </motion.h1>
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{exp.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {exp.company} | {exp.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {exp.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className=" list-outside list-disc space-y-3 mb-4">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                  {exp.links && exp.links.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Related Links:</h4>
                      <ul className="space-y-1">
                        {exp.links.map((link, idx) => (
                          <li key={idx}>
                            <Link href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 flex items-center">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.2 }}
                      >
                        <Badge variant="outline">{skill}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </SectionContainer>
      </div>
    </section>
  );
}