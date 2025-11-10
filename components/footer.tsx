import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/30 dark:bg-muted/10 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="Cuisine Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-2xl">Cuisine</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Discover delicious recipes from around the world and cook like a pro.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-rose-500 transition-colors w-10 h-10 rounded-full bg-background flex items-center justify-center border"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-rose-500 transition-colors w-10 h-10 rounded-full bg-background flex items-center justify-center border"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-rose-500 transition-colors w-10 h-10 rounded-full bg-background flex items-center justify-center border"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-rose-500 transition-colors w-10 h-10 rounded-full bg-background flex items-center justify-center border"
              >
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-rose-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-muted-foreground hover:text-rose-500 transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-rose-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-rose-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-rose-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Categories</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/categories/indian" className="text-muted-foreground hover:text-rose-500 transition-colors">
                  Indian
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/italian"
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  Italian
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/chinese"
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  Chinese
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/mexican"
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  Mexican
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/desserts"
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  Desserts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-4">
              <p>Email: adityakesarwani@gmail.com</p>
              <p>Phone: (+91) 91400 40247</p>
            </address>
          </div>
        </div>

        <div className="border-t mt-16 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cuisine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
