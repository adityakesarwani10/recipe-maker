"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import RecipeCard from "@/components/recipe-card"
import axios from "axios"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [slug, setSlug] = useState<string>("")
  const [recipes, setRecipes] = useState<any[]>([])
  const hasFetched = useRef(false)

  useEffect(() => {
    const fetchParams = async () => {
      const { slug: paramSlug } = await params
      setSlug(paramSlug)
    }
    fetchParams()
  }, [params])

  useEffect(() => {
    if (!slug || hasFetched.current) return
    hasFetched.current = true

    const getCategoryRecipes = async () => {
      try {
        const res = await axios.get(`/api/recipes?category=${encodeURIComponent(slug)}&limit=20`)
        // console.log("response: " , res)
        setRecipes(res.data.success ? res.data.data : [])
      } catch (error) {
        console.error('Error fetching category recipes:', error)
        setRecipes([])
      }
    }
    getCategoryRecipes()
  }, [slug])

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ')
  const categoryDescriptions: { [key: string]: string } = {
    indian: "Discover the rich and diverse flavors of Indian cuisine, from spicy curries to aromatic biryanis.",
    chinese: "Explore the authentic flavors of Chinese cuisine, from stir-fries to dumplings and noodle dishes.",
    italian: "Savor the authentic flavors of Italy with our collection of pasta, pizza, and other Italian classics.",
    mexican: "Experience the bold and vibrant tastes of Mexican cuisine with our collection of traditional recipes.",
    desserts: "Indulge in sweet treats and decadent desserts from around the world.",
    breakfast: "Start your day right with our collection of delicious breakfast recipes."
  }

  const description = categoryDescriptions[slug] || `Explore our collection of delicious ${categoryName.toLowerCase()} recipes.`

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src={`/images/categories/${slug}-banner.jpg`}
          alt={categoryName}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">{categoryName} Cuisine</h1>
              <p className="text-white/90 text-lg">{description}</p>
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
            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-foreground font-medium">{categoryName} Cuisine</span>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular {categoryName} Recipes</h2>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe: any, index: number) => (
              <RecipeCard
                
                key={recipe._id || recipe.slug || `recipe-${index}`}
                title={recipe.title}
                image={recipe.image}
                category={recipe.category}
                prepTime={recipe.prepTime}
                difficulty={recipe.difficulty}
                rating={recipe.rating}
                href={`/recipes/${recipe.slug}`}
                isVeg={recipe.isVeg}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recipes found for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
