"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashComponent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger the initial animation
    const timer1 = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Show main content after splash animation
    const timer2 = setTimeout(() => {
      setShowContent(true)
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (showContent) {
   window.location.href="/"
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-emerald-700 flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white rounded-full animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Main Logo Container */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-8"
          }`}
        >
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/next.svg"
                alt="Company Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>

            {/* Animated Ring */}
            <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-white/30 rounded-2xl animate-ping"></div>
          </div>

          {/* Company Name */}
          <h1
            className={`text-4xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            ذبيحتي
          </h1>

          {/* Tagline */}
          <p
            className={`text-xl text-white/80 mb-8 transform transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
          مرحبا بكم في تطبيق ” ذبيحتي” 

          </p>

          {/* Loading Animation */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  )
}
