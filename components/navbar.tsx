"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function guestNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
    >
      <div
        className={cn(
          "mx-auto transition-all duration-500 backdrop-blur-lg",
          isScrolled ? "bg-background/70 dark:bg-background/80 border-b shadow-sm py-3" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="relative w-10 h-10"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image src="/logo.png" alt="Cuisine Logo" fill className="object-contain" />
              </motion.div>
              <motion.span
                className={cn(
                  "font-bold text-2xl transition-colors bg-gradient-to-r bg-clip-text text-transparent",
                  isScrolled ? "from-foreground to-foreground/70" : "from-white to-white/80",
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Cuisine
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/" isScrolled={isScrolled}>
                Home
              </NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center px-4 py-2 rounded-full transition-all",
                      isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
                    )}
                  >
                    Categories
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-[200px] p-2 rounded-xl backdrop-blur-lg bg-background/80 border-border/50"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/categories/indian" className="cursor-pointer rounded-lg">
                      Indian
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories/italian" className="cursor-pointer rounded-lg">
                      Italian
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories/chinese" className="cursor-pointer rounded-lg">
                      Chinese
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories/desserts" className="cursor-pointer rounded-lg">
                      Desserts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories" className="cursor-pointer rounded-lg text-rose-500">
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink href="/about" isScrolled={isScrolled}>
                About
              </NavLink>

              <NavLink href="/contact" isScrolled={isScrolled}>
                Contact
              </NavLink>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  "rounded-full p-2 transition-colors flex items-center justify-center",
                  isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
                )}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                <span className="sr-only">Search</span>
              </motion.button>

              {/* Theme Toggle */}
              <ThemeToggle isScrolled={isScrolled} />

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className={cn(
                      "rounded-full transition-all duration-300",
                      isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
                    )}
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-glow-sm hover:shadow-glow transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "rounded-full p-2 transition-colors md:hidden flex items-center justify-center",
                      isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
                    )}
                  >
                    <Menu size={20} />
                    <span className="sr-only">Menu</span>
                  </motion.button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 border-l-rose-500/20">
                  <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                      <div className="relative w-10 h-10">
                        <Image src="/images/logo.png" alt="Cuisine Logo" fill className="object-contain" />
                      </div>
                      <span className="font-bold text-2xl">Cuisine</span>
                    </Link>

                    <nav className="flex flex-col gap-4">
                      <Link
                        href="/"
                        className="flex items-center text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href="/categories"
                        className="flex items-center text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        Categories
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        Contact
                      </Link>

                      <div className="border-t my-4 pt-4">
                        <Link
                          href="/sign-in"
                          className="flex items-center text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          Get Started
                        </Link>
                        <Link href="/sign-up" className="mt-2">
                          <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">Sign Up</Button>
                        </Link>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for recipes, ingredients, cuisines..."
                    className="pl-10 py-6 rounded-xl bg-background/80 dark:bg-muted/30 backdrop-blur-md"
                    autoFocus={isSearchOpen}
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isScrolled: boolean
}

function NavLink({ href, children, isScrolled }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center px-4 py-2 rounded-full transition-all group",
        isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
      )}
    >
      {children}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-rose-500 group-hover:w-1/2 transition-all duration-300 -translate-x-1/2" />
    </Link>
  )
}
