'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from "next-themes"

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
  image: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist))
    }
  }, [])

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist(prevWishlist => {
      const updatedWishlist = prevWishlist.filter(wishlistItem => 
        !(wishlistItem.id === item.id && wishlistItem.restaurantId === item.restaurantId)
      )
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      toast({
        title: "Removed from Wishlist",
        description: `${item.name} has been removed from your wishlist.`,
        variant: "destructive",
      })
      return updatedWishlist
    })
  }

  const addToCart = (item: WishlistItem) => {
    const cartItem = { ...item, quantity: 1 }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = existingCart.findIndex((i: WishlistItem) => i.id === item.id && i.restaurantId === item.restaurantId)
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart))
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="sm"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </Button>
        </div>
        {wishlist.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Your wishlist is empty</p>
            <p className="text-md text-gray-500 dark:text-gray-400 mb-6">Add items to your wishlist while browsing restaurants.</p>
            <Link href="/home">
              <Button className="w-full">Browse Restaurants</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={`${item.id}-${item.restaurantId}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link href={`/restaurant/${item.restaurantId}`}>
                    <Button variant="outline">View Restaurant</Button>
                  </Link>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => addToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => toggleWishlist(item)}
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

