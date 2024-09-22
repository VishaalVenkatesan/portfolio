"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/global/Footer"
import { AuthContextProvider } from "@/firebase/auth-context";

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
        </QueryClientProvider>
        <Toaster />
        <Footer />
        </AuthContextProvider>
    </ThemeProvider>
  );
}