'use client'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {NextUIProvider} from '@nextui-org/react'

export default function Providers({children}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
    <NextUIProvider>
      {children}
    </NextUIProvider>
    </NextThemesProvider>
  )
}