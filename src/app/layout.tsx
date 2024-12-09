import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/app/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { Nav } from './components/nav'
import { Footer } from './components/footer'
import { ThemeToggle } from '@/app/components/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Food Delivery App',
  description: 'A Swiggy-like food delivery application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Nav />
              <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                  <div className="flex justify-end mb-4">
                    <ThemeToggle />
                  </div>
                  {children}
                </div>
              </main>
              <Footer />
            </div>
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

