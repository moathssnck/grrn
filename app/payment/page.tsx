"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { CheckCircle, ChevronLeft, ShieldCheck } from "lucide-react"

type PaymentStatus = "idle" | "pending" | "success" | "error"

export default function PaymentPage() {
  const [status, setStatus] = useState<PaymentStatus>("idle")
  const [otp, setOtp] = useState("")

  const handlePayment = () => {
    setStatus("pending")
  }

  const handleOtpVerify = () => {
    // Simulate OTP verification
    if (otp === "123456") {
      setStatus("success")
    } else {
      setStatus("error")
    }
  }

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">الدفع</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">إتمام عملية الدفع</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <ShieldCheck className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <p className="text-gray-600 mb-2">المبلغ الإجمالي للدفع</p>
            <p className="text-3xl font-bold mb-6">560.00 ر.ع</p>
            <Button size="lg" className="w-full bg-green-700 hover:bg-green-800" onClick={handlePayment}>
              ادفع الآن
            </Button>
          </CardContent>
        </Card>
      </main>

      <Dialog
        open={status === "pending" || status === "error"}
        onOpenChange={() => status !== "success" && setStatus("idle")}
      >
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-center">التحقق من الدفع</DialogTitle>
            <DialogDescription className="text-center pt-2">
              لقد أرسلنا رمزًا مكونًا من 6 أرقام إلى رقم هاتفك المحمول.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} dir="ltr">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {status === "error" && <p className="text-sm text-red-500">الرمز غير صحيح. حاول مرة أخرى.</p>}
          </div>
          <Button type="button" className="w-full bg-green-700 hover:bg-green-800" onClick={handleOtpVerify}>
            تحقق
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={status === "success"}>
        <DialogContent className="sm:max-w-md text-center" dir="rtl">
          <div className="p-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">تم الدفع بنجاح!</h2>
            <p className="text-gray-600 mb-6">شكرًا لك على طلبك. سيتم توصيله قريبًا.</p>
            <Link href="/" passHref>
              <Button className="w-full bg-green-700 hover:bg-green-800">العودة إلى الصفحة الرئيسية</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
