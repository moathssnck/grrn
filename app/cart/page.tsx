"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ChevronLeft } from "lucide-react"

const initialCartItems = [
  {
    id: 1,
    name: "كرتون دجاج ارياف طازج 1100g",
    category: "دواجن ذبيحتي",
    price: 200.0,
    image: "/product-chicken.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "كرتون دجاج ارياف طازج 900g",
    category: "دواجن ذبيحتي",
    price: 150.0,
    image: "/product-chicken.png",
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 10.0
  const total = subtotal + shipping

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-contain bg-gray-100"
                    />
                    <div className="flex-grow">
                      <h2 className="font-bold">{item.name}</h2>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="font-bold text-lg mt-1">{item.price.toFixed(2)} ر.ع</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="h-8 w-12 text-center border-0 bg-transparent focus-visible:ring-0"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <p>سلة مشترياتك فارغة.</p>
                  <Link href="/" passHref>
                    <Button className="mt-4 bg-green-700 hover:bg-green-800">ابدأ التسوق</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal.toFixed(2)} ر.ع</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>{shipping.toFixed(2)} ر.ع</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الإجمالي</span>
                  <span>{total.toFixed(2)} ر.ع</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/payment" passHref className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800"
                    disabled={cartItems.length === 0}
                  >
                    المتابعة إلى الدفع
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
