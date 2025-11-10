import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import NavSwitcher from "@/components/NavSwitcher"
import { AppProvider } from "@/context/AppProvider"
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppProvider>
            <div className="flex flex-col min-h-screen ">
              <NavSwitcher />
              <main className="flex-1">
                {children}
                <Toaster />
              </main>
              <Footer />
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
