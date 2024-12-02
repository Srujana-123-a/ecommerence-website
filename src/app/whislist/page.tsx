'use client'

import { useState, useEffect } from 'react'
import { Nav } from '../components/nav'
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Heart } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
}

export default function WishlistPage() {
  const { toast } = useToast()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

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
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-600 mb-4">Your wishlist is empty</p>
            <p className="text-md text-gray-500 mb-6">Add items to your wishlist while browsing restaurants.</p>
            <Link href="/home">
              <Button className="w-full">Browse Restaurants</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={`${item.id}-${item.restaurantId}`} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
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
      </main>
    </div>
  )
}

