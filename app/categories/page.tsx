"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import CategoryCard from "@/components/category-card"
import axios from "axios"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const getCategories = async () => {
      try {
        const res = await axios.get('/api/recipes?categories=true')
        setCategories(res.data.success ? res.data.data : [])
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      }
    }
    getCategories()
  }, [])

  // Fallback categories if API fails
  const fallbackCategories = [
    {
      name: "Indian",
      image: "/indian.jpg",
      count: 120,
      href: "/categories/indian",
      icon: "/images/icons/indian-icon.png"
    },
    {
      name: "Italian",
      image: "/italian.jpg",
      count: 85,
      href: "/categories/italian",
      icon: "/images/icons/italian-icon.png"
    },
    {
      name: "Chinese",
      image: "/chinese.jpg",
      count: 95,
      href: "/categories/chinese",
      icon: "/images/icons/chinese-icon.png"
    },
    {
      name: "Mexican",
      image: "/mexican.jpg",
      count: 75,
      href: "/categories/mexican",
      icon: "/images/icons/mexican-icon.png"
    },
    {
      name: "Desserts",
      image: "/dessert.jpg",
      count: 110,
      href: "/categories/desserts",
      icon: "/images/icons/dessert-icon.png"
    },
    {
      name: "Street Food",
      image: "/street-food.jpg",
      count: 65,
      href: "/categories/street-food",
      icon: "/images/icons/street-food-icon.png"
    },
    {
      name: "Breakfast",
      image: "/pancakes.jpg",
      count: 90,
      href: "/categories/breakfast",
      icon: "/images/icons/breakfast-icon.png"
    },
    {
      name: "Thai",
      image: "/thai-green-curry.jpg",
      count: 55,
      href: "/categories/thai",
      icon: "/images/icons/thai-icon.png"
    }
  ]

  const displayCategories = categories.length > 0 ? categories.map((cat: any) => ({
    name: cat.name,
    image: `/${cat.name.toLowerCase()}.jpg`,
    count: cat.count,
    href: `/categories/${cat.name.toLowerCase().replace(' ', '-')}`,
    icon: `/images/icons/${cat.name.toLowerCase().replace(' ', '-')}-icon.png`
  })) : fallbackCategories

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/bg-hero.jpeg"
          alt="Categories"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">Explore All Categories</h1>
              <p className="text-white/90 text-lg">
                Discover recipes from cuisines around the world. From traditional dishes to modern twists,
                find your next favorite recipe in our extensive collection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-foreground font-medium">Categories</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Cuisine</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of recipes organized by cuisine type.
            Whether you're craving Italian pasta or Indian curries, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCategories.map((category: any) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
              count={category.count}
              href={category.href}
              icon={category.icon}
            />
          ))}
        </div>

        {displayCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
