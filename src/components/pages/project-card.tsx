import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation, PanInfo } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();

  const nextImage = () => {
    if (currentImageIndex < project.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && currentImageIndex > 0) {
      prevImage();
    } else if (info.offset.x < -swipeThreshold && currentImageIndex < project.images.length - 1) {
      nextImage();
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-auto overflow-hidden">
      <CardHeader className="relative h-64">
        <AnimatePresence initial={false} custom={currentImageIndex}>
          <motion.div
            key={currentImageIndex}
            custom={currentImageIndex}
            initial={{ opacity: 0}}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
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
            <motion.button
              key={idx}
              className={`w-2 h-2 rounded-full bg-gray-400`}
              animate={{
                scale: idx === currentImageIndex ? 1.2 : 1,
                backgroundColor: idx === currentImageIndex ? "#ffffff" : "#9ca3af"
              }}
              onClick={() => setCurrentImageIndex(idx)}
            />
          ))}
        </div>
        {project.images.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={prevImage}
              disabled={currentImageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={nextImage}
              disabled={currentImageIndex === project.images.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold mb-2">{project.title}</CardTitle>
        <div className="mb-4 mt-4">
            <p>{project.description}</p>
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