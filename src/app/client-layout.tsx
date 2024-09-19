"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/global/Footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
        {children}
        <Toaster />
        <Footer />
    </ThemeProvider>
  );
}