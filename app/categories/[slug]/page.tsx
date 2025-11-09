import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import RecipeCard from "@/components/recipe-card"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  // This would normally come from a database or API
  const categoryData = {
    indian: {
      name: "Indian Cuisine",
      description: "Discover the rich and diverse flavors of Indian cuisine, from spicy curries to aromatic biryanis.",
      image: "/images/categories/indian-banner.jpg",
      recipes: [
        {
          title: "Butter Chicken",
          // image: "/images/recipes/butter-chicken.jpg",
          image: "/placeholder.svg",
          category: "Indian",
          prepTime: "45 min",
          difficulty: "Medium",
          rating: 4.9,
          href: "/recipes/butter-chicken",
        },
        {
          title: "Chicken Biryani",
          // image: "/images/recipes/biryani.png",
          image: "/placeholder.svg",
          category: "Indian",
          prepTime: "60 min",
          difficulty: "Medium",
          rating: 4.8,
          href: "/recipes/chicken-biryani",
        },
        {
          title: "Palak Paneer",
          // image: "/images/recipes/palak-paneer.jpg",
          image: "/placeholder.svg",
          category: "Indian",
          prepTime: "30 min",
          difficulty: "Easy",
          rating: 4.7,
          href: "/recipes/palak-paneer",
        },
        {
          title: "Masala Dosa",
          // image: "/images/recipes/masala-dosa.jpg",
          image: "/placeholder.svg",
          category: "Indian",
          prepTime: "40 min",
          difficulty: "Hard",
          rating: 4.6,
          href: "/recipes/masala-dosa",
        },
        {
          title: "Tandoori Chicken",
          // image: "/images/recipes/tandoori-chicken.jpg",
          image: "/placeholder.svg",
          category: "Indian",
          prepTime: "50 min",
          difficulty: "Medium",
          rating: 4.8,
          href: "/recipes/tandoori-chicken",
        },
        {
          title: "Chole Bhature",
          // image: "/images/recipes/chole-bhature.jpg",
          image: "/placeholder.svg",
          category: "Indian",
          prepTime: "60 min",
          difficulty: "Medium",
          rating: 4.7,
          href: "/recipes/chole-bhature",
        },
        {
          title: "Gulab Jamun",
            image: "/placeholder.svg",
          // image: "/images/recipes/gulab-jamun.jpg",
          category: "Indian",
          prepTime: "45 min",
          difficulty: "Easy",
          rating: 4.9,
          href: "/recipes/gulab-jamun",
        },
        {
          title: "Samosa",
          
          image: "/placeholder.svg",
          // image: "/images/recipes/samosa.jpg",
          category: "Indian",
          prepTime: "40 min",
          difficulty: "Medium",
          rating: 4.6,
          href: "/recipes/samosa",
        },
      ],
    },
    chinese: {
      name: "Chinese Cuisine",
      description: "Explore the authentic flavors of Chinese cuisine, from stir-fries to dumplings and noodle dishes.",
        image: "/placeholder.svg",
      // image: "/images/categories/chinese-banner.jpg",
      recipes: [
        {
          title: "Kung Pao Chicken",
            image: "/placeholder.svg",
          // image: "/images/recipes/kung-pao-chicken.jpg",
          category: "Chinese",
          prepTime: "30 min",
          difficulty: "Medium",
          rating: 4.7,
          href: "/recipes/kung-pao-chicken",
        },
        {
          title: "Chinese Wok Noodles",
            image: "/placeholder.svg",
          // image: "/images/recipes/chinese-wok.png",
          category: "Chinese",
          prepTime: "20 min",
          difficulty: "Easy",
          rating: 4.6,
          href: "/recipes/chinese-wok-noodles",
        },
        {
          title: "Dim Sum",
            image: "/placeholder.svg",
          // image: "/images/recipes/dim-sum.jpg",
          category: "Chinese",
          prepTime: "60 min",
          difficulty: "Hard",
          rating: 4.8,
          href: "/recipes/dim-sum",
        },
        {
          title: "Mapo Tofu",
            image: "/placeholder.svg",
          // image: "/images/recipes/mapo-tofu.jpg",
          category: "Chinese",
          prepTime: "25 min",
          difficulty: "Medium",
          rating: 4.5,
          href: "/recipes/mapo-tofu",
        },
      ],
    },
    italian: {
      name: "Italian Cuisine",
      description:
        "Savor the authentic flavors of Italy with our collection of pasta, pizza, and other Italian classics.",
        image: "/placeholder.svg",
        // image: "/images/categories/italian-banner.jpg",
      recipes: [
        {
          title: "Spaghetti Carbonara",
            image: "/placeholder.svg",
          // image: "/images/recipes/carbonara.jpg",
          category: "Italian",
          prepTime: "25 min",
          difficulty: "Easy",
          rating: 4.8,
          href: "/recipes/spaghetti-carbonara",
        },
        {
          title: "Margherita Pizza",
            image: "/placeholder.svg",
          // image: "/images/recipes/margherita-pizza.jpg",
          category: "Italian",
          prepTime: "40 min",
          difficulty: "Medium",
          rating: 4.9,
          href: "/recipes/margherita-pizza",
        },
        {
          title: "Lasagna",
            image: "/placeholder.svg",
          // image: "/images/recipes/lasagna.jpg",
          category: "Italian",
          prepTime: "90 min",
          difficulty: "Hard",
          rating: 4.7,
          href: "/recipes/lasagna",
        },
        {
          title: "Risotto",
            image: "/placeholder.svg",
          // image: "/images/recipes/risotto.jpg",
          category: "Italian",
          prepTime: "35 min",
          difficulty: "Medium",
          rating: 4.6,
          href: "/recipes/risotto",
        },
      ],
    },
  }

  // Default data for categories not explicitly defined
  const defaultCategory = {
    name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Cuisine`,
    description: `Explore our collection of delicious ${slug} recipes.`,
      image: "/placeholder.svg",
    // image: "/images/categories/default-banner.jpg",
    recipes: [],
  }

  const category = categoryData[slug as keyof typeof categoryData] || defaultCategory

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
              <p className="text-white/90 text-lg">{category.description}</p>
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
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular {category.name} Recipes</h2>

        {category.recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                image={recipe.image}
                category={recipe.category}
                prepTime={recipe.prepTime}
                difficulty={recipe.difficulty}
                rating={recipe.rating}
                href={recipe.href} isVeg={false}           
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
