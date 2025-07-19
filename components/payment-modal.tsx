"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartItem } from "@/app/page"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  totalAmount: number
  cartItems: CartItem[]
  onPaymentSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, totalAmount, cartItems, onPaymentSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<"payment" | "otp" | "success">("payment")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  if (!isOpen) return null

  const deliveryFee = totalAmount >= 50 ? 0 : 15
  const finalTotal = totalAmount + deliveryFee

  const handlePayment = () => {
    // Simulate payment processing
    setStep("otp")
  }

  const handleOtpVerification = () => {
    if (otp === "1234") {
      // Mock OTP verification
      setStep("success")
      setTimeout(() => {
        onPaymentSuccess()
        setStep("payment")
        setOtp("")
        setPhoneNumber("")
        setCardDetails({ number: "", expiry: "", cvv: "", name: "" })
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">
            {step === "payment" && "الدفع"}
            {step === "otp" && "التحقق من الهوية"}
            {step === "success" && "تم الدفع بنجاح"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Payment Step */}
        {step === "payment" && (
          <div className="p-4 space-y-4">
            {/* Order Summary */}
            <Card>
              <CardContent className="p-3">
                <h3 className="font-bold mb-2">ملخص الطلب</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>عدد المنتجات:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{totalAmount.toFixed(2)} ر.ع</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل:</span>
                    <span>{deliveryFee === 0 ? "مجاني" : `${deliveryFee.toFixed(2)} ر.ع`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-1">
                    <span>المجموع الكلي:</span>
                    <span className="text-green-600">{finalTotal.toFixed(2)} ر.ع</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label className="text-base font-bold">طريقة الدفع</Label>

              <div className="grid grid-cols-2 gap-3">
                <Card
                  className={`cursor-pointer transition-colors ${
                    paymentMethod === "card" ? "ring-2 ring-green-600 bg-green-50" : ""
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CardContent className="p-3 text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">بطاقة ائتمان</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${
                    paymentMethod === "wallet" ? "ring-2 ring-green-600 bg-green-50" : ""
                  }`}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <CardContent className="p-3 text-center">
                    <Smartphone className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">محفظة رقمية</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod === "card" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                  <Input
                    id="cardName"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="أدخل اسم حامل البطاقة"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">رقم البطاقة</Label>
                  <Input
                    id="cardNumber"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                    <Input
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="05xxxxxxxx"
                  maxLength={10}
                />
              </div>
            )}

            <Button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={
                paymentMethod === "card"
                  ? !cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv
                  : !phoneNumber
              }
            >
              دفع {finalTotal.toFixed(2)} ر.ع
            </Button>
          </div>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <div className="p-4 space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">التحقق من الهوية</h3>
              <p className="text-gray-600 text-sm">
                تم إرسال رمز التحقق إلى رقم الهاتف
                <br />
                {paymentMethod === "wallet" ? phoneNumber : "05xxxxxxxx"}
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="otp">رمز التحقق</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="أدخل رمز التحقق"
                maxLength={4}
                className="text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-gray-500">للاختبار، استخدم الرمز: 1234</p>
            </div>

            <Button
              onClick={handleOtpVerification}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={otp.length !== 4}
            >
              تأكيد الدفع
            </Button>

            <Button variant="ghost" onClick={() => setStep("payment")}>
              العودة للخلف
            </Button>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="p-4 space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-green-600">تم الدفع بنجاح!</h3>
              <p className="text-gray-600 text-sm">تم تأكيد طلبك وسيتم التوصيل خلال 30-45 دقيقة</p>
            </div>

            <Card>
              <CardContent className="p-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>رقم الطلب:</span>
                    <span className="font-bold">#ZB{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المبلغ المدفوع:</span>
                    <span className="font-bold text-green-600">{finalTotal.toFixed(2)} ر.ع</span>
                  </div>
                  <div className="flex justify-between">
                    <span>وقت التوصيل المتوقع:</span>
                    <span className="font-bold">30-45 دقيقة</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
