import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
      dir="rtl"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-sm   font-bold text-gray-900 mb-4">عروض خاصة</h1>
        </div>

        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
          {/* Offer 2 */}
          <Card className="relative overflow-hidden border-2 hover:shadow-sm   transition-shadow duration-300">
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="text-sm font-bold">
                خصم 30%
              </Badge>
            </div>
            <CardHeader className="text-center pb-2">
              <div className="mb-2">
                <img
                  src="/12.jpg"
                  alt="جدي صغير"
                  className="w-full h-32 object-contain rounded-sm  "
                />
              </div>
              <CardTitle className="text-sm   font-bold text-blue-600">
                لحم ضان صومالي{" "}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-3">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-sm   font-bold text-gray-900">
                    24.90
                  </span>
                  <span className="text-sm   text-gray-600">ريال</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-sm   line-through text-gray-400">
                    49.80 ريال
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "checkout")}
                className="w-full bg-red-600 hover:bg-red-700 text-sm   py-4"
              >
                احصل على العرض
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative overflow-hidden border-2 hover:shadow-sm   transition-shadow duration-300">
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="text-sm font-bold">
                خصم 50%
              </Badge>
            </div>
            <CardHeader className="text-center pb-2">
              <div className="mb-2">
                <img
                  src="/33.jpg"
                  alt="خروف حري"
                  className="w-full h-32 object-contain rounded-sm  "
                />
              </div>

              <CardDescription className="text-sm">
                الوزن 19 كيلو
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-900">29.90</span>
                  <span className="text-sm text-gray-600">ريال</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm   line-through text-gray-400">
                    59.80 ريال
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "checkout")}
                className="w-full bg-red-600 hover:bg-red-700 text-sm py-4"
              >
                احصل على العرض
              </Button>
            </CardFooter>
          </Card>
          <Card className="relative overflow-hidden border-2 hover:shadow-sm   transition-shadow duration-300">
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="text-sm font-bold">
                خصم 40%
              </Badge>
            </div>
            <CardHeader className="text-center pb-2">
              <div className="mb-2">
                <img
                  src="/2.png"
                  alt="خروف حري"
                  className="w-full h-32 object-contain rounded-sm  "
                />
              </div>
              <CardTitle className="text-sm   font-bold text-blue-600">
                خروف حري
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-sm   font-bold text-gray-900">
                    50.00
                  </span>
                  <span className="text-sm   text-gray-600">ريال</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm   line-through text-gray-400">
                    80.00 ريال
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "checkout")}
                className="w-full bg-red-600 hover:bg-red-700   py-4"
              >
                احصل على العرض
              </Button>
            </CardFooter>
          </Card>
          {/* Offer 1 */}
          <Card className="relative overflow-hidden border-2 hover:shadow-sm   transition-shadow duration-300">
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="text-sm font-bold">
                خصم 50%
              </Badge>
            </div>
            <CardHeader className="text-center pb-2">
              <div className="mb-2">
                <img
                  src="/mosk.png"
                  alt="خروف نعيمي"
                  className="w-full h-32 object-contain rounded-sm  "
                />
              </div>
              <div className="flex justify-center mb-2"></div>
              <CardTitle className="text-sm   font-bold text-blue-600">
                خروف نعيمي
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-sm   font-bold text-gray-900">
                    34.00
                  </span>
                  <span className="text-sm   text-gray-600">ريال</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm   line-through text-gray-400">
                    68.00 ريال
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>

              <div className="space-y-3 text-right"></div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => (window.location.href = "checkout")}
                className="w-full bg-red-600 hover:bg-red-700 text-sm   py-4"
              >
                احصل على العرض
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">هل تحتاج مساعدة في الاختيار؟</p>
          <Button
            variant="outline"
            className="text-sm   px-2 py-3 bg-transparent"
          >
            تواصل معنا
          </Button>
        </div>
      </div>
    </div>
  );
}
