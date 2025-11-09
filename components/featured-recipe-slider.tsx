"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, User, Leaf, Drumstick } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredRecipes = [
  {
    id: 1,
    title: "Creamy Garlic Tuscan Salmon",
    description: "Delicious salmon fillets smothered in a creamy garlic sauce with sun-dried tomatoes and spinach",
    image: "/tuscan-salmon.jpg",
    chef: "Gordon Ramsay",
    time: "30 min",
    category: "Seafood",
    href: "/recipes/creamy-garlic-tuscan-salmon",
    isVeg: false,
  },
  {
    id: 2,
    title: "Authentic Thai Green Curry",
    description: "A fragrant and spicy Thai curry with coconut milk, vegetables, and your choice of protein",
    image: "/thai-green-curry.jpg",
    chef: "Jamie Oliver",
    time: "45 min",
    category: "Thai",
    href: "/recipes/authentic-thai-green-curry",
    isVeg: false,
  },
  {
    id: 3,
    title: "Classic Tiramisu",
    description: "The perfect Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
    image: "/tiramisu.jpg",
    chef: "Nigella Lawson",
    time: "4 hours",
    category: "Dessert",
    href: "/recipes/classic-tiramisu",
    isVeg: true,
  },
]

export function FeaturedRecipeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredRecipes.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === featuredRecipes.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(goToNext, 6000)
    return () => {
      resetTimeout()
    }
  }, [currentIndex])

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="aspect-[21/9] md:aspect-[21/7] w-full relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <Image
                src={featuredRecipes[currentIndex].image || "/placeholder.svg"}
                alt={featuredRecipes[currentIndex].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-white/10 to-rose-500/0 skew-x-12"
              />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl space-y-6">
                    <div className="flex gap-2">
                      <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none">
                        {featuredRecipes[currentIndex].category}
                      </Badge>
                      <Badge
                        className={`border-none text-white ${
                          featuredRecipes[currentIndex].isVeg
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-amber-600 hover:bg-amber-700"
                        }`}
                      >
                        {featuredRecipes[currentIndex].isVeg ? (
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
                    </div>
                    <motion.h3
                      className="text-3xl md:text-5xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {featuredRecipes[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      className="text-white/90 text-lg md:text-xl line-clamp-2 md:line-clamp-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {featuredRecipes[currentIndex].description}
                    </motion.p>
                    <motion.div
                      className="flex items-center gap-6 text-white/80"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="flex items-center">
                        <User size={18} className="mr-2" />
                        {featuredRecipes[currentIndex].chef}
                      </div>
                      <div className="flex items-center">
                        <Clock size={18} className="mr-2" />
                        {featuredRecipes[currentIndex].time}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Link href={featuredRecipes[currentIndex].href}>
                        <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-6 text-lg shadow-glow-sm hover:shadow-glow-lg transition-all duration-300 hover:scale-105">
                          View Recipe
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full z-10 w-12 h-12 flex items-center justify-center backdrop-blur-sm"
        onClick={goToPrevious}
      >
        <ChevronLeft size={24} />
        <span className="sr-only">Previous</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full z-10 w-12 h-12 flex items-center justify-center backdrop-blur-sm"
        onClick={goToNext}
      >
        <ChevronRight size={24} />
        <span className="sr-only">Next</span>
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {featuredRecipes.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-rose-500 w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
