"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/global/Footer"
import { AuthContextProvider } from "@/firebase/auth-context";
import { Analytics } from "@vercel/analytics/react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(new QueryClient())
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <AuthContextProvider>
      <QueryClientProvider client={client}>
        {children}
        <Analytics/>
        </QueryClientProvider>
        <Toaster />
        <Footer />
        </AuthContextProvider>
    </ThemeProvider>
    
  );
}