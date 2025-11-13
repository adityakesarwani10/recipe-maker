"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Star, Leaf, Drumstick } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface RecipeCardProps {
  title: string
  image: string
  category: string
  prepTime: string
  difficulty: string
  rating: number
  href: string
  isVeg: boolean
  showVegBadge?: boolean
}

export default function RecipeCard({
  title,
  image,
  category,
  prepTime,
  difficulty,
  rating,
  href,
  isVeg,
  showVegBadge = false,
}: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <Link href={href} onMouseEnter={() => !isMobile && setIsHovered(true)} onMouseLeave={() => !isMobile && setIsHovered(false)}>
      <motion.div
        className="group bg-card dark:bg-card/80 rounded-2xl overflow-hidden border border-border/50 shadow-sm h-full w-64 md:w-72"
        whileHover={isMobile ? {} : {
          y: -10,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className={cn("object-cover", isMobile ? "scale-100" : "transition-transform duration-700", isHovered && !isMobile ? "scale-110" : "scale-100")}
          />
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none">{category}</Badge>

            {showVegBadge && (
              <Badge
                className={cn(
                  "border-none text-white",
                  isVeg ? "bg-green-500 hover:bg-green-600" : "bg-amber-600 hover:bg-amber-700",
                )}
              >
                {isVeg ? (
                  <span className="flex items-center">
                    <Leaf size={12} className="mr-1" />
                    Veg
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Drumstick size={12} className="mr-1" />
                    Non-Veg
                  </span>
                )}
              </Badge>
            )}
          </div>

          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {!isMobile && (
            <motion.div
              className="absolute bottom-3 right-3 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Recipe
              </motion.div>
            </motion.div>
          )}
        </div>

        <div className="p-4">
          <h3 className={cn("font-semibold text-lg line-clamp-1", isMobile ? "text-foreground" : "group-hover:text-rose-500 transition-colors")}>{title}</h3>

          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {prepTime}
            </div>
            <div>{difficulty}</div>
          </div>

          <div className="flex items-center mt-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    "fill-current",
                    i < Math.floor(rating)
                      ? "text-amber-400"
                      : i < rating
                        ? "text-amber-400/50"
                        : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{rating?.toFixed(1)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
