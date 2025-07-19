"use client"

import { useState } from "react"
import { ArrowRight, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Product } from "@/app/page"

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void
  onBack: () => void
  cartCount: number
}

export function ProductsSection({ onAddToCart, onBack, cartCount }: ProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  const products: Product[] = [
    {
      id: "1",
      name: "طماطم طازجة",
      price: 8.5,
      image: "/placeholder.svg?height=120&width=120",
      category: "خضروات",
      description: "طماطم طازجة محلية عالية الجودة",
      unit: "كيلو",
      inStock: true,
    },
    {
      id: "2",
      name: "خيار طازج",
      price: 6.75,
      image: "/placeholder.svg?height=120&width=120",
      category: "خضروات",
      description: "خيار طازج ومقرمش",
      unit: "كيلو",
      inStock: true,
    },
    {
      id: "3",
      name: "لحم بقري مفروم",
      price: 45.0,
      image: "/placeholder.svg?height=120&width=120",
      category: "لحوم",
      description: "لحم بقري مفروم طازج عالي الجودة",
      unit: "كيلو",
      inStock: true,
    },
    {
      id: "4",
      name: "دجاج كامل",
      price: 28.5,
      image: "/placeholder.svg?height=120&width=120",
      category: "لحوم",
      description: "دجاج طازج كامل",
      unit: "حبة",
      inStock: true,
    },
    {
      id: "5",
      name: "حليب طازج",
      price: 12.0,
      image: "/placeholder.svg?height=120&width=120",
      category: "ألبان",
      description: "حليب طازج كامل الدسم",
      unit: "لتر",
      inStock: true,
    },
    {
      id: "6",
      name: "جبنة بيضاء",
      price: 18.75,
      image: "/placeholder.svg?height=120&width=120",
      category: "ألبان",
      description: "جبنة بيضاء طازجة",
      unit: "كيلو",
      inStock: true,
    },
    {
      id: "7",
      name: "عصير برتقال طبيعي",
      price: 15.0,
      image: "/placeholder.svg?height=120&width=120",
      category: "مشروبات",
      description: "عصير برتقال طبيعي 100%",
      unit: "لتر",
      inStock: true,
    },
    {
      id: "8",
      name: "تفاح أحمر",
      price: 22.0,
      image: "/placeholder.svg?height=120&width=120",
      category: "فواكه",
      description: "تفاح أحمر طازج ومقرمش",
      unit: "كيلو",
      inStock: true,
    },
    {
      id: "9",
      name: "موز طازج",
      price: 12.5,
      image: "/placeholder.svg?height=120&width=120",
      category: "فواكه",
      description: "موز طازج ناضج",
      unit: "كيلو",
      inStock: true,
    },
    {
      id: "10",
      name: "أرز بسمتي",
      price: 35.0,
      image: "/placeholder.svg?height=120&width=120",
      category: "حبوب",
      description: "أرز بسمتي فاخر",
      unit: "5 كيلو",
      inStock: false,
    },
  ]

  const categories = ["الكل", "خضروات", "لحوم", "ألبان", "مشروبات", "فواكه", "حبوب"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white" onClick={onBack}>
            <ArrowRight className="h-6 w-6" />
          </Button>

          <h1 className="font-bold text-lg">المنتجات</h1>

          <div className="flex items-center gap-2">
            <Badge className="bg-red-500 text-white">{cartCount}</Badge>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="ابحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="p-4 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-100"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-full h-32 object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold">غير متوفر</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-xs mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-600 font-bold">{product.price.toFixed(2)} ر.س</span>
                      <span className="text-gray-500 text-xs block">/{product.unit}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onAddToCart(product)}
                      disabled={!product.inStock}
                      className="bg-green-600 hover:bg-green-700 text-white p-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">لا توجد منتجات تطابق البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}
