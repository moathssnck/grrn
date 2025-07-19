"use client"

import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { CartItem } from "@/app/page"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onCheckout: () => void
  totalPrice: number
}

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout, totalPrice }: CartDrawerProps) {
  if (!isOpen) return null

  const deliveryFee = totalPrice >= 50 ? 0 : 15
  const finalTotal = totalPrice + deliveryFee

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" dir="rtl">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">سلة التسوق</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">سلة التسوق فارغة</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-green-600 font-bold">
                          {item.price.toFixed(2)} ر.ع/{item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-left mt-2">
                      <span className="font-bold text-green-600">{(item.price * item.quantity).toFixed(2)} ر.ع</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold">{totalPrice.toFixed(2)} ر.ع</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم التوصيل:</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                  {deliveryFee === 0 ? "مجاني" : `${deliveryFee.toFixed(2)} ر.ع`}
                </span>
              </div>
              {totalPrice < 50 && (
                <p className="text-xs text-gray-500">أضف {(50 - totalPrice).toFixed(2)} ر.ع للحصول على توصيل مجاني</p>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>المجموع الكلي:</span>
                <span className="text-green-600">{finalTotal.toFixed(2)} ر.ع</span>
              </div>
            </div>
            <Button onClick={onCheckout} className="w-full bg-green-600 hover:bg-green-700 text-white">
              متابعة الدفع
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
