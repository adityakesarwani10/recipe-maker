"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  isScrolled?: boolean
}

export default function ThemeToggle({ isScrolled }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isScrolled ? "bg-muted" : "bg-white/10",
        )}
      />
    )
  }

  const isDark = theme === "dark"

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-colors relative overflow-hidden",
        isScrolled ? "bg-muted hover:bg-muted/80" : "bg-white/10 hover:bg-white/20",
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 45 : 0,
          scale: isDark ? 0.2 : 1,
          y: isDark ? -25 : 0,
        }}
        transition={{ duration: 0.5, type: "spring" }}
        className={cn("absolute w-6 h-6 rounded-full", isScrolled ? "bg-amber-400" : "bg-amber-300")}
      />

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -45,
          scale: isDark ? 1 : 0.2,
          y: isDark ? 0 : 25,
        }}
        transition={{ duration: 0.5, type: "spring" }}
        className={cn("absolute w-5 h-5 rounded-full", isScrolled ? "bg-slate-700" : "bg-slate-800")}
      />

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
