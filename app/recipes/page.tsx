"use client"

import { useState, useEffect } from "react"
import RecipeCard from "@/components/recipe-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

interface Recipe {
  _id: string
  title: string
  description: string
  image: string
  category: string
  prepTime: string
  cookTime: string
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  rating: number
  chef: string
  videoUrl: string
  ingredients: string[]
  instructions: string[]
  isVeg: boolean
  slug: string
  createdAt: string
  updatedAt: string
}

interface PaginationData {
  currentPage: number
  totalPages: number
  totalRecipes: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const limit = 12 // Fixed limit for display

  const fetchRecipes = async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/recipes?page=${page}&limit=${limit}`)
      const data = await response.json()
      console.log(data)
      if (data.success) {
        setRecipes(data.data)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error("Error fetching recipes:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-10 mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">All Recipes</h1>
        <p className="text-muted-foreground text-center">
          Discover delicious recipes from around the world
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                title={recipe.title}
                image={recipe.image}
                category={recipe.category}
                prepTime={recipe.prepTime}
                difficulty={recipe.difficulty}
                rating={recipe.rating}
                href={`/recipes/${recipe.slug}`}
                isVeg={recipe.isVeg}
                showVegBadge={true}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={pagination.hasPrevPage ? "cursor-pointer" : "pointer-events-none opacity-50"}
                  />
                </PaginationItem>

                {/* Simple pagination: show current page and next if available */}
                <PaginationItem>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                {pagination.hasNextPage && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="cursor-pointer"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={pagination.hasNextPage ? "cursor-pointer" : "pointer-events-none opacity-50"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  )
}
