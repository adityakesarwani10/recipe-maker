"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, TrendingUp } from "lucide-react"
import RecipeCard from "@/components/recipe-card"
import axios from "axios"

export default function TrendingPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const getTrendingRecipes = async () => {
      try {
        const res = await axios.get('/api/recipes?trending=true&limit=20')
        setRecipes(res.data.success ? res.data.data : [])
      } catch (error) {
        console.error('Error fetching trending recipes:', error)
        setRecipes([])
      }
    }
    getTrendingRecipes()
  }, [])

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/bg-hero.jpeg"
          alt="Trending Recipes"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-rose-500" size={32} />
                <h1 className="text-4xl font-bold text-white">Trending Now</h1>
              </div>
              <p className="text-white/90 text-lg">
                Discover the most popular recipes that everyone's talking about.
                These highly-rated dishes are loved by our community and are sure to impress.
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
            <span className="text-foreground font-medium">Trending</span>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Most Popular Recipes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These recipes have earned the highest ratings from our community.
            Try them out and see why they're trending!
          </p>
        </div>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe: any) => (
              <RecipeCard
                key={recipe._id || recipe.slug}
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
            <p className="text-muted-foreground">No trending recipes found yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
