"use client"

import { useState } from "react"
import { Menu, Search, ShoppingCart, Home, User, Heart, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SplashComponent from "@/components/splash"
import Component from "@/components/mainpage"


export default function ZabehatyApp() {
  const [currentView, setCurrentView] = useState<"home" | "products" | "cart" | "profile">("home")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)




  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const categories = [
    {
      title: "خضار طازجة مضمونة الجودة",
      subtitle: "خضروات طازجة",
      price: "10.77",
      image: "/placeholder.svg?height=96&width=128",
      badge: "عرض خاص",
    },
    {
      title: "عروض تقليدية",
      description: "منتجات تراثية أصيلة",
      price: "12.50",
      image: "/placeholder.svg?height=80&width=96",
      badge: "جديد",
    },
    {
      title: "عروض الألبان",
      description: "منتجات الألبان الطازجة",
      price: "8.75",
      image: "/placeholder.svg?height=80&width=96",
    },
    {
      title: "العصائر الطبيعية",
      description: "عصائر طازجة ١٠٠٪ طبيعية",
      price: "15.00",
      image: "/placeholder.svg?height=80&width=96",
    },
    {
      title: "عروض الأسماك",
      description: "أسماك طازجة يومياً",
      price: "22.30",
      image: "/placeholder.svg?height=80&width=96",
      badge: "BOX OFFER",
    },
  ]

  if (currentView === "products") {
    return null
  }

  return (
    loading ? (
      <SplashComponent />
    ) : (
      <>
        <div className="min-h-screen bg-gray-50" dir="rtl">
          {/* Header */}
          <header className="bg-green-600 text-white p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <img src="/next.svg" alt="logo" width={65} />          </div>

              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white relative" onClick={() => setIsCartOpen(true)}>
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pb-20">
            <div className="p-4">
              <Component />
            </div>
          </main>
        </div>

      </>
    )
  )
}
