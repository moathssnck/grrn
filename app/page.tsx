"use client"

import { useEffect, useState } from "react"
import { Menu, Search, ShoppingCart, Home, User, Heart, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SplashComponent from "@/components/splash"
import Component from "@/components/mainpage"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"

function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}
const _id = randstr("infop-");

export default function ZabehatyApp() {
  const [currentView, setCurrentView] = useState<"home" | "products" | "cart" | "profile">("home")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setIsLoading] = useState(true)


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



useEffect(()=>{
  getLocation()
  setTimeout(() => {
    setIsLoading(false)
  }, 3000);
},[])
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
