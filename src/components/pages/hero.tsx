"use client"

import React, { useState, useEffect } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { Linkedin, Mail, Github, Instagram, Menu, Home, Briefcase, FolderGit2, Image, PhoneCall } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/vishaalvenkatesan/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vishaalvo3@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/VishaalVenkatesan", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/vishaal_venkatesan", label: "Instagram" },
];

const navLinks = [
  { title: "Home", href: "#home", icon: Home },
  { title: "Experience", href: "#experience", icon: Briefcase },
  { title: "Projects", href: "#projects", icon: FolderGit2 },
  { title: "Gallery", href: "#gallery", icon: Image, hideOnMobile: true },
  { title: "Contact", href: "#contact", icon: PhoneCall },
];

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <div className="md:block hidden"><Boxes /></div>
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="fixed top-4 right-4 z-50 bg-white bg-opacity-20 backdrop-blur-lg rounded-full shadow-lg hover:bg-opacity-30 transition-all duration-300"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <nav className="flex flex-col space-y-4 mt-6">
            {navLinks.map((link, index) => (
              (!link.hideOnMobile || windowWidth >= 768) && (
                <Link
                  key={index}
                  href={link.href}
                  className="text-lg hover:text-gray-300 transition-colors flex items-center space-x-2 hover:underline"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.title}</span>
                </Link>
              )
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="relative z-30 text-center px-4 md:px-10 max-w-4xl" id="home">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold mb-6 font-serif"
        >
          VV.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 text-white"
        >
          Vishaal is a Full-Stack Developer based in Bengaluru. He is fueled by simplicity, IKEA plants, and the world. Studying CS at MUJ.
        </motion.p>

        <div className="flex flex-col justify-center items-center space-y-6 md:space-y-6 md:space-x-6 mt-8">
          <motion.div
            className="flex justify-center space-x-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map((link, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-3 hover:bg-opacity-30 transition-all duration-300"
                  >
                    <link.icon className="w-6 h-6" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}