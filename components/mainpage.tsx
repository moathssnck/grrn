import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">عروض خاصة</h1>
          <p className="text-xl text-gray-600">اختر العرض المناسب لك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Offer 1 */}
          <Card className="relative overflow-hidden border-2 hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="text-sm font-bold">
                خصم 50%
              </Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="mb-4">
                <img
                  src="/mosk.png"
                  alt="خروف نعيمي"
                  className="w-full h-48 object-contain rounded-lg"
                />
              </div>
              <div className="flex justify-center mb-2">
              </div>
              <CardTitle className="text-2xl font-bold text-blue-600">خروف نعيمي</CardTitle>
              <CardDescription className="text-lg">العمر من 2-4 شهور الوزن من 8-10 كيلو


</CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">34.00</span>
                  <span className="text-lg text-gray-600">ريال</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg line-through text-gray-400">68.00 ريال</span>
                </div>
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>

              <div className="space-y-3 text-right">
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={()=>window.location.href="checkout"} className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">أضف إلى السلة</Button>
            </CardFooter>
          </Card>

          {/* Offer 2 */}
        
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">هل تحتاج مساعدة في الاختيار؟</p>
          <Button variant="outline" className="text-lg px-8 py-3 bg-transparent">
            تواصل معنا
          </Button>
        </div>
      </div>
    </div>
  )
}
