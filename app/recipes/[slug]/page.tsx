"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Clock, Heart, Share2, Bookmark, Star, User, ChefHat, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import RecipeCard from "@/components/recipe-card"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"
import axios from 'axios'
interface Recipe {
  slug: string;
  message: {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  chef: string;
  videoUrl: string;
  ingredients: string[];
  instructions: string[];
  isVeg: boolean;
  createdAt: string;
  updatedAt: string;}
  
}

interface RecipePageProps {
  params: {
    slug: string;
  }
}

export default function RecipePage({ params }: RecipePageProps) {
  const { slug } = use(params)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
            `/api/v1/recipes/${slug}`
          );
        if (!response.ok) {
          if (response.status === 404) {
            setError("Recipe not found")
            return
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        console.log(data.message?.image)
        if (data.success) {
          setRecipe(data)
        } else {
          setError(data.message || "Failed to fetch recipe")
        }
      } catch (err) {
        console.error("Error fetching recipe:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-[50vh] w-full rounded-xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-8" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    if (error === "Recipe not found") {
      notFound()
    }
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Recipe</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!recipe) {
    notFound()
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={recipe.message.image || "/placeholder.svg"} alt={recipe.message.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-rose-500 hover:bg-rose-600 text-white border-none">{recipe.message.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{recipe.message.title}</h1>
              <p className="text-white/90 text-lg mb-6">{recipe.message.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>By {recipe.message.chef}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>Prep: {recipe.message.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <ChefHat size={18} className="mr-2" />
                  <span>Cook: {recipe.message.cookTime}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`fill-current ${i < Math.floor(recipe.message.rating) ? "text-amber-400" : "text-white/30"}`}
                      />
                    ))}
                  </div>
                  {/* <span className="ml-2">{recipe.rating.toFixed(1)}</span> */}
                </div>
              </div>
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
            <Link href="/recipes" className="hover:text-foreground">
              Recipes
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <Link href={`/categories/${recipe.message.category.toLowerCase()}`} className="hover:text-foreground">
              {recipe.message.category}
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-foreground font-medium">{recipe.message.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Recipe Details */}
          <div className="w-full lg:w-2/3">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-colors ${
                    isLiked
                      ? "bg-rose-500 text-white border-rose-500"
                      : "bg-transparent hover:bg-muted border-muted-foreground/20"
                  }`}
                >
                  <Heart size={18} className={isLiked ? "fill-white" : ""} />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-colors ${
                    isSaved
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-transparent hover:bg-muted border-muted-foreground/20"
                  }`}
                >
                  <Bookmark size={18} className={isSaved ? "fill-white" : ""} />
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 size={18} />
                  <span className="sr-only">Share</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Printer size={18} />
                  <span className="sr-only">Print</span>
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="video" className="mb-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="pt-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={recipe.message?.videoUrl}
                    title="Recipe Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="pt-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.message.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="instructions" className="pt-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {recipe.message.instructions.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Related Recipes */}
          {/* <div className="w-full lg:w-1/3">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
              <div className="grid gap-4">
                {recipe.relatedRecipes.length > 0 ? (
                  recipe.relatedRecipes.map((relatedRecipe, index) => (
                    <Link key={index} href={relatedRecipe.href} className="flex items-center gap-3 group">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedRecipe.image || "/placeholder.svg"}
                          alt={relatedRecipe.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-rose-500 transition-colors">
                          {relatedRecipe.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{relatedRecipe.category}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted-foreground">No related recipes found.</p>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* More Recipes Section */}
      {/* <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">More {recipe.category} Recipes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipe.relatedRecipes.length > 0 ? (
              recipe.relatedRecipes.map((relatedRecipe, index) => (
                <RecipeCard
                  key={index}
                  title={relatedRecipe.title}
                  image={relatedRecipe.image}
                  category={relatedRecipe.category}
                  prepTime={relatedRecipe.prepTime}
                  difficulty={relatedRecipe.difficulty}
                  rating={relatedRecipe.rating}
                  href={relatedRecipe.href} isVeg={false}                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-4 text-center py-12">No related recipes found.</p>
            )}
          </div>
        </div>
      </section> */}
    </div>
  )
}
