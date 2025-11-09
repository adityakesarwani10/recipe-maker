"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  name: string
  image: string
  count: number
  href: string
  icon?: string
  className?: string
}

export default function CategoryCard({ name, image, count, href, icon, className }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn("block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl aspect-square w-60 group"
        whileHover={{
          y: -10,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        <Image
          // src={image || "/placeholder.svg"}
          src={"/placeholder.svg"}
          alt={name}
          fill
          className={cn("object-cover transition-transform duration-700", isHovered ? "scale-110" : "scale-100")}
        />

        {icon && (
          <motion.div
            className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-2 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0.8,
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-8 h-8">
              <Image 
              // src={icon || "/placeholder.svg"} 
              src={"/placeholder-logo.svg"}
              alt={`${name} icon`} fill className="object-contain" />
            </div>
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <motion.h3
            className="text-white font-bold text-xl"
            animate={{
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          <motion.p
            className="text-white/80 text-sm"
            animate={{
              y: isHovered ? -5 : 0,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {count} recipes
          </motion.p>
        </div>

        <motion.div
          className="absolute inset-0 border-2 border-rose-500/0 rounded-2xl z-30"
          animate={{
            borderColor: isHovered ? "rgba(244, 63, 94, 0.5)" : "rgba(244, 63, 94, 0)",
            boxShadow: isHovered ? "0 0 20px rgba(244, 63, 94, 0.3)" : "0 0 0px rgba(244, 63, 94, 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  )
}
