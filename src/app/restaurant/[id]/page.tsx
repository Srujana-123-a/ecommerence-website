'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Nav } from '../../components/nav'
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'

const restaurants = [
  { 
    id: 1, 
    name: 'Tasty Bites', 
    cuisine: 'Italian', 
    rating: 4.5,
    menu: [
      { id: 1, name: 'Margherita Pizza', price: 12.99 },
      { id: 2, name: 'Spaghetti Carbonara', price: 14.99 },
      { id: 3, name: 'Tiramisu', price: 6.99 },
      { id: 4, name: 'Bruschetta', price: 8.99 },
      { id: 5, name: 'Lasagna', price: 13.99 },
      { id: 6, name: 'Chicken Parmesan', price: 15.99 },
      { id: 7, name: 'Fettuccine Alfredo', price: 12.99 },
      { id: 8, name: 'Caprese Salad', price: 9.99 },
      { id: 9, name: 'Minestrone Soup', price: 7.99 },
      { id: 10, name: 'Gelato', price: 5.99 },
    ]
  },
  { 
    id: 2, 
    name: 'Spice Garden', 
    cuisine: 'Indian', 
    rating: 4.2,
    menu: [
      { id: 1, name: 'Chicken Tikka Masala', price: 15.99 },
      { id: 2, name: 'Vegetable Biryani', price: 13.99 },
      { id: 3, name: 'Garlic Naan', price: 3.99 },
      { id: 4, name: 'Chicken Tikka Masala', price: 15.99 },
      { id: 5, name: 'Vegetable Biryani', price: 13.99 },
      { id: 6, name: 'Garlic Naan', price: 3.99 },
      { id: 7, name: 'Chicken Tikka Masala', price: 15.99 },
      { id: 8, name: 'Vegetable Biryani', price: 13.99 },
      { id: 9, name: 'Garlic Naan', price: 3.99 },
    ]
  },
  { 
    id: 3, 
    name: 'Sushi Express', 
    cuisine: 'Japanese', 
    rating: 4.7,
    menu: [
      { id: 1, name: 'California Roll', price: 8.99 },
      { id: 2, name: 'Salmon Nigiri', price: 10.99 },
      { id: 3, name: 'Miso Soup', price: 3.99 },
      { id: 4, name: 'Bruschetta', price: 8.99 },
      { id: 5, name: 'Lasagna', price: 13.99 },
      { id: 6, name: 'Chicken Parmesan', price: 15.99 },
      { id: 7, name: 'Fettuccine Alfredo', price: 12.99 },
      { id: 8, name: 'Caprese Salad', price: 9.99 },
      { id: 9, name: 'Minestrone Soup', price: 7.99 },
      { id: 10, name: 'Gelato', price: 5.99 },
    ]
  },
  { 
    id: 4, 
    name: 'Burger Palace', 
    cuisine: 'American', 
    rating: 4.0,
    menu: [
      { id: 1, name: 'Classic Cheeseburger', price: 9.99 },
      { id: 2, name: 'BBQ Bacon Burger', price: 11.99 },
      { id: 3, name: 'Veggie Burger', price: 8.99 },
      { id: 4, name: 'Bruschetta', price: 8.99 },
      { id: 5, name: 'Lasagna', price: 13.99 },
      { id: 6, name: 'Chicken Parmesan', price: 15.99 },
      { id: 7, name: 'Fettuccine Alfredo', price: 12.99 },
      { id: 8, name: 'Caprese Salad', price: 9.99 },
      { id: 9, name: 'Minestrone Soup', price: 7.99 },
      { id: 10, name: 'Gelato', price: 5.99 },
      
    ]
  },
]

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
}

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
}

const ITEMS_PER_PAGE = 6

export default function RestaurantPage() {
  const { toast } = useToast()
  const params = useParams()
  const searchParams = useSearchParams()
  const restaurantId = Number(params.id)
  const restaurant = restaurants.find(r => r.id === restaurantId)

  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist))
    }

    const page = Number(searchParams.get('page')) || 1
    setCurrentPage(page)
  }, [searchParams])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const addToCart = (item: {id: number, name: string, price: number}) => {
    const cartItem: CartItem = { ...item, quantity: 1, restaurantId }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = existingCart.findIndex((i: CartItem) => i.id === item.id && i.restaurantId === restaurantId)
    
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

  const toggleWishlist = (item: {id: number, name: string, price: number}) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(wishlistItem => 
        wishlistItem.id === item.id && wishlistItem.restaurantId === restaurantId
      )
      if (existingItem) {
        const updatedWishlist = prevWishlist.filter(wishlistItem => 
          !(wishlistItem.id === item.id && wishlistItem.restaurantId === restaurantId)
        )
        toast({
          title: "Removed from Wishlist",
          description: `${item.name} has been removed from your wishlist.`,
          variant: "destructive",
        })
        return updatedWishlist
      } else {
        toast({
          title: "Added to Wishlist",
          description: `${item.name} has been added to your wishlist.`,
        })
        return [...prevWishlist, { ...item, restaurantId }]
      }
    })
  }

  const isInWishlist = (itemId: number) => wishlist.some(item => item.id === itemId && item.restaurantId === restaurantId)

  const totalPages = Math.ceil(restaurant.menu.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentMenuItems = restaurant.menu.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 mb-4">{restaurant.cuisine} Cuisine</p>
        <p className="text-orange-500 font-bold mb-6">Rating: {restaurant.rating}</p>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="flex flex-row flex-wrap gap-4 mb-6">
            {currentMenuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex-1 min-w-[250px] max-w-[300px]">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                <div className="flex justify-between items-center">
                  <Button 
                    className="flex-grow mr-2"
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`flex-shrink-0 ${isInWishlist(item.id) ? 'bg-red-100' : ''}`}
                    onClick={() => toggleWishlist(item)}
                    aria-label={isInWishlist(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Link href={`/restaurant/${restaurantId}?page=${Math.max(1, currentPage - 1)}`}>
                <Button 
                  variant="outline" 
                  size="icon"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Link href={`/restaurant/${restaurantId}?page=${Math.min(totalPages, currentPage + 1)}`}>
                <Button 
                  variant="outline" 
                  size="icon"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

