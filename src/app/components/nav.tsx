'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Heart, ShoppingCart, ArrowLeft, ClipboardList } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const isRestaurantPage = pathname.startsWith('/restaurant/')
  const [cartItemCount, setCartItemCount] = useState(0)
  const [wishlistItemCount, setWishlistItemCount] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      setCartItemCount(cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0))
      setWishlistItemCount(wishlist.length)
    }

    updateCounts()
    window.addEventListener('storage', updateCounts)

    return () => {
      window.removeEventListener('storage', updateCounts)
    }
  }, [])

  const headerColor = theme === 'light' ? 'text-orange' : 'text-primary'
  const iconColor = theme === 'light' ? 'text-orange' : 'text-muted-foreground'

  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b border-border">
      {isRestaurantPage ? (
        <Button variant="ghost" onClick={() => router.back()} className={`flex items-center ${headerColor}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <Link href="/home" className={`text-2xl font-bold ${headerColor}`}>FoodApp</Link>
      )}
      <div className="flex space-x-4">
        <Link
          href="/home"
          className={`flex items-center space-x-1 ${
            pathname === '/home' ? headerColor : iconColor
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/wishlist"
          className={`flex items-center space-x-1 ${
            pathname === '/wishlist' ? headerColor : iconColor
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Wishlist ({wishlistItemCount})</span>
        </Link>
        <Link
          href="/cart"
          className={`flex items-center space-x-1 ${
            pathname === '/cart' ? headerColor : iconColor
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart ({cartItemCount})</span>
        </Link>
        <Link
          href="/orders"
          className={`flex items-center space-x-1 ${
            pathname === '/orders' ? headerColor : iconColor
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span>Orders</span>
        </Link>
      </div>
      
    </nav>
  )
}

