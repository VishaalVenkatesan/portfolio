import type { StaticImageData } from 'next/image';

export type Project = {
  title: string;
  description: string;
  images: StaticImageData[];
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

export type Post = {
  id: number;
  title: string;
  subject: string;
  body: string;
  createdAt: Date;
  images: string[];
}