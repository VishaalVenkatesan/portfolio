import React, { useState, useEffect } from "react";
import { Home, Briefcase, FolderGit2, Image, PhoneCall, NotebookText, Menu} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function ModernNavSheet() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="fixed top-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg hover:opacity-80 transition-opacity"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <VisuallyHidden>
        <SheetContent side="right" className="rounded-lg shadow-lg w-80 max-w-full">
          <nav className="flex flex-col space-y-8 px-6 py-4 mt-10">
            {navLinks.map((link, index) => (
              (!link.hideOnMobile || windowWidth >= 768) && (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-3 text-xl hover:opacity-80 transition-opacity hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.title}</span>
                </Link>
              )
            ))}
          </nav>
        </SheetContent>
        </VisuallyHidden>
      </Sheet>
    </div>
  );
}