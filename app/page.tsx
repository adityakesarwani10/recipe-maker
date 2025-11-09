"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Search, ChevronRight, Leaf, Drumstick, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategoryCard from "@/components/category-card"
import RecipeCard from "@/components/recipe-card"
import { FeaturedRecipeSlider } from "@/components/featured-recipe-slider"
import { cn } from "@/lib/utils"
import FilterSidebar from "@/components/filter-sidebar"
import FloatingElements from "@/components/floating-elements"
import Navbar from "@/components/navbar"

export default function Home() {
  const [isVeg, setIsVeg] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showSidebar, setShowSidebar] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])
  const translateY = useTransform(scrollY, [0, 300], [0, -50])

  const categories = [
    {
      name: "Indian",
      image: "/images/categories/indian.jpg",
      count: 120,
      href: "/categories/indian",
      icon: "/images/icons/indian-icon.png"
    },
    {
      name: "Italian",
      image: "/images/categories/italian.jpg",
      count: 85,
      href: "/categories/italian",
      icon: "/images/icons/italian-icon.png"
    },
    {
      name: "Chinese",
      image: "/images/categories/chinese.jpg",
      count: 95,
      href: "/categories/chinese",
      icon: "/images/icons/chinese-icon.png"
    },
    {
      name: "Mexican",
      image: "/images/categories/mexican.jpg",
      count: 75,
      href: "/categories/mexican",
      icon: "/images/icons/mexican-icon.png"
    },
    {
      name: "Desserts",
      image: "/images/categories/desserts.jpg",
      count: 110,
      href: "/categories/desserts",
      icon: "/images/icons/dessert-icon.png"
    },
    {
      name: "Street Food",
      image: "/images/categories/street-food.jpg",
      count: 65,
      href: "/categories/street-food",
      icon: "/images/icons/street-food-icon.png"
    }
  ]

  const trendingRecipes = [
    {
      title: "Spicy Chicken Pasta",
      image: "/images/recipes/spicy-chicken-pasta.jpg",
      category: "Italian",
      prepTime: "30 min",
      difficulty: "Medium",
      rating: 4.8,
      href: "/recipes/spicy-chicken-pasta",
      isVeg: false,
      showVegBadge: true
    },
    {
      title: "Crispy Chicken Burger",
      image: "/images/recipes/crispy-chicken-burger.jpg",
      category: "Fast Food",
      prepTime: "25 min",
      difficulty: "Easy",
      rating: 4.7,
      href: "/recipes/crispy-chicken-burger",
      isVeg: false,
      showVegBadge: true
    },
    {
      title: "Vegetable Biryani",
      image: "/images/recipes/vegetable-biryani.jpg",
      category: "Indian",
      prepTime: "45 min",
      difficulty: "Medium",
      rating: 4.6,
      href: "/recipes/vegetable-biryani",
      isVeg: true,
      showVegBadge: true
    },
    {
      title: "Chinese Wok Noodles",
      image: "/images/recipes/chinese-wok.jpg",
      category: "Chinese",
      prepTime: "20 min",
      difficulty: "Easy",
      rating: 4.6,
      href: "/recipes/chinese-wok-noodles",
      isVeg: true,
      showVegBadge: true
    },
    {
      title: "Chocolate Lava Cake",
      image: "/images/recipes/chocolate-lava-cake.jpg",
      category: "Desserts",
      prepTime: "40 min",
      difficulty: "Medium",
      rating: 4.9,
      href: "/recipes/chocolate-lava-cake",
      isVeg: true,
      showVegBadge: true
    },
    {
      title: "Butter Chicken",
      image: "/images/recipes/butter-chicken.jpg",
      category: "Indian",
      prepTime: "50 min",
      difficulty: "Medium",
      rating: 4.9,
      href: "/recipes/butter-chicken",
      isVeg: false,
      showVegBadge: true
    }
  ]

  const breakfastRecipes = [
    {
      title: "Avocado Toast",
      image: "/images/recipes/avocado-toast.jpg",
      category: "Breakfast",
      prepTime: "15 min",
      difficulty: "Easy",
      rating: 4.5,
      href: "/recipes/avocado-toast",
      isVeg: true,
      showVegBadge: true
    },
    {
      title: "Eggs Benedict",
      image: "/images/recipes/eggs-benedict.jpg",
      category: "Breakfast",
      prepTime: "25 min",
      difficulty: "Medium",
      rating: 4.7,
      href: "/recipes/eggs-benedict",
      isVeg: false,
      showVegBadge: true
    },
    {
      title: "Pancakes with Berries",
      image: "/images/recipes/pancakes.jpg",
      category: "Breakfast",
      prepTime: "20 min",
      difficulty: "Easy",
      rating: 4.8,
      href: "/recipes/pancakes-with-berries",
      isVeg: true,
      showVegBadge: true
    },
    {
      title: "Breakfast Burrito",
      image: "/images/recipes/breakfast-burrito.jpg",
      category: "Breakfast",
      prepTime: "25 min",
      difficulty: "Medium",
      rating: 4.6,
      href: "/recipes/breakfast-burrito",
      isVeg: false,
      showVegBadge: true
    },
    {
      title: "Smoothie Bowl",
      image: "/images/recipes/smoothie-bowl.jpg",
      category: "Breakfast",
      prepTime: "10 min",
      difficulty: "Easy",
      rating: 4.5,
      href: "/recipes/smoothie-bowl",
      isVeg: true,
      showVegBadge: true
    },
    {
      title: "French Toast",
      image: "/images/recipes/french-toast.jpg",
      category: "Breakfast",
      prepTime: "20 min",
      difficulty: "Easy",
      rating: 4.7,
      href: "/recipes/french-toast",
      isVeg: true,
      showVegBadge: true
    }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      
      {/* Floating Elements Animation */}
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70 z-10" />
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10 z-10" />

        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image src="/bg-hero.jpeg" alt="Background" fill className="object-cover opacity-60" priority />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center space-y-8"
            style={{ opacity, scale, y: translateY }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute -top-20 -left-20 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl z-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl z-0"
            />

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover <span className="text-rose-500 glow-text">Delicious</span> Recipes Instantly
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Search from thousands of curated meals from around the world
            </motion.p>

            <motion.div
              className="relative w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Input
                type="text"
                placeholder="Search for recipes, ingredients, or cuisines..."
                className="pl-12 pr-4 py-7 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70 focus-visible:ring-rose-500/50 focus-visible:ring-offset-0 focus-visible:border-rose-500/50 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(244, 63, 94, 0)",
                    "0 0 15px rgba(244, 63, 94, 0.3)",
                    "0 0 0px rgba(244, 63, 94, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md py-2 px-4 text-sm transition-all duration-300 hover:scale-105"
              >
                Popular
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md py-2 px-4 text-sm transition-all duration-300 hover:scale-105"
              >
                Quick & Easy
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md py-2 px-4 text-sm transition-all duration-300 hover:scale-105"
              >
                Vegetarian
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md py-2 px-4 text-sm transition-all duration-300 hover:scale-105"
              >
                Desserts
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full px-8 py-6 text-lg shadow-glow-sm hover:shadow-glow-lg transition-all duration-500 hover:scale-105 group"
              >
                Explore Now
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-background py-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left Side - Veg/Non-Veg Filter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowSidebar(true)}
                className="flex items-center gap-2 border-rose-500/30 hover:border-rose-500/60 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Filters
              </Button>

              <div className="bg-background/80 dark:bg-muted/30 backdrop-blur-md rounded-full border border-border/50 shadow-sm p-1.5 flex items-center">
                <button
                  onClick={() => setIsVeg(false)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full transition-all",
                    !isVeg ? "bg-amber-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Drumstick size={16} />
                  <span className="font-medium">Non-Veg</span>
                </button>
                <button
                  onClick={() => setIsVeg(true)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full transition-all",
                    isVeg ? "bg-green-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Leaf size={16} />
                  <span className="font-medium">Veg</span>
                </button>
              </div>
            </motion.div>

            {/* Right Side - Category Tabs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
            >
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-background/80 dark:bg-muted/30 backdrop-blur-md border border-border/50 h-11">
                  <TabsTrigger value="all" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="breakfast"
                    className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                  >
                    Breakfast
                  </TabsTrigger>
                  <TabsTrigger value="lunch" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
                    Lunch
                  </TabsTrigger>
                  <TabsTrigger
                    value="dinner"
                    className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                  >
                    Dinner
                  </TabsTrigger>
                  <TabsTrigger
                    value="desserts"
                    className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                  >
                    Desserts
                  </TabsTrigger>
                  <TabsTrigger
                    value="drinks"
                    className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
                  >
                    Drinks
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Slider */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Featured Recipes
              </h2>
              <p className="text-muted-foreground mt-2">Handpicked by our chefs for you to try</p>
            </div>
            <Link
              href="/recipes"
              className="text-rose-500 hover:text-rose-600 flex items-center group text-lg font-medium"
            >
              View all
              <ChevronRight size={20} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <FeaturedRecipeSlider />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Explore Categories
            </h2>
            <p className="text-muted-foreground mt-2">Discover recipes by cuisine type</p>
          </div>
          <Link
            href="/categories"
            className="text-rose-500 hover:text-rose-600 flex items-center group text-lg font-medium"
          >
            View all
            <ChevronRight size={20} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="overflow-x-auto pb-6 mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-6 min-w-max">
            {categories.map((category) => (
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
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Trending Now
              </h2>
              <p className="text-muted-foreground mt-2">Most popular recipes this week</p>
            </div>
            <Link
              href="/trending"
              className="text-rose-500 hover:text-rose-600 flex items-center group text-lg font-medium"
            >
              View all
              <ChevronRight size={20} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-6 min-w-max">
              {trendingRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.title}
                  title={recipe.title}
                  image={recipe.image}
                  category={recipe.category}
                  prepTime={recipe.prepTime}
                  difficulty={recipe.difficulty}
                  rating={recipe.rating}
                  href={recipe.href}
                  isVeg={recipe.isVeg}
                  showVegBadge={recipe.showVegBadge}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Breakfast Section */}
      <section className="py-16 container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Popular Breakfast
            </h2>
            <p className="text-muted-foreground mt-2">Start your day with these amazing recipes</p>
          </div>
          <Link
            href="/categories/breakfast"
            className="text-rose-500 hover:text-rose-600 flex items-center group text-lg font-medium"
          >
            View all
            <ChevronRight size={20} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-6 min-w-max">
            {breakfastRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.title}
                title={recipe.title}
                image={recipe.image}
                category={recipe.category}
                prepTime={recipe.prepTime}
                difficulty={recipe.difficulty}
                rating={recipe.rating}
                href={recipe.href}
                isVeg={recipe.isVeg}
                showVegBadge={recipe.showVegBadge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 z-0" />
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 z-0" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-white/20 to-rose-500/0 z-0 skew-x-12"
          />

          <div className="relative z-10 p-10 md:p-16">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Get Weekly Recipe Updates</h2>
              <p className="text-white/90 text-lg md:text-xl">
                Subscribe to our newsletter and never miss a delicious recipe again!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/50 h-14 text-lg"
                />
                <Button className="bg-white text-rose-500 hover:bg-white/90 hover:text-rose-600 h-14 text-lg px-8 shadow-glow-sm hover:shadow-glow transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {showSidebar && <FilterSidebar onClose={() => setShowSidebar(false)} isVeg={isVeg} setIsVeg={setIsVeg} />}
      </AnimatePresence>
    </div>
  )
}
