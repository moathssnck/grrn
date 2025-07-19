"use client"

import { useState } from "react"
import { Menu, Search, ShoppingCart, Home, User, Heart, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ProductsSection } from "@/components/products-section"
import { CartDrawer } from "@/components/cart-drawer"
import { PaymentModal } from "@/components/payment-modal"
import SplashComponent from "@/components/splash"


export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  unit: string
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export default function ZabehatyApp() {
  const [currentView, setCurrentView] = useState<"home" | "products" | "cart" | "profile">("home")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

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
    return <ProductsSection onAddToCart={addToCart} onBack={() => setCurrentView("home")} cartCount={getTotalItems()} />
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
<img src="/next.svg" alt="logo" width={65}/>          </div>
         
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
        {/* Featured Banner */}
        <div className="p-4">
          <Card className="relative overflow-hidden bg-gradient-to-r from-green-100 to-green-50">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="flex-1 p-4">
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs inline-block mb-2">عرض خاص</div>
                  <h2 className="font-bold text-lg mb-1">خضار طازجة مضمونة الجودة</h2>
                  <p className="text-gray-600 text-sm mb-2">خضروات طازجة</p>
                  <div className="text-2xl font-bold text-green-600">
                    10.77 <span className="text-sm">ر.ع</span>
                  </div>
                </div>
                <div className="w-32 h-24">
                  <Image
                    src="/placeholder.svg?height=96&width=128"
                    alt="خضار طازجة"
                    width={128}
                    height={96}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="px-4">
          <h3 className="font-bold text-lg mb-4">الأقسام</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { name: "لحوم طازجة", icon: "🥩" },
              { name: "خضار وفواكه", icon: "🥬" },
              { name: "منتجات الألبان", icon: "🥛" },
            ].map((category) => (
              <Card key={category.name} className="text-center cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="px-4 mb-6">
          <Button
            onClick={() => setCurrentView("products")}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            عرض جميع المنتجات
          </Button>
        </div>

        {/* Product Categories */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="px-4">
              <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="flex-1 p-4">
                      {category.badge && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-xs inline-block mb-2">
                          {category.badge}
                        </div>
                      )}
                      <h3 className="font-bold text-base mb-1">{category.title}</h3>
                      {category.description && <p className="text-gray-600 text-sm mb-2">{category.description}</p>}
                      {category.price && (
                        <div className="text-xl font-bold text-green-600">
                          {category.price} <span className="text-sm">ر.ع</span>
                        </div>
                      )}
                    </div>
                    <div className="w-24 h-20">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        width={96}
                        height={80}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-6 text-center">
          <p className="text-gray-500 text-sm mb-2">خدمة التوصيل متاحة على مدار الساعة</p>
          <p className="text-green-600 font-semibold">توصيل مجاني للطلبات أكثر من 50 ريال</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-auto py-2 ${currentView === "home" ? "text-green-600" : "text-gray-500"}`}
            onClick={() => setCurrentView("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">الرئيسية</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-auto py-2 ${currentView === "products" as any ? "text-green-600" : "text-gray-500"}`}
            onClick={() => setCurrentView("products")}
          >
            <Grid3X3 className="h-5 w-5" />
            <span className="text-xs">المنتجات</span>
          </Button>
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-gray-500">
            <Heart className="h-5 w-5" />
            <span className="text-xs">المفضلة</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-auto py-2 ${currentView === "profile" ? "text-green-600" : "text-gray-500"}`}
            onClick={() => setCurrentView("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">الحساب</span>
          </Button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => {
          setIsCartOpen(false)
          setIsPaymentOpen(true)
        }}
        totalPrice={getTotalPrice()}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        totalAmount={getTotalPrice()}
        cartItems={cartItems}
        onPaymentSuccess={() => {
          setCartItems([])
          setIsPaymentOpen(false)
        }}
      />
    </div>
  )
}
