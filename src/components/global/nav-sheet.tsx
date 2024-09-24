import React, { useState, useEffect } from "react";
import { Home, Briefcase, FolderGit2, Image, PhoneCall, NotebookText, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function NavSheet() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { title: "Home", href: "/", icon: Home },
    { title: "Experience", href: "/#experience", icon: Briefcase },
    { title: "Projects", href: "/#projects", icon: FolderGit2 },
    { title: "Gallery", href: "/#gallery", icon: Image, hideOnMobile: true },
    { title: "Blog", href: "/blog", icon: NotebookText },
    { title: "Contact", href: "/#contact", icon: PhoneCall },
  ];

  return (
    <div className="">
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
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
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
    </div>
  );
}