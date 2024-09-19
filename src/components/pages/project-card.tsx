import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Card className="w-full max-w-md mx-auto h-auto overflow-hidden">
      <CardHeader className="relative h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={project.images[currentImageIndex]}
              alt={`Project image ${currentImageIndex + 1}`}
              fill={true}
              style={{objectFit: "contain"}}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className='p-3'
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {project.images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentImageIndex ? 'bg-white' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentImageIndex(idx)}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold mb-2">{project.title}</CardTitle>
        <div className="mb-4">
          <ul className="list-disc pl-5">
            {project.description.map((item, idx) => (
              <li key={idx} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <Badge key={idx} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6">
        {project.liveLink && (
          <Button variant="outline" asChild>
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              Live Demo <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
        {project.githubLink && (
          <Button variant="outline" asChild>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              GitHub <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}