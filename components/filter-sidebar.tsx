"use client"

import type { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { X, Leaf, Drumstick, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  onClose: () => void
  isVeg: boolean
  setIsVeg: Dispatch<SetStateAction<boolean>>
}

export default function FilterSidebar({ onClose, isVeg, setIsVeg }: FilterSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X size={20} />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Diet Type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Diet Type</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className={cn(
                  "flex items-center justify-center gap-2 h-12",
                  !isVeg && "bg-amber-600 text-white border-amber-600",
                )}
                onClick={() => setIsVeg(false)}
              >
                <Drumstick size={16} />
                Non-Vegetarian
                {!isVeg && <Check size={14} className="ml-1" />}
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "flex items-center justify-center gap-2 h-12",
                  isVeg && "bg-green-600 text-white border-green-600",
                )}
                onClick={() => setIsVeg(true)}
              >
                <Leaf size={16} />
                Vegetarian
                {isVeg && <Check size={14} className="ml-1" />}
              </Button>
            </div>
          </div>

          {/* Cooking Time */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Cooking Time</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>5 min</span>
                  <span>60+ min</span>
                </div>
                <Slider defaultValue={[30]} max={60} step={5} />
                <div className="mt-2 text-center text-sm font-medium">Under 30 minutes</div>
              </div>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Difficulty Level</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-12">
                Easy
              </Button>
              <Button variant="outline" className="h-12 bg-rose-500 text-white border-rose-500">
                Medium
              </Button>
              <Button variant="outline" className="h-12">
                Hard
              </Button>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Dietary Restrictions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="gluten-free" className="cursor-pointer">
                  Gluten Free
                </Label>
                <Switch id="gluten-free" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dairy-free" className="cursor-pointer">
                  Dairy Free
                </Label>
                <Switch id="dairy-free" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="nut-free" className="cursor-pointer">
                  Nut Free
                </Label>
                <Switch id="nut-free" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="vegan" className="cursor-pointer">
                  Vegan
                </Label>
                <Switch id="vegan" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button className="flex-1 bg-rose-500 hover:bg-rose-600">Apply Filters</Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
