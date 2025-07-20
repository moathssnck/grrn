import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'جميع المنتجات  ',
  description: ' تقديم وتطوير خدمات توريد وتقديم الذبائح والمواشي بشكل متطور لمواكبة الحياة العصرية.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
