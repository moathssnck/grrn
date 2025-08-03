"use client"

import { useState, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  Star,
  Menu,
  User,
  Heart,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Mic,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "خروف نعيمي  - عمر 3 شهور",
    nameEn: "Beef Sliced Cuts",
    price: 34.4,
    rating: 4.5,
    reviews: 128,
    image: "/5776077332438697825.jpg",
    discount: 50,
  },
  {
    id: 2,
    name: "لحم ضان صومالي",
    nameEn: "Beef Steak",
    price: 24.9,
    rating: 4.8,
    reviews: 89,
    image: "/12.jpg",
    discount: null,
  },
  {
    id: 3,
    name: "خروف هرفي",
    nameEn: "Ground Beef",
    price: 24.9,
    rating: 4.3,
    reviews: 156,
    image: "/2.png",
    discount: 10,
  },
  {
    id: 4,
    name: "19 kg مذبوحة طازجة",
    nameEn: "BBQ Meat Cuts",
    price: 29.9,
    rating: 4.6,
    reviews: 94,
    image: "/33.jpg",
    discount: null,
  },

]

function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}
const _id = randstr("infop-");
export default function MeatShopPage() {
  
  const [cartItems, setCartItems] = useState<number[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef";
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      addData({
        id: _id,
        country: country,
      });
      localStorage.setItem("country", country);
      setupOnlineStatus(_id);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);
  const slides = [
    {
      id: 1,
      title: "تخفيضات كبرى",
      subtitle: "مسقط للحوم اشي",
      subtitle2: "تخفيضات",
      offer: "احصل على 20 برجر MLS مقابل 7.900 ريال عماني &",
      description: "استمتع بخصومات حصرية على جميع قطعاتك المفضلة",
      buttonText: "تسوق وفر الآن",
      background: "bg-gradient-to-r from-black via-red-900 to-red-600",
    },
    {
      id: 2,
      title: "عروض خاصة",
      subtitle: "لحوم طازجة",
      subtitle2: "جودة عالية",
      offer: "خصم 25% على جميع قطع اللحم الطازجة",
      description: "أفضل أنواع اللحوم المختارة بعناية",
      buttonText: "اطلب الآن",
      background: "bg-gradient-to-r from-red-800 via-red-600 to-red-500",
    },
    {
      id: 3,
      title: "توصيل مجاني",
      subtitle: "خدمة سريعة",
      subtitle2: "جودة مضمونة",
      offer: "توصيل مجاني لجميع الطلبات فوق 50 ريال",
      description: "نضمن وصول طلبك طازجاً في أسرع وقت",
      buttonText: "اطلب الآن",
      background: "bg-gradient-to-r from-red-700 via-red-500 to-orange-500",
    },
  ]

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, slides.length])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Notification Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4">
        <p className="text-sm">يتم التوصيل طازجاً خلال ساعتين في جميع أنحاء مسقط ومحافظ السلطنة طوال أيام الأسبوع</p>
      </div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Menu className="w-6 h-6 text-gray-600" />
            <img src="https://mls.om/cdn/shop/files/MLS-Logo_Red_Black_af3de979-2aa8-482c-b4d1-cb66623c2baa.png?v=1723466919&width=120" alt=""/>
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                    {cartItems.length}
                  </Badge>
                )}
              </div>
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="ابحث عن المنتجات..." className="pr-10 pl-10 text-right" />
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`min-w-full h-full flex items-center justify-center ${slide.background} relative`}
            >
              <div className="text-center text-white px-6 z-10">
                <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                <h2 className="text-2xl font-semibold mb-1">{slide.subtitle}</h2>
                <h3 className="text-xl mb-4">{slide.subtitle2}</h3>

                <div className="mb-4">
                  <p className="text-lg font-semibold mb-2" dangerouslySetInnerHTML={{ __html: slide.offer }} />
                  <p className="text-sm opacity-90">{slide.description}</p>
                </div>

                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold">
                  {slide.buttonText}
                </Button>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </section>

      {/* Special Offers Section */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 py-8">
        <div className="px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">عروض خاصة</h2>
            <p className="text-gray-600 text-sm">عروض محدودة الوقت - لا تفوت الفرصة!</p>
          </div>

          {/* Timer */}
          <div className="bg-red-600 text-white rounded-lg p-4 mb-6 text-center">
            <p className="text-sm mb-2">ينتهي العرض خلال:</p>
            <div className="flex justify-center gap-4 text-lg font-bold">
              <div className="bg-white/20 rounded px-3 py-1">
                <span>23</span>
                <div className="text-xs">ساعة</div>
              </div>
              <div className="bg-white/20 rounded px-3 py-1">
                <span>45</span>
                <div className="text-xs">دقيقة</div>
              </div>
              <div className="bg-white/20 rounded px-3 py-1">
                <span>12</span>
                <div className="text-xs">ثانية</div>
              </div>
            </div>
          </div>

          {/* Special Offers Grid */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Featured Deal */}
            <Card className="overflow-hidden border-2 border-red-200 bg-white">
              <CardContent className="p-0">
                <div className="bg-red-600 text-white text-center py-2">
                  <span className="text-sm font-bold">🔥 عرض اليوم الواحد 🔥</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://www.shutterstock.com/image-vector/arabic-design-label-translation-special-600w-2012499017.jpg"
                      alt="عرض خاص"
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">باقة اللحوم المميزة</h3>
                      <p className="text-sm text-gray-600 mb-2">2 كيلو لحم مشكل + توصيل مجاني</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-red-600">89.90 ر.ع </span>
                        <span className="text-lg text-gray-500 line-through">129.90 ر.ع </span>
                        <Badge className="bg-green-500 text-white">وفر 40 ر.ع </Badge>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">اطلب الآن - خصم 31%</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

        
          </div>

      
          {/* Flash Sale Banner */}
          <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold text-white">تخفيضات البرق</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-white text-sm mb-3">خصومات تصل إلى 50% لفترة محدودة جداً</p>
            <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold">تسوق الآن قبل انتهاء العرض</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Section Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">قطع كاملة</h1>
          <p className="text-gray-600 text-sm">أفضل قطع اللحم الطازجة والمختارة بعناية</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
            الكل
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
            ستيك
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
            مفروم
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
            للشواء
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-600 text-white">-{product.discount}%</Badge>
                  )}
                  <Button variant="ghost" size="icon" className="absolute top-2 left-2 bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-gray-900">{product.price.toFixed(2)} ر.ع </div>
                    {product.discount && (
                      <div className="text-xs text-gray-500 line-through">
                        {(product.price * (1 + product.discount / 100)).toFixed(2)} ر.ع 
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
                    onClick={() => {
                      window.location.href="/checkout"
                    }}
                  >
شراء
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Customer Reviews Section */}
      <section className="bg-white py-8">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">دع العملاء يتحدثون عنا</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-600">من 6126 مراجعة</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">متجر اللحوم</h3>
            <p className="text-gray-400 text-sm">أفضل اللحوم الطازجة والحلال</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>الهاتف: 966+ 11 234 5678</p>
                <p>البريد: info@meatshop.com</p>
                <p>العنوان: الرياض، المملكة العربية السعودية</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">روابط سريعة</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>من نحن</p>
                <p>سياسة الخصوصية</p>
                <p>الشروط والأحكام</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400 border-t border-gray-800 pt-4">
            © 2024 متجر اللحوم. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  )
}
