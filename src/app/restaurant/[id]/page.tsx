'use client'

import { useParams } from 'next/navigation'
import { Nav } from '../../components/nav'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
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
      { id: 4, name: 'pizza', price: 10.99 },
      { id: 5, name: 'coaco', price: 4.99 },
      { id: 3, name: 'water', price: 6.99 },
      { id: 3, name: 'ice-cream', price: 6.99 },
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
      { id: 1, name: 'Chicken Tikka', price: 35.99 },
      { id: 1, name: 'Chicken Masala', price: 25.99 },
      { id: 1, name: 'Chicken', price: 20.99 },
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
      { id: 1, name: 'California', price: 8.99 },
      { id: 1, name: 'cheese California Roll', price: 8.99 },
      { id: 1, name: 'chicken Roll', price: 8.99 },
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
    ]
  },
]

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = Number(params.id)
  const restaurant = restaurants.find(r => r.id === restaurantId)

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 mb-4">{restaurant.cuisine} Cuisine</p>
        <p className="text-orange-500 font-bold mb-6">Rating: {restaurant.rating}</p>
        
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
              <div className="flex justify-between items-center">
                <Button className="flex-grow mr-2">Add to Cart</Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-shrink-0"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

