import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import HeroNav from "@/components/HeroNav"
import Navbar from "@/components/navbar"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cuisine - Modern Recipe Web App",
  description: "Discover delicious recipes from around the world"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const isLoggedIn = !!token

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen mb-4">
            {isLoggedIn ? <HeroNav /> : <Navbar />}
            <main className="flex-1">
              {children}
              <Toaster />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
