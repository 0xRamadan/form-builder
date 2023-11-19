import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import DesignContextProvider from '@/components/context/DesignerContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Page Form',
  description: 'Website that let you create a form with any fields you want.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <DesignContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster/>
            </ThemeProvider>
          </DesignContextProvider>
        </body>
      </html>
    </ClerkProvider >
  )
}
